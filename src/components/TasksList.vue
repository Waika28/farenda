<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { addDoc, collection, doc, deleteDoc, where, query, updateDoc } from 'firebase/firestore'
import TaskForm from './Task/Form.vue'
import Task from './Task/Task.vue'

const db = useFirestore()
const tasksRef = collection(db, 'tasks')
const tasks = useCollection(query(tasksRef, where('userId', '==', 'jUgOpTH1RicovZg1khbjd4pTqHW2')))

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
  <ul v-if="tasks" v-for="task of tasks">
    <li>
      <Task :task="task" @updateTask="updateTask" @deleteTask="deleteTask" />
    </li>
  </ul>
  <TaskForm @addTask="addTask" />
</template>
