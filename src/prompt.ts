import type OpenAI from 'openai'

export class Prompt {
  constructor() {}

  getParams(text: string) {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: this.systemPrompt,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.5,
      max_tokens: 2048,
    }
    return params
  }

  get systemPrompt() {
    return `As a multilingual translation assistant, Your task is to complete the translation tasks of the application I18n. Please provide accurate and fluent translations to ensure that the original text is transformed into an equivalent expression appropriate to the target language and culture. You can use appropriate terminology and grammar to ensure the accuracy and professionalism of the translation.Please note that you should be able to translate multiple languages and provide flexible and creative translations as needed. Your translation should accurately convey the meaning of the original text and meet the requirements of the target language and culture.

    You will receive a text description of an emoji in JSON format, which includes the 'title' field for the English name of the emoji, the 'symbol' field for the emoji itself, and the 'keywords' field for the keywords associated with the emoji in English.
  
    Please First understand what this emoji represents, and then complete the following tasks:
  
    1. Translate the content of the 'title' field into the following languages: \n\n${this.targetLanguages}\n\n and add a new field 'title_i18n' in JSON Object.
  
    2. Sequentially describe this emoji in the following languages: \n\n${this.targetLanguages}\n\n add the descriptionsand add a new field  'keywords_i18n' in JSON Object.

    3. Finally don't forget to add a comma at the end of the JSON Object.

    there is a example:
    the original text is:
    \n\n${this.originaltext}\n\n
    the result should be:
    \n\n${this.resulttext}\n\n
  `
  }

  private targetLanguages = `
  \`\`\`
  English
  Chinese
  Japanese
  Spanish
  German
  Russian
  French
  Italian
  Portuguese
  Polish
  Arabic
  Persian
  Indonesian 
  Dutch
  \`\`\`
  `
  private originaltext = `{
    "title": "Grinning",
    "symbol": "😀",
    "keywords": "grinning face happy smiley emotion"
  }`
  private resulttext = `{
    "title": "Grinning",
    "title_i18n": {
      "English": "Grinning",
      "Chinese": "咧嘴笑",
      "Japanese": "にっこり",
      "Spanish": "Sonriente",
      "German": "Grinsen",
      "Russian": "Ухмыляться",
      "French": "Sourire",
      "Italian": "Sorridere",
      "Portuguese": "Sorrindo",
      "Polish": "Uśmiech",
      "Arabic": "ابتسامة",
      "Persian": "خنده",
      "Indonesian": "Senyum",
      "Dutch": "Grijns"
    },
    "symbol": "😀",
    "keywords": "grinning face happy smiley emotion",
    "keywords_i18n": {
      "English": "grinning face happy smiley emotion",
      "Chinese": "咧嘴笑，开心，笑脸，情感",
      "Japanese": "にっこり顔 幸せ スマイリー 感情",
      "Spanish": "cara sonriente feliz emoticon",
      "German": "grinsendes Gesicht glücklich lächelnde Emotion",
      "Russian": "улыбающееся лицо счастливо смайлик эмоция",
      "French": "visage souriant heureux émoticône",
      "Italian": "viso sorridente felice emoticon",
      "Portuguese": "rosto sorridente feliz emoticon",
      "Polish": "uśmiechnięta twarz szczęśliwa emotikona",
      "Arabic": "وجه مبتسم سعيد ابتسامة عاطفة",
      "Persian": "صورت خندان خوشحال ایموجی احساسات",
      "Indonesian": "wajah tersenyum bahagia emotikon emosi",
      "Dutch": "grijnzend gezicht blije glimlach emotie"
    }
  },`
}
