<script setup>
import 'firebaseui/dist/firebaseui.css'

import { useFirebaseAuth } from 'vuefire'
import { EmailAuthProvider } from 'firebase/auth'
import { auth } from 'firebaseui'
import { onMounted, onUnmounted } from 'vue'


const ui = new auth.AuthUI(useFirebaseAuth())

onMounted(() => {
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        return false
      },
    }
  })
})

onUnmounted(() => {
  ui.delete()
})
</script>

<template>
  <div id="firebaseui-auth-container"></div>
</template>
