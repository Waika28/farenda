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

  closeModal()

  text.value = ''
}

const showModal = () => add_task_modal.showModal()
const closeModal = () => add_task_modal.close()
</script>

<template>
  <button class="btn btn-circle absolute bottom-4 right-4 w-14 h-14" @click="showModal">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21L12 3M3 12l18 0" />
    </svg>
  </button>
  <dialog id="add_task_modal" class="modal modal-bottom md:modal-middle">
    <form class="modal-box" @submit.prevent="addTask">
      <div class="text-xl font-semibold">
        <label for="text">Add task</label>
      </div>
      <div class="join w-full">
        <div class="join-item w-full">
          <input name="text" class="input input-bordered w-full" type="text" v-focus v-model="text" />
        </div>
        <div class="join-item">
          <button class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
