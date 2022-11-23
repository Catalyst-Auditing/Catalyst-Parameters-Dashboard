<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
import { useStore } from '../store/index'
import Auth from '../components/Auth.vue'

const store = useStore()
const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div class="has-text-light">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      Submit Change
    </div>
    <div v-if="session" :session="session">
      <div class="column is-half is-offset-one-quarter has-text-centered">
          {{ store.name }} 
          {{ store.number }}
      </div>
      <div class="column is-half is-offset-one-quarter has-text-centered">
        <button class="button m-3" @click="store.changeName('Roberto')">Change name to Roberto</button>
      </div> 
      <div class="column is-half is-offset-one-quarter has-text-centered"> 
        <button class="button m-3" @click="store.changeNumber(2)">Change number to 2</button>
      </div>
      <div class="column is-half is-offset-one-quarter has-text-centered">
        <button class="button m-3" @click="store.$reset">reset store</button>
      </div>  
      <div></div>
    </div>
    <Auth v-else />
  </div>
</template>