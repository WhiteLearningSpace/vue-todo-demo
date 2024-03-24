<script lang="ts" setup>
import {Todo} from "../hooks/useTodo.ts";
import {nextTick, ref, watch} from "vue";

const {todo} = defineProps<{
  todo: Todo
}>();

const emits = defineEmits<{
  removeTodo: [id: number],
  toggleTodo: [id: number],
  editTodo: [id: number, text: string],
}>();

const isEditing = ref(false);
const text = ref(todo.text);
const textAreaElement = ref<HTMLTextAreaElement | null>(null);
const onHandleEdit = () => {
  isEditing.value = true;
  nextTick(() => {
    textAreaElement.value?.focus();
  });
};

watch(text, (newVal) => {
  emits('editTodo', todo.id, newVal);
});

</script>

<template>
  <div class="todo-item">
    <label>
      <input :checked="todo.isCompleted" class="check-input"
             type="checkbox"
             @change="emits('toggleTodo',todo.id)"/>
      <span class="checked-mark"></span>
      <span v-show="!isEditing" class="text">{{ todo.text }}</span>
      <textarea v-show="isEditing"
                ref="textAreaElement"
                v-model="text"
                class="text-textarea"
                @focusout="isEditing=false"></textarea>
    </label>
    <div class="button-bar">
      <button v-show="isEditing" style="background-color: limegreen;" @click="isEditing=false">完成</button>
      <button v-show="!isEditing" style="background-color: cornflowerblue;" @click="onHandleEdit">编辑</button>
      <button @click="emits('removeTodo',todo.id)">删除</button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
}

.text-textarea {
  width: 100%;
  height: 100%;
  word-break: break-word;
  margin: 0 8px;
  font-size: 16px;
  padding: 8px;
  min-height: 100px;
}

label {
  display: flex;
  word-wrap: break-word;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
}

.check-input {
  display: none;
}

label .text {
  margin: 0 8px;
  text-align: left;
  word-wrap: break-word;
  flex: 1 0;
  height: 100px;
  overflow-y: auto;
}

.check-input:checked ~ .text {
  text-decoration: line-through;
  color: #999;
}

.checked-mark {
  position: relative;
  width: 24px;
  height: 24px;
}

.checked-mark::before {
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

.checked-mark::after {
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

input:checked ~ .checked-mark::after {
  scale: 0.8;
  transition: scale 280ms;
}

.button-bar {
  flex-shrink: 0;
}

button {
  background-color: red;
  border: 1px solid #f0f0f0;
  padding: 4px 12px;
  color: white;
}
</style>