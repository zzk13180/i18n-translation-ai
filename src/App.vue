<template>
  <div class="container">
    <button type="button" @click="start">Send 🌟</button>
    <pre v-for="item in views" :key="item" class="item">{{ item }}</pre>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { API } from './API'
  import { emojis } from './data'
  import { Prompt } from './prompt'
  import type { Emoji } from './data'

  const api = new API()
  const prompt = new Prompt()
  const views = reactive<string[]>([])

  const chunkArray = (arr: Emoji[], chunkSize = 399): Emoji[][] => {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize))
    }
    return result
  }

  const start = () => {
    const twoDimensionalArray = chunkArray(emojis)
    for (const [index, arr] of twoDimensionalArray.entries()) {
      views[index] = ''
      emojiArrayLoop(arr, index)
    }
  }

  async function emojiArrayLoop(arr: Emoji[], index: number) {
    for (const item of arr) {
      const text = JSON.stringify(item)
      await getResponseItem(text, index)
      console.log(views.join()) // log the result of each item Prevent data loss
    }
  }

  async function getResponseItem(text: string, index: number) {
    const params = prompt.getParams(text)
    const { body } = await api.chat(params)
    if (typeof body?.getReader === 'function') {
      for await (const completions of API.readStream(body)) {
        completions.forEach(({ choices }) => {
          try {
            const { delta } = choices[0]
            if (delta?.content) {
              views[index] += delta.content
            }
          } catch (error) {
            console.error(error)
          }
        })
      }
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

  .container .item {
    font-size: 22px;
    display: inline-flex;
  }

  button {
    border-radius: 8px;
    color: hsla(160, 100%, 37%, 1);
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: #646cff;
  }
</style>
