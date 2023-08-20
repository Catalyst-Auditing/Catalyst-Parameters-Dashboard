<template>
    <div>
      <Parameters />
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route.params);
</script>