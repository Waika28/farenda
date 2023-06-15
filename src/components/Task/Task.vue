<script setup>
import { ref, toRef } from 'vue'
import Form from './Step/Form.vue'
import Step from './Step/Step.vue'
import ClickToEditInput from './ClickToEditInput.vue'
import { replaceItemByIndex, formatTimestamp } from '../../utils'
import { Timestamp } from '@firebase/firestore'
import Cross from '../icons/Cross.vue'

const props = defineProps(['task'])
const emit = defineEmits(['updateTask', 'deleteTask'])

const task = toRef(props, 'task')

function toggleCompleted() {
  emit('updateTask', task.value, {
    isCompleted: !task.value.isCompleted,
    completedAt: Timestamp.now()
  })
}

function updateText(newText) {
  emit('updateTask', task.value, {
    text: newText
  })
}

const isAddingStep = ref(false)

function addStep(newStep) {
  emit('updateTask', task.value, { steps: [...task.value.steps, newStep] })
}

function updateStep(stepIndex, step, updatedData) {
  const newSteps = replaceItemByIndex(task.value.steps, stepIndex, { ...step, ...updatedData })
  const isAllCompleted = newSteps.every(x => x.isCompleted)
  emit('updateTask', task.value, { steps: newSteps, isCompleted: isAllCompleted || task.value.isCompleted })
}

function deleteStep(stepIndex) {
  const newSteps = task.value.steps.filter((_, i) => i != stepIndex)
  emit('updateTask', task.value, { steps: newSteps })
}

function toggleAddingStepForm() {
  isAddingStep.value = !isAddingStep.value
}
</script>

<template>
  <div class="p-4">
    <div class="flex gap-x-2 items-center">
      <input :checked="task.isCompleted" type="checkbox" class="checkbox" @click="toggleCompleted" />
      <ClickToEditInput :class="{ completed: task.isCompleted }" :value="task.text" @submit="updateText" />
      <button class="btn btn-circle btn-sm" @click="emit('deleteTask', task)">
        <Cross />
      </button>
    </div>
    <div class="pl-4 border-l-2">
      <ol v-if="task.steps" class="flex flex-col gap-y-2 my-2">
        <li v-for="[i, step] of task.steps.entries()" :key="i">
          <Step :index="i" :step="step" @updateStep="updateStep" @deleteStep="deleteStep" />
        </li>
      </ol>
      <button v-if="!isAddingStep" class="btn btn-secondary btn-sm" @click="toggleAddingStepForm">Add</button>
      <div v-if="isAddingStep">
        <Form :nextId="task.steps.length" @addStep="addStep" @deleteStep="deleteStep" @close="toggleAddingStepForm" />
      </div>
    </div>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
