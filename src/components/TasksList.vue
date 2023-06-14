<script setup>
import { toRef } from 'vue'
import { useFirebaseStore } from '../stores/firebase.js'
import { addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import TaskForm from './Task/Form.vue'
import Task from './Task/Task.vue'
import { storeToRefs } from 'pinia'

const store = useFirebaseStore()
store.useTasks()
const { tasksRef } = store
const { user, tasks } = storeToRefs(store)

function addTask(task) {
  addDoc(tasksRef, task)
}

function updateTask(task, updatedData) {
  updateDoc(doc(tasksRef, task.id), updatedData)
}

function deleteTask(task) {
  deleteDoc(doc(tasksRef, task.id))
}
</script>

<template>
  <ul v-if="tasks">
    <li v-for="task of tasks" :key="task.id">
      <Task :task="task" @updateTask="updateTask" @deleteTask="deleteTask" />
    </li>
  </ul>
  <TaskForm :user=user @addTask="addTask" />
</template>
