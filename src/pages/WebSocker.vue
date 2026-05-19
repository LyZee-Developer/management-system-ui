<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Client } from '@stomp/stompjs'

interface ChatMessage {
  sender: string
  content: string
}

const messages = ref<string[]>([])
const input = ref('')
let client: Client

onMounted(() => {

  client = new Client({
    // PURE WEBSOCKET
    brokerURL: 'ws://localhost:6780/ws',
    reconnectDelay: 5000,
    debug: (str) => {
      console.log(str)
    }
  })

  client.onConnect = () => {
    console.log('CONNECTED')
    client.subscribe('/topic/public', (message) => {
      console.log('MESSAGE =>', message.body)
      messages.value.push(message.body)
    })
  }

  client.onStompError = (frame) => {
    console.error('STOMP ERROR', frame)
  }

  client.onWebSocketClose = (event) => {
    console.log('SOCKET CLOSED', event)
  }

  client.onWebSocketError = (event) => {
    console.log('SOCKET ERROR', event)
  }

  client.activate()
})

onBeforeUnmount(() => {
  if (client) {
    client.deactivate()
  }
})


const sendMessage = () => {
  if (!input.value.trim()) return
  if (!client || !client.connected) {
    console.log('WebSocket not connected yet')
    return
  }
  console.log("send")
  client.publish({
    destination: '/app/sendMessage',
    body: input.value
    //*******send as object */
    // body: JSON.stringify({
    //   sender: 'User',
    //   content: input.value
    // })
  })

  input.value = ''
}
</script>

<template>
  <div class="max-w-xl text-black mx-auto mt-10 p-4 border rounded-xl shadow bg-white">

    <h2 class="text-xl font-bold mb-4">WebSocket Chat</h2>

    <!-- Messages -->
    <div class="h-60 overflow-y-auto border p-2 mb-4 rounded bg-gray-50">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="mb-2 p-2 bg-blue-100 rounded"
      >
        {{ msg }}
      </div>
    </div>

    <!-- Input -->
    <div class="flex gap-2">
      <input
        v-model="input"
        type="text"
        placeholder="Enter message..."
        class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
      />
      <button
        @click="sendMessage"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>

  </div>
</template>