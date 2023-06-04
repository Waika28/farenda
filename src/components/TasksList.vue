<script setup>
import { useFirestore } from 'vuefire'
import { useCollection } from 'vuefire'
import { addDoc, collection, doc, deleteDoc } from 'firebase/firestore'
import TaskForm from './TaskForm.vue'

const db = useFirestore()

const tasks = useCollection(collection(db, 'tasks'))

async function newTask(task) {
  await addDoc(collection(db, 'tasks'), task)
}

async function deleteTask(task_id) {
  await deleteDoc(doc(db, 'tasks', task_id))
}
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <span>{{ task.text }}</span>
      <button @click="deleteTask(task.id)">X</button>
      <div v-if="task.steps">
        <ol>
          <li v-for="step in task.steps">
            {{ step.text }}
          </li>
        </ol>
      </div>
    </li>
  </ul>
  <TaskForm @newTask="newTask"/>
</template>
