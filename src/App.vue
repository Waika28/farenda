<script setup>
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import Auth from './components/Auth.vue'
import TasksList from './components/TasksList.vue'

const auth = useFirebaseAuth()
const user = useCurrentUser()
</script>

<template>
  <div class="navbar bg-base-200">
    <div class="navbar-start">
      <span class="text-xl font-bold">Farenda</span>
    </div>
    <div class="navbar-end">
      <div v-if="user">
        <button class="btn btn-neutral" @click="auth.signOut">Sign out</button>
      </div>
    </div>
  </div>
  <main>
    <div v-if="!user">
      <Auth />
    </div>
    <div v-else>
      <TasksList :user="user" />
    </div>
  </main>
</template>
