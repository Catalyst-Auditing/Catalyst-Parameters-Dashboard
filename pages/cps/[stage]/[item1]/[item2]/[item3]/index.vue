<template>
    <div>
      <Parameters />
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
let stage = computed(() => route.value.params.stage)
let item1 = computed(() => route.value.params.item1)
let item2 = computed(() => route.value.params.item2)
let item3 = computed(() => route.value.params.item3)
//console.log(route.params, stage, item1, item2, item3);
</script>