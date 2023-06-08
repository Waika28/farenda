<script setup>
import { ref, toRef } from 'vue'
import Form from './Step/Form.vue'
import Step from './Step/Step.vue'
import { replaceItemByIndex, formatTimestamp } from '../../utils'
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
  const isAllCompleted = newSteps.every(x => x.isCompleted)
  emit('updateTask', task.value, { steps: newSteps, isCompleted: isAllCompleted || task.value.isCompleted})
}

function deleteStep(stepIndex) {
  const newSteps = task.value.steps.filter((_, i) => i != stepIndex)
  emit('updateTask', task.value, { steps: newSteps })
}
</script>

<template>
  <div class="p-4">
    <div class="flex gap-x-2 items-center">
      <input :checked="task.isCompleted" type="checkbox" class="checkbox" @click="toggleCompleted" />
      <span :class="{ completed: task.isCompleted }">{{ task.text }}</span>
      <button class="btn btn-circle btn-sm" @click="emit('deleteTask', task)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="pl-4 border-l-2">
      <ol v-if="task.steps" class="flex flex-col gap-y-2 my-2">
        <li v-for="[i, step] of task.steps.entries()">
          <Step :index="i" :step="step" @updateStep="updateStep" @deleteStep="deleteStep" />
        </li>
      </ol>
      <button v-if="!isAddingStep" class="btn btn-secondary btn-sm" @click="isAddingStep = true">Add</button>
      <div v-if="isAddingStep">
        <div class="join">
          <Form :nextId="task.steps.length" @addStep="addStep" @deleteStep="deleteStep" />
          <div class="join-item">
            <button class="btn btn-sm" @click="isAddingStep = false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
