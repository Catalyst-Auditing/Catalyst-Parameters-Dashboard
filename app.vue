<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div>
    <Navbar />
    <NuxtPage v-if="user" />
    <Auth v-else />
  </div>
</template>