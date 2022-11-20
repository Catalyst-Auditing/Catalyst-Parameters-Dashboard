<script setup>
import { useStore } from '../store/index'

const store = useStore()
</script>

<template>
    <div>
        {{ store.name }}{{ store.number }}
        <button @click="store.changeName('Roberto')">Change name to Roberto</button>
        <button @click="store.changeNumber(2)">Change number to 2</button>
        <button @click="store.$reset">reset store</button>
    </div>
</template>