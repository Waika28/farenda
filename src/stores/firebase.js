import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { addDoc, collection, doc, deleteDoc, where, query, updateDoc } from 'firebase/firestore'


export const useFirebaseStore = defineStore('firebase', {
  state: () => {
    const db = useFirestore()
    const user = useCurrentUser()
    const tasksRef = collection(db, 'tasks')

    return { db, user, tasksRef, tasks: null }
  },
  actions: {
    loadTasks() {
      this.tasks = useCollection(query(this.tasksRef, where('userId', '==', this.user.uid)))
    },
  }
})
