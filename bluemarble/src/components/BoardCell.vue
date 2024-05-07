<template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { scene, camera, renderer } from '@/scene';

const props = defineProps({
  size: Number,
  speed: Number,
  position: Object,
});

let cube: THREE.Mesh;

onMounted(() => {
  createCube();
  renderScene();
});

const createCube = () => {
  const geometry = new THREE.BoxGeometry(props.size, props.size, props.size!*2);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xFF0000, transparent: true, opacity: 0.8,
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(props.position!.x, props.position!.y, props.position!.z);
  scene.add(cube);
};

const renderScene = () => {
  renderer.render(scene, camera);
  // const animate = () => {
  //   requestAnimationFrame(animate);
  //   cube.rotation.x += props.speed!;
  //   cube.rotation.y += props.speed!;
  //   renderer.render(scene, camera);
  // };
  // animate();
};

</script>

<style scoped>
/* Add CSS styles if needed */
</style>
