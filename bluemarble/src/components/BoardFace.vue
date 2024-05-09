<template>
    <BoardCell v-for="(position, index) in cellPosition" :key="index" :size="cellSize" :position="position"
        @cell-created="addToGroup" />
</template>

<script setup lang="ts">
import BoardCell from '@/components/BoardCell.vue';
import { RIGHT } from '@/const';
import { camera, renderer, scene } from '@/scene';
import type { CellSize } from '@/types';
import { Vector3, Group, Object3D, Euler } from 'three';

const props = defineProps({
    pos: {
        type: Vector3,
        required: true,
    },
    rotation: {
        type: Euler,
        required: true,
    },
    length: {
        type: Number,
        default: 9,
    },
    cellSize: {
        type: Object as () => CellSize,
        default: () => ({ width: 1, height: 1, depth: 1 }),
    },
    margin: {
        type: Number,
        default: 0.2,
    }
});

let position = new Vector3(0, 0, 0);
const nextPositionVector = RIGHT.clone().multiplyScalar(props.margin + props.cellSize.width);
const cellPosition = Array.from({ length: props.length }, (_, i) => {
    if (i > 0) position.add(nextPositionVector);
    return position.clone();
});

const wrapper = new Group();

const addToGroup = (cell: Object3D) => {
    wrapper.add(cell);
    if (wrapper.children.length === props.length) {
        const moveVec = nextPositionVector.clone().multiplyScalar(-(props.length - 1) / 2);
        wrapper.position.add(moveVec);

        const face = new Group();
        face.add(wrapper);
        face.position.add(props.pos);
        face.setRotationFromEuler(props.rotation);
        scene.add(face);

        renderer.render(scene, camera);
    }
}

</script>

<style scoped></style>
