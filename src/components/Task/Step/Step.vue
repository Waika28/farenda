<script setup>
import { Timestamp } from '@firebase/firestore'
import { toRef } from 'vue'
import ClickToEditInput from '../ClickToEditInput.vue'
import Cross from '../../icons/Cross.vue'

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
      <Cross />
    </button>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
