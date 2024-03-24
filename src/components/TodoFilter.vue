<script lang="ts" setup>

const stateFilter = defineModel();

const emits = defineEmits<{
  removeAll: [],
  removeAllFiltered: [],
}>();

</script>

<template>
  <div class="container">
    <div id="state-radios">
      <label>
        <input v-model="stateFilter" name="state" type="radio" value="all">
        <span>全部</span>
      </label>
      |
      <label>
        <input v-model="stateFilter" name="state" type="radio" value="completed">
        <span>已完成</span>
      </label>
      |
      <label>
        <input v-model="stateFilter" name="state" type="radio" value="incomplete">
        <span>未完成</span>
      </label>
    </div>

    <div>
      <button class="remove-all-btn" @click="emits('removeAllFiltered')">清空当前列表</button>
      <button class="remove-all-btn" @click="emits('removeAll')">清空列表</button>
    </div>
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

.remove-all-btn {
  background-color: #ff4d4f;
  color: white;
  margin-left: 8px;
}
</style>