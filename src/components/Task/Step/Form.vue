<script setup>
import { Timestamp } from '@firebase/firestore'
import { ref } from 'vue'

const props = defineProps(['nextId'])
const emit = defineEmits(['addStep', 'close'])

const text = ref("")
const input = ref(null)

function addStep() {
  emit('addStep', {
    text: text.value,
    addedAt: Timestamp.now(),
    completedAt: null,
    isCompleted: false
  })

  text.value = ""
  input.value.focus()
}
</script>

<template>
  <form @submit.prevent="addStep">
    <div class="flex-1">
      <input class="w-full input input-bordered input-sm" name="text" type="text" v-focus @blur="emit('close')"
        v-model="text" ref="input" required />
    </div>
  </form>
</template>
