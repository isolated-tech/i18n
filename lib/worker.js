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
  const targetLanguages = JSON.parse(event.data.targetLanguages)
  self.postMessage(targetLanguages)

  const returnedObj = {}
  const keys = Object.keys(obj)
  const langKeys = Object.keys(LANGUAGES)

  for (let l = 0; l < targetLanguages.length; l++) {
    let language = langKeys[l]
    if (!returnedObj[LANGUAGES[language]]) {
      returnedObj[LANGUAGES[language]] = {}
    }

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (!returnedObj[LANGUAGES[language]][key]) {
        returnedObj[LANGUAGES[language]][key] = {}
      }

      const translation = await translator(obj[key], {
        tgt_lang: LANGUAGES[language],
        src_lang: event.data.src_lang,

        // Allows for partial output
        callback_function: x => {
          returnedObj[LANGUAGES[language]][key] = translator.tokenizer.decode(
            x[0].output_token_ids,
            {
              skip_special_tokens: true,
            }
          )
          self.postMessage({
            status: 'update',
            output: {
              language: LANGUAGES[language],
              data: JSON.stringify(returnedObj),
            },
          })
        },
      })

      returnedObj[LANGUAGES[language]][key] = translation[0]['translation_text']
    }
    self.postMessage({
      status: 'complete',
      output: {
        language: LANGUAGES[language],
        data: returnedObj[LANGUAGES[language]],
      },
    })
  }
})
