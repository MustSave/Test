<template>
  <div id="app">
    <BoardFace :pos="topFace"/>
    <BoardFace :pos="bottomFace"/>
    <BoardFace :pos="rightFace"/>
    <BoardFace :pos="leftFace"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BoardCell from '@/components/BoardCell.vue';
import BoardFace from '@/components/BoardFace.vue';

const topFace = ref({
  initPos: [-5, 0, -5],
  vec: [1, 0, 0]
});

const bottomFace = ref({
  initPos: [-5, 0, 5],
  vec: [1, 0, 0]
});

const leftFace = ref({
  initPos: [5, 0, 5],
  vec: [0, 0, -1]
});

const rightFace = ref({
  initPos: [-5, 0, 5],
  vec: [0, 0, -1]
});
</script>

<style>
/* Add global styles if needed */
</style>
