<script setup>
import { Timestamp } from '@firebase/firestore'
import { ref } from 'vue'

const emit = defineEmits(['addTask'])

const text = ref("")

function addTask() {
  emit('addTask', {
    text: text.value,
    userId: "jUgOpTH1RicovZg1khbjd4pTqHW2",
    addedAt: Timestamp.now(),
    completedAt: null,
    steps: [],
    isCompleted: false
  })

  text.value = ''
}
</script>

<template>
  <form @submit.prevent="addTask">
    <label for="text">Task text: </label>
    <input name="text" type="text" v-model="text" />

    <button>Create task</button>
  </form>
</template>
