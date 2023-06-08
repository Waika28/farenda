<script setup>
import 'firebaseui/dist/firebaseui.css'

import { useFirebaseAuth } from 'vuefire'
import { EmailAuthProvider } from 'firebase/auth'
import { auth } from 'firebaseui'


const ui = new auth.AuthUI(useFirebaseAuth())

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
</script>

<template>
  <div id="firebaseui-auth-container"></div>
</template>
