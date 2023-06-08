<script setup>
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import Auth from './components/Auth.vue'
import TasksList from './components/TasksList.vue'

const auth = useFirebaseAuth()
const user = useCurrentUser()
</script>

<template>
  <main>
    <div v-if="!user">
      <Auth />
    </div>
    <div v-else>
      <button @click="auth.signOut">Sign out</button>
      <TasksList :user="user" />
    </div>
  </main>
</template>
