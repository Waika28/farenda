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
  <button class="btn btn-circle absolute bottom-4 right-4" onclick="add_task.showModal()">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21L12 3M3 12l18 0" />
    </svg>
  </button>
  <dialog id="add_task" class="modal">
    <div class="relative card bg-base-200 shadow-xl">
      <button class="absolute right-4 top-4" onclick="add_task.close()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
  </dialog>
</template>
