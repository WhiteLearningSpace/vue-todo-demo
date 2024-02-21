<script setup lang="ts">

const stateFilter = defineModel();

</script>

<template>
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
</template>

<style scoped>
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
</style>