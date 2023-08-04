<template>
    <div>
      <Parameters />
        testing ids
        <button  @click="test()">test cps/id</button>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route.params);
async function test() {
  router.push(`/cps/2/3`);
}
</script>