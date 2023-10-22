<template>
  <div class="container">
    <button @click="start">测试</button>
    <p>{{ item }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { API } from './API'
  import type OpenAI from 'openai'

  const systemPrompt =
    'As a multilingual translation assistant, Your task is to complete the translation tasks of the application I18n. Please provide accurate and fluent translations to ensure that the original text is transformed into an equivalent expression appropriate to the target language and culture. You can use appropriate terminology and grammar to ensure the accuracy and professionalism of the translation.Please note that you should be able to translate multiple languages and provide flexible and creative translations as needed. Your translation should accurately convey the meaning of the original text and meet the requirements of the target language and culture.'

  const targetLanguage = 'english'

  const userPrompt = (text: string) =>
    `Translate the following text into ${targetLanguage},\n\n${text}\n\n\nTranslated into ${targetLanguage}:`

  const text = 'ありがとうございます。' // Text to be translated

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt(text),
      },
    ],
    temperature: 0.5,
    max_tokens: 1024,
  }

  const item = ref('')
  const api = new API()

  const start = async () => {
    const { body } = await api.chat(params)
    if (typeof body?.getReader === 'function') {
      for await (const completions of API.readStream(body)) {
        completions.forEach(({ choices }) => {
          const { delta } = choices[0]
          if (delta.content) {
            item.value += delta.content
          }
        })
      }
    } else {
      item.value = body ? JSON.stringify(body) : 'empty'
    }
  }
</script>

<style>
  body {
    min-height: 100vh;
    color: #2c3e50;
    background: #fff;
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }
  .container p {
    font-size: 22px;
    display: inline-flex;
  }
</style>
