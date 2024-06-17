import { pipeline } from '@xenova/transformers'

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

  const obj = JSON.parse(event.data.text)

  for (let l = 0; l < event.data.targetLanguages.length; l++) {
    const language = event.data.targetLanguages[l]
    const path = []

    if (language.code === 'all') continue

    await iterateJSON(obj, path, {}, language)
  }

  async function iterateJSON(obj, path = [], currentObj = {}, language) {
    for (const key in obj) {
      const value = obj[key]
      const currentPath = [...path, key]

      if (typeof value === 'object') {
        currentObj[key] = {}
        await iterateJSON(value, currentPath, currentObj[key], language) // Recursively iterate through nested object
      } else {
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
      }

      if (currentPath.length > 0) {
        let tempObj = {}
        tempObj[currentPath[currentPath.length - 1]] = currentObj[key]

        for (let i = currentPath.length - 2; i >= 0; i--) {
          const temp = {}
          temp[currentPath[i]] = { ...tempObj }
          tempObj = { ...temp }
        }
        currentObj = { ...currentObj, ...tempObj }
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
