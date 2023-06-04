<script setup>
import { ref } from 'vue'

const emit = defineEmits(['newTask'])

const text = ref("")
const steps = ref([])

const stepText = ref("")

function newTask() {
  emit('newTask', {
    text: text.value,
    steps: steps.value,
    inserted_at: new Date()
  })

  text.value = ''
  steps.value = []
}

function addStep() {
  steps.value.push({
    text: stepText.value
  })
  stepText.value = ""
}
</script>

<template>
  <form @submit.prevent="newTask">
    <label for="text">Task text: </label>
    <input name="text" type="text" v-model="text" />

    <div>
      <label>Steps: </label>
      <ol>
        <li v-for="step in steps">
          <input :value="step.text" type="text" readonly />
        </li>
      </ol>
      <label>Add new step: </label>
      <input type="test" v-model="stepText" />
      <button @click.prevent="addStep">Add step</button>
    </div>
    <button>Create task</button>
  </form>
</template>
