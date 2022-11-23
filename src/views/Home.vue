<script setup>
  import { useStore } from '../store/index'
  import { onMounted, ref } from 'vue'

const store = useStore()
</script>
<template>
    <div class="has-text-light">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      Home
    </div>
    <div class="column is-half is-offset-one-quarter has-text-centered">
      {{ store.name }}
      {{ store.number }}
    </div>
    </div>
</template>