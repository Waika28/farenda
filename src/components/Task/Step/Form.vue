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
    <div class="join">
      <div class="join-item flex-1">
        <input class="w-full input input-bordered input-sm" name="text" type="text" v-focus v-model="text" />
      </div>
      <div class="join-item">
        <button class="btn btn-secondary btn-sm">Submit</button>
      </div>
    </div>
  </form>
</template>
