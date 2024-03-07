<script setup lang="ts">

const stateFilter = defineModel();

const emits = defineEmits<{
  removeAll: [],
}>();

</script>

<template>
  <div class="container">
    <div id="state-radios">
      <label>
        <input type="radio" name="state" value="all" v-model="stateFilter">
        <span>全部</span>
      </label>
      |
      <label>
        <input type="radio" name="state" value="completed" v-model="stateFilter">
        <span>已完成</span>
      </label>
      |
      <label>
        <input type="radio" name="state" value="incomplete" v-model="stateFilter">
        <span>未完成</span>
      </label>
    </div>

    <button id="remove-all-btn" @click="emits('removeAll')">清空列表</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

#state-radios {
  display: flex;
  color: #545454;
}

#state-radios label {
  margin: 0 12px;
  cursor: pointer;
}

#state-radios input {
  display: none;
}

#state-radios input:checked + span {
  color: #0045ff;
}

#remove-all-btn {
  background-color: #ff4d4f;
  color: white;
}
</style>