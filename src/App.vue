<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTodosStore } from './stores/todos'

const newTodo = ref('')

const todosStore = useTodosStore()

const { filteredTodos } = storeToRefs(todosStore) // make store's props reactive and component to re-render after a change in props.

const { addTodo, toggleTodo, updateFilter } = todosStore // this is an example of a function not state related

const addNewTodo = (text: string) => {
  addTodo(text)
  newTodo.value = ''
}
</script>

<template>
  <main>
    <div style="margin: 30px; display: flex; align-items: center; max-height: 30px">
      <button @click="() => updateFilter('all')">All Todos</button>
      <button @click="() => updateFilter('finished')" style="margin-left: 10px">
        Show Finised
      </button>
      <button @click="() => updateFilter('unfinished')" style="margin-left: 10px">
        Show Unfinished
      </button>
    </div>

    <div style="margin: 30px">
      <input v-model="newTodo" type="text" />
      <button @click="() => addNewTodo(newTodo)">Add</button>
    </div>

    <div v-for="todo in filteredTodos" :key="todo.id">
      <div style="margin: 30px; display: flex; align-items: center; max-height: 30px">
        <h1 :style="todo.isFinished && { textDecoration: 'line-through' }">{{ todo.text }}</h1>
        <button @click="() => toggleTodo(todo.id)" style="margin-left: 10px">toggle</button>
      </div>
    </div>
  </main>
</template>

