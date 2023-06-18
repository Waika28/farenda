<script setup>
import { arrayMoveImmutable } from 'array-move'
import { useFirestore, useCollection, useDocument } from 'vuefire'
import { addDoc, collection, doc, deleteDoc, where, query, updateDoc, disableNetwork, orderBy, setDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'
import TaskForm from './Task/Form.vue'
import Task from './Task/Task.vue'
import { computed, ref } from 'vue'

const { user } = defineProps(['user'])

const db = useFirestore()
const tasksRef = collection(db, 'tasks')
const tasks = useCollection(query(tasksRef, where('userId', '==', user.uid), orderBy('addedAt', 'desc')))

const orderRef = doc(db, 'taskOrders', user.uid)
getDoc(orderRef).then(d => {
  if (!d.exists())
    setDoc(orderRef, { order: [] })
})
const orderDoc = useDocument(orderRef)

const orderedTasks = computed(() => {
  return orderDoc.value?.order.map((taskId) => tasks.value.find((task) => task.id == taskId))
})

const dragging = ref(false)
const visibleIndicator = ref('')

async function addTask(task) {
  const addedTask = await addDoc(tasksRef, task)

  const order = [addedTask.id, ...(orderDoc.value?.order ?? [])]
  await updateOrder(order)
}

function updateTask(task, updatedData) {
  updateDoc(doc(tasksRef, task.id), updatedData)
}

async function deleteTask(task) {
  await removeFromOrder(task.id)
  await deleteDoc(doc(tasksRef, task.id))
}

async function updateOrder(newOrder) {
  await updateDoc(orderRef, { order: newOrder })
}

async function removeFromOrder(taskId) {
  await updateDoc(orderRef, {
    order: arrayRemove(taskId)
  })
}

function onDragStart(event, order) {
  event.dataTransfer.setData('text/plain', order)
  dragging.value = true
}

function onDragEnd() {
  dragging.value = false
  visibleIndicator.value = ''
}

function onDragEnter(taskId, position) {
  visibleIndicator.value = taskId + '-' + position
}

function onDragLeave(taskId, position) {
  if (taskId + '-' + position === visibleIndicator.value)
    visibleIndicator.value = ''
}

function onDrop(event, position, dropIndex) {
  const taskIndex = event.dataTransfer.getData('text/plain')
  const newIndex = taskIndex < dropIndex
    ? (position === 'top' ? dropIndex - 1 : dropIndex)
    : (position === 'top' ? dropIndex : dropIndex + 1)
  console.log(`Move ${taskIndex} to ${newIndex}`)
  const newOrder = arrayMoveImmutable(orderDoc.value.order, taskIndex, newIndex)
  updateOrder(newOrder)
}
</script>

<template>
  <ul v-if="orderedTasks">
    <li v-for="[order, task] of orderedTasks.entries()" :key="task.id" draggable="true" class="relative"
      @dragstart="e => onDragStart(e, order)" @dragend="onDragEnd">
      <div class="z-10" v-show="dragging">
        <!-- Indicators -->
        <div v-show="task.id + '-top' == visibleIndicator" class="absolute top-0 h-1 mt-[-2px] w-full bg-cyan-400">
        </div>
        <div v-show="task.id + '-bottom' == visibleIndicator" class="absolute bottom-0 h-1 mb-[-2px] w-full bg-cyan-400">
        </div>
        <!-- Drop zones -->
        <div @dragover.prevent @dragenter="onDragEnter(task.id, 'top')" @dragleave="onDragLeave(task.id, 'top')"
          @drop="e => onDrop(e, 'top', order)" class="absolute top-0 w-full h-1/2"></div>
        <div @dragover.prevent @dragenter="onDragEnter(task.id, 'bottom')" @dragleave="onDragLeave(task.id, 'bottom')"
          @drop="e => onDrop(e, 'bottom', order)" class="absolute bottom-0 w-full h-1/2"></div>
      </div>
      <Task :task="task" @updateTask="updateTask" @deleteTask="deleteTask" />
    </li>
  </ul>
  <TaskForm :user=user @addTask="addTask" />
</template>
