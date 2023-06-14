<script setup>
import Auth from './components/Auth.vue'
import TasksList from './components/TasksList.vue'
import { useFirebaseStore } from './stores/firebase'
import { storeToRefs } from 'pinia'

const store = useFirebaseStore()
const { user } = storeToRefs(store)
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
    <div class="grid h-screen place-items-center" v-if="user === undefined">
      <span class="loading loading-spinner w-1/3 md:w-1/6 lg:w-1/12"></span>
    </div>
    <div v-else-if="user === null">
      <Auth />
    </div>
    <div v-else>
      <TasksList />
    </div>
  </main>
</template>
