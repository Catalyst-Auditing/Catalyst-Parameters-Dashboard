<template>
    <div>
      <Parameters />
        Test cps index
        <button  @click="test()">test cps</button>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(router.currentRoute.value.fullPath, router.currentRoute.value.name);
async function test() {
  router.push(`/cps/2`);
}
</script>