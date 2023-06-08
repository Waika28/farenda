<script setup>
import { Timestamp } from '@firebase/firestore'
import { ref } from 'vue'

const props = defineProps(['nextId'])
const emit = defineEmits(['addStep'])

const text = ref("")

function addStep() {
  emit('addStep', {
    text: text.value,
    addedAt: Timestamp.now(),
    completedAt: null,
    isCompleted: false
  })

  text.value = ""
}
</script>

<template>
  <form @submit.prevent="addStep">
    <label for="text">Step: </label>
    <input name="text" type="text" v-model="text" />

    <button>Add step</button>
  </form>
</template>
