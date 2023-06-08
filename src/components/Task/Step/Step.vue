<script setup>
import { Timestamp } from '@firebase/firestore'
import { toRef } from 'vue'

const props = defineProps(['index', 'step'])
const step = toRef(props, 'step')

const emit = defineEmits(['updateStep', 'deleteStep'])

function toggleCompleted() {
  emit('updateStep', props.index, step.value, {
    isCompleted: !step.value.isCompleted,
    completedAt: Timestamp.now()
  })
}
</script>

<template>
  <div :class="{ completed: step.isCompleted }" @click="toggleCompleted">{{ step.text }}</div>
  <div>Added at {{ new Date(step.addedAt.seconds * 1000) }}}</div>
  <div v-if="step.isCompleted">Completed at {{ new Date(step.completedAt.seconds * 1000) }}</div>
  <button @click="emit('deleteStep', props.index)">Delete</button>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
