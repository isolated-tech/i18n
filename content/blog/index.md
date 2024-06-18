---
title: Launch!
---


Welcome to **[i18nlocale](https://i18nlocale.com)**.

This idea came to me after using ChatGPT to translate my i18n files. It worked well, but it was inconvenient having to specify each language I wanted to be output. Not to mention the token usage.

So, I built this using **[transformer.js](https://huggingface.co/docs/transformers.js/index)** alongside the **[Xenova/nllb-200-distilled-600M model](https://huggingface.co/Xenova/nllb-200-distilled-600M)** to enable in-browser translations.

There is no server involved with the translation functionality. The only backend-related code running is authentication to enable a few premium features.
