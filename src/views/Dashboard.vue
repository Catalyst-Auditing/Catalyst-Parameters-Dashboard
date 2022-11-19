<script setup>
  import { useStore } from '../store/index'
  import { onMounted, ref } from 'vue'
  import Account from '../components/Account.vue'
  import Auth from '../components/Auth.vue'
  import { supabase } from '../supabase'

  const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })

const store = useStore()
</script>
<template>
    <div>
        <Account v-if="session" :session="session" />
        <Auth v-else />
        Dashboard
        {{ store.name }}
        {{ store.number }}
    </div>
</template>