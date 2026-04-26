<template>
    <div>
        <div ref="printArea">
            <h1>Hello World</h1>
            <p>This is my content to print {{ count }}</p>
        </div>
        <div @click="printContent">Click on me bro</div>
        <div @click="count++">dynamic nadata</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const printArea = ref<HTMLElement | null>(null)
const count = ref<number>(0)
const printContent = () => {
  if (!printArea.value) return

  const content = printArea.value.innerHTML

  // ✅ create hidden iframe
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'

  document.body.appendChild(iframe)

  const doc = iframe.contentWindow?.document

  if (!doc) return

  doc.open()
  doc.write(`
    <html>
      <head>
        <title>Print</title>
        ${document.head.innerHTML}
        <style>
          body { font-family: Arial; padding: 20px; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `)
  doc.close()

  iframe.onload = () => {
    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()

    // remove iframe after printing
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 1000)
  }
}
</script>
<style lang="">
    
</style>