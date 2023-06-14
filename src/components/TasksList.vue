<script setup>
import { useFirestore, useCollection, getCurrentUser } from 'vuefire'
import { addDoc, collection, doc, deleteDoc, where, query, updateDoc } from 'firebase/firestore'
import TaskForm from './Task/Form.vue'
import Task from './Task/Task.vue'

const { user } = defineProps(['user'])

const db = useFirestore()
const tasksRef = collection(db, 'tasks')
const tasks = useCollection(query(tasksRef, where('userId', '==', user.uid)))

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
    <li v-for="task of tasks">
      <Task :task="task" @updateTask="updateTask" @deleteTask="deleteTask" />
    </li>
  </ul>
  <TaskForm :user=user @addTask="addTask" />
</template>
