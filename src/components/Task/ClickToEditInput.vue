<script setup>
import { ref } from 'vue'

const props = defineProps(['class', 'value'])
const emit = defineEmits(['submit'])

const value = ref(props.value)
const initValue = value.value
const editing = ref(false)

function submit() {
  toggleShow()
  if (value.value.trim() === "")
    value.value = initValue
  else
    emit('submit', value.value)
}

function toggleShow() {
  editing.value = !editing.value
}
</script>

<template>
  <span :class="props.class">
    <span v-if="!editing" @click="toggleShow">{{ value }}</span>
    <input v-if="editing" class="input input-bordered w-full" v-model="value" v-focus @blur="submit"
      @keyup.enter="submit" />
  </span>
</template>
