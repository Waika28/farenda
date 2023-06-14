<script setup>
import { Timestamp } from '@firebase/firestore'
import { toRef } from 'vue'
import ClickToEditInput from '../ClickToEditInput.vue'

const props = defineProps(['index', 'step'])
const step = toRef(props, 'step')

const emit = defineEmits(['updateStep', 'deleteStep'])

function toggleCompleted() {
  emit('updateStep', props.index, step.value, {
    isCompleted: !step.value.isCompleted,
    completedAt: Timestamp.now()
  })
}

function updateText(newText) {
  emit('updateStep', props.index, step.value, {
    text: newText
  })
}
</script>

<template>
  <div class="flex gap-x-2 items-center">
    <input :checked="step.isCompleted" class=checkbox type="checkbox" @click="toggleCompleted">
    <ClickToEditInput :class="{ completed: step.isCompleted }" :value="step.text" @submit="updateText" />
    <button class="btn btn-circle btn-sm" @click="emit('deleteStep', props.index)">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
