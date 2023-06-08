<script setup>
import { Timestamp } from '@firebase/firestore'
import { ref } from 'vue'

const { user } = defineProps(['user'])
const emit = defineEmits(['addTask'])

const text = ref("")

function addTask() {
  emit('addTask', {
    text: text.value,
    userId: user.uid,
    addedAt: Timestamp.now(),
    completedAt: null,
    steps: [],
    isCompleted: false
  })

  text.value = ''
}
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <div class="card-title">Add task</div>
      <form @submit.prevent="addTask">
        <div class="join">
          <div class="join-item">
            <input name="text" class="input input-bordered" type="text" v-model="text" />
          </div>
          <div class="join-item">
            <button class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
