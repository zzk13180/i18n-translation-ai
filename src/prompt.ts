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
      max_tokens: 4096,
    }
    return params
  }

  get systemPrompt() {
    return `As a multilingual translation assistant, Your task is to complete the translation tasks of the application I18n. Please provide accurate and fluent translations.

    You will receive a JSON Array containing multiple emoji objects. Each object includes 'title', 'symbol', and 'keywords'.
  
    For EACH emoji object in the array, please:
  
    1. Translate the 'title' into the following languages: \n\n${this.targetLanguages}\n\n and add a new field 'title_i18n'.
  
    2. Translate/Describe the 'keywords' in the following languages: \n\n${this.targetLanguages}\n\n and add a new field 'keywords_i18n'.

    3. Return the result as a valid JSON Array. Do NOT add any markdown formatting (like \`\`\`json), just the raw JSON string. Ensure the JSON is valid.

    Example:
    Input:
    ${this.originaltext}

    Output:
    ${this.resulttext}
  `
  }

  private targetLanguages = `
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
  `
  
  private originaltext = `[
    {
      "title": "Grinning",
      "symbol": "😀",
      "keywords": "grinning face happy smiley emotion"
    }
  ]`

  private resulttext = `[
    {
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
    }
  ]`
}
