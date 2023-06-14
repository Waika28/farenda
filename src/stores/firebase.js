import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { addDoc, collection, doc, deleteDoc, where, query, updateDoc } from 'firebase/firestore'


export const useFirebaseStore = defineStore('firebase', {
  state: () => {
    const db = useFirestore()
    const user = useCurrentUser()

    return { db, user, tasksRef: null, tasks: null }
  },
  actions: {
    useTasks() {
      this.tasksRef = collection(this.db, 'tasks')
      this.tasks = useCollection(query(this.tasksRef, where('userId', '==', this.user.uid)))
    },
  }
})
