<script setup>
import { ref, toRef } from 'vue'
import Form from './Step/Form.vue'
import Step from './Step/Step.vue'
import { replaceItemByIndex } from '../../utils'
import { Timestamp } from '@firebase/firestore'

const props = defineProps(['task'])
const emit = defineEmits(['updateTask', 'deleteTask'])

const task = toRef(props, 'task')

function toggleCompleted() {
  emit('updateTask', task.value, {
    isCompleted: !task.value.isCompleted,
    completedAt: Timestamp.now()
  })
}

const isAddingStep = ref(false)

function addStep(newStep) {
  emit('updateTask', task.value, { steps: [...task.value.steps, newStep] })
}

function updateStep(stepIndex, step, updatedData) {
  const newSteps = replaceItemByIndex(task.value.steps, stepIndex, { ...step, ...updatedData })
  emit('updateTask', task.value, { steps: newSteps })
}

function deleteStep(stepIndex) {
  const newSteps = task.value.steps.filter((_, i) => i != stepIndex)
  emit('updateTask', task.value, { steps: newSteps })
}
</script>

<template>
  <div :class="{ completed: task.isCompleted }" @click="toggleCompleted">{{ task.text }}</div>
  <div>Added at {{ new Date(task.addedAt.seconds * 1000) }}}</div>
  <div v-if="task.isCompleted">Completed at {{ new Date(task.completedAt.seconds * 1000) }}</div>
  <div>
    <button v-if="!isAddingStep" @click="isAddingStep = true">Add step</button>
    <button @click="emit('deleteTask', task)">Delete</button>
  </div>
  <ol v-if="task.steps">
    <li v-for="[i, step] of task.steps.entries()">
      <Step :index="i" :step="step" @updateStep="updateStep" @deleteStep="deleteStep" />
    </li>
  </ol>
  <div v-if="isAddingStep">
    <Form :nextId="task.steps.length" @addStep="addStep" @deleteStep="deleteStep" />
    <button @click="isAddingStep = false">Close</button>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
