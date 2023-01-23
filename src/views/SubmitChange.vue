<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
import { useStore } from '../store/index'
import Auth from '../components/Auth.vue'
import { useUpdateCps } from '../composables/updatecps'

const store = useStore()
const session = ref()

const full_name = ref('')
const avatar_url = ref('')
const title = ref('')
const description = ref('')
const category = ref('')
const id = ref('')


  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
      if (session.value) {
        //downloadImage()
        console.log(data.session.user.user_metadata.full_name)
      }
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })

  
  async function submitChange() {
  const { user } = session.value
  id.value = user.id
  title.value = 'CA Incentives'
  description.value = 'New way of calculating incentives for CAs'
  category.value = 'Quality Assurance'
  const { status } = await useUpdateCps(title.value, description.value, category.value, id.value)
  console.log('status',status)
}

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
      <div class="column is-half is-offset-one-quarter has-text-centered">
        <button class="button m-3" @click="submitChange()">Submit Change</button>
      </div>
      <div></div>
    </div>
    <Auth v-else />
  </div>
</template>