<script lang="ts" setup>
import {Todo} from "../composables/useTodo";

const {todos} = defineProps<{
  todos: Todo[],
}>();

defineEmits<{
  removeTodo: (id: number) => void,
  toggleTodo: (id: number) => void,
}>();
</script>

<template>
  <div class="todo-list">
    <div v-for="v in todos" :key="v.id" class="todo-item">
      <label>
        <input :checked="v.isCompleted"
               type="checkbox"
               @change="$emit('toggleTodo',v.id)"/>
        <span class="checked-mark"></span>
        <span class="text">{{ v.text }}</span>
      </label>
      <button @click="$emit('removeTodo',v.id)">x</button>
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  background-color: #fff;
  padding: 16px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
}

.todo-item label {
  display: flex;
  word-wrap: break-word;
  overflow: hidden;
  cursor: pointer;
}

.todo-item input {
  display: none;
}

.todo-item label .text {
  margin: 0 8px;
  text-align: left;
  word-wrap: break-word;
  overflow: hidden;
  flex: 1 0;
}

.todo-item input:checked ~ .text {
  text-decoration: line-through;
  color: #999;
}

.todo-item .checked-mark {
  position: relative;
  width: 24px;
  height: 24px;
}

.todo-item .checked-mark::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid black;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-sizing: border-box;
}

.todo-item .checked-mark::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  background-color: #2580ff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  scale: 0;
  transition: scale 280ms;
}

.todo-item input:checked ~ .checked-mark::after {
  scale: 0.8;
  transition: scale 280ms;
}


.todo-item button {
  background-color: red;
  border: 1px solid #f0f0f0;
  padding: 4px 12px;
  color: white;
}
</style>