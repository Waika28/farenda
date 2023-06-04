<script setup>
import { useFirestore } from 'vuefire'
import { useCollection } from 'vuefire'
import { addDoc, collection } from 'firebase/firestore'

const db = useFirestore()

const tasks = useCollection(collection(db, 'tasks'))
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <span>{{ task.text }}</span>
    </li>
  </ul>
</template>
