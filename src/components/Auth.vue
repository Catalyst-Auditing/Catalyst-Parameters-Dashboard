<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'

  const loading = ref(false)
  const email = ref('')

  async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}

</script>

<template>
  <div class="container p-6">
  <form class="column is-half is-offset-one-quarter" @submit.prevent="signInWithDiscord()">
    <div class="col-6 form-widget has-text-centered">
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Login via Discord'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  </div>
</template>