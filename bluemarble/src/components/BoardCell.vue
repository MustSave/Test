<template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { scene, camera, renderer } from '@/scene';
import type { CellSize } from '@/types.d';

const props = defineProps({
  size: {
    type: Object as () => CellSize,
    default: () => ({ width: 1, height: 1, depth: 1 }),
  },
  position: {
    type: THREE.Vector3,
    required: true,
  }
});

const emit = defineEmits(['cellCreated']);

let cube: THREE.Mesh;

onMounted(() => {
  createCube();
  emit('cellCreated', cube);
  renderScene();
});

const createCube = () => {
  const geometry = new THREE.BoxGeometry(props.size.width, props.size.height, props.size.depth);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF0000, transparent: true,
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(props.position.x, props.position.y, props.position.z);
  scene.add(cube);
};

const renderScene = () => {
  // renderer.render(scene, camera);
};

</script>

<style scoped>
/* Add CSS styles if needed */
</style>
