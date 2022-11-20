<script setup>
  import { useStore } from '../store/index'
  import { onMounted, ref } from 'vue'

const store = useStore()
</script>
<template>
    <div>
        Dashboard
        {{ store.name }}
        {{ store.number }}
    </div>
</template>