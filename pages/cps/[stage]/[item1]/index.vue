<template>
    <div>
      <Parameters />
        Testing item1
        <button  @click="test()">test cps/id/id2</button>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route.params);
async function test() {
  router.push(`/cps/`);
}
</script>