<script setup lang="ts">
import { Euler, Vector3 } from 'three';
import BoardFace from './components/BoardFace.vue';
import { RIGHT, FORWARD } from './const';
import type { CellSize } from './types';

const posScale = 6.4
const bottomPos = new Vector3(0, 0, posScale);
const topPos = new Vector3(0, 0, -posScale);
const leftPost = new Vector3(-posScale, 0, 0);
const rightPost = new Vector3(posScale, 0, 0);
const cellSize: CellSize = { width: 1, height: 0.5, depth: 1.5 }

const topBottomRotation = new Euler(0, 0, 0);
const leftRightRotation = new Euler(0, Math.PI / 2, 0);
</script>

<template>
  <div id="app">
    <BoardFace :pos="bottomPos" :rotation="topBottomRotation" :cellSize="cellSize" :length="9" />
    <BoardFace :pos="leftPost" :rotation="leftRightRotation" :cellSize="cellSize" :length="9" />
    <BoardFace :pos="rightPost" :rotation="leftRightRotation" :cellSize="cellSize" :length="9" />
    <BoardFace :pos="topPos" :rotation="topBottomRotation" :dir="RIGHT" :cellSize="cellSize" :length="9" />
  </div>
</template>

<style>
/* Add global styles if needed */
</style>
