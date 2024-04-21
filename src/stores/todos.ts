// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  isFinished: boolean
}

interface TodosState {
  todos: Todo[]
  filter: string
}

// Functional Approach
// here, in this commented-out code, I am using an arrow function to define the store.
// This approach is based on pure functions and arrow expressions, which can be more concise and suitable for simple cases.

// export const useTodosStore = defineStore('todos', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
//   return { count, doubleCount, increment }
// })

// Object Literal Approach
// here I am using an object literal to define the store.
// This approach is more explicit and offers greater control over the store's properties and behavior.
// It's useful when you have a more complex store with interrelated getters, actions, and states.

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [
      {
        id: 1,
        text: 'Clean Room',
        isFinished: false
      }
    ],
    filter: 'all'
  }),
  getters: {
    filteredTodos(this: TodosState) {
      if (this.filter === 'finished') {
        return this.todos.filter((todo) => todo.isFinished)
      } else if (this.filter === 'unfinished') {
        return this.todos.filter((todo) => !todo.isFinished)
      }
      return this.todos
    }
  },
  actions: {
    addTodo(text: string) {
      if (!text) return
      this.todos.push({
        id: Math.floor(Math.random() * 100000000),
        text,
        isFinished: false
      })
    },
    toggleTodo(id: number) {
      const index = this.todos.findIndex((todo) => todo.id === id)

      this.todos[index].isFinished = !this.todos[index].isFinished
    },
    updateFilter(value: string) {
      this.filter = value
    }
  }
})
