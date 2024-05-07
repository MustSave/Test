<template>
    <BoardCell v-for="index in 9" :key="index" :size="1" 
    :position="{
        x:pos!.initPos[0] + pos!.vec[0] * index, 
        y:pos!.initPos[1] + pos!.vec[1] * index, 
        z:pos!.initPos[2] + pos!.vec[2] * index}"/>
</template>

<script setup lang="ts">
import BoardCell from '@/components/BoardCell.vue';

const props = defineProps({
    pos: Object
});

</script>

<style scoped>
/* Add CSS styles if needed */
</style>
