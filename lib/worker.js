import { pipeline } from '@xenova/transformers'
import yaml from 'js-yaml'
import { parse } from 'acorn'
import { simple } from 'acorn-walk'

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to translate a sentence.
 */
class MyTranslationPipeline {
  static task = 'translation'
  static model = 'Xenova/nllb-200-distilled-600M'
  static instance = null

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback })
    }

    return this.instance
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async event => {
  // Retrieve the translation pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let translator = await MyTranslationPipeline.getInstance(x => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x)
  })

  const fileType = event.data.fileType
  const obj = parseDataBasedOnFileType(event.data.text, fileType)
  self.postMessage({
    status: 'log',
    output: obj,
  })

  for (let l = 0; l < event.data.targetLanguages.length; l++) {
    const language = event.data.targetLanguages[l]
    const path = []

    if (language.code === 'all') continue

    await iterateObj(obj, path, {}, language)
  }

  async function iterateObj(obj, path = [], currentObj = {}, language) {
    for (const key in obj) {
      const value = obj[key]
      const currentPath = [...path, key]

      if (typeof value === 'object') {
        const newValue = Array.isArray(value) ? [] : {}
        currentObj[key] = newValue
        await iterateObj(value, currentPath, newValue, language) // Recursively iterate through nested object
      } else {
        if (typeof value === 'string') {
          const translation = await translator(value, {
            tgt_lang: language.code,
            src_lang: event.data.src_lang.code,
            // Allows for partial output
            callback_function: x => {
              currentObj[key] = translator.tokenizer.decode(
                x[0].output_token_ids,
                {
                  skip_special_tokens: true,
                }
              )

              self.postMessage({
                status: 'update',
                output: {
                  language: language,
                  data: currentObj,
                },
              })
            },
          })

          currentObj[key] = translation[0]['translation_text']
        } else {
          currentObj[key] = value
        }
      }

      if (path.length === 0) {
        self.postMessage({
          status: 'complete',
          output: {
            language: language,
            data: currentObj,
          },
        })
      }
    }
  }
})

const parseDataBasedOnFileType = (text, fileType) => {
  switch (fileType) {
    case 'yaml':
      try {
        return yaml.load(text)
      } catch (yamlError) {
        self.postMessage({
          status: 'error',
          output: {
            error: yamlError,
          },
        })
        return null
      }
    case 'js':
      try {
        const syntaxTree = parse(text, { sourceType: 'module' })

        // Find the top-level object expression
        let objectNode
        for (const node of syntaxTree.body) {
          if (
            node.type === 'ExportNamedDeclaration' &&
            node.declaration.type === 'VariableDeclaration'
          ) {
            objectNode = node.declaration.declarations[0].init
            break
          }
        }

        // Convert the object node to a JavaScript object
        if (objectNode && objectNode.type === 'ObjectExpression') {
          const objectCode = text.substring(objectNode.start, objectNode.end)
          return eval(`(${objectCode})`)
        } else {
          throw new Error('No object expression found in the JS file.')
        }
      } catch (jsError) {
        self.postMessage({
          status: 'error',
          output: {
            error: jsError,
          },
        })
        return null
      }
    default:
      try {
        return JSON.parse(text)
      } catch (jsonError) {
        self.postMessage({
          status: 'error',
          output: {
            error: jsonError,
          },
        })
        return null
      }
  }
}
