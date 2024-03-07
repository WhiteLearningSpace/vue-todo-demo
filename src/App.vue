<script lang="ts" setup>
import TodoAdd from "./components/TodoAdd.vue";
import TodoFilter from "./components/TodoFilter.vue";
import TodoList from "./components/TodoList.vue";
import {useTodo} from "./hooks/useTodo.ts";
import {useFilteredTodo} from "./hooks/useFilteredTodo.ts";

const {todos, addTodo, removeTodo, toggleTodo, removeAll} = useTodo();

const {stateFilter, filteredTodos} = useFilteredTodo(todos);

</script>

<template>
  <div>
    <h1>TODOLIST</h1>
    <todo-add @add-todo="addTodo"/>
    <todo-filter v-model="stateFilter" @remove-all="removeAll"/>
    <todo-list :todos="filteredTodos" @remove-todo="removeTodo" @toggle-todo="toggleTodo"/>
  </div>
</template>

<style scoped>

</style>
