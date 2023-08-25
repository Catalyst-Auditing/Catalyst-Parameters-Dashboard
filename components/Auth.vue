<script setup>
import { ref } from 'vue'
const supabase = useSupabaseClient()

const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <div>
        <button class="login" @click="handleLogin">Login with Discord</button>
      </div>
    </div>
  </form>
</template>

<style>
.login {
  margin-right: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 150px; 
  max-width: 250px; 
  height: 30px; 
  padding: 10px 20px;
  text-decoration: none;
  background-color: #7289DA;
  color: white;
  border: 1px solid #333;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.login:hover {
  background-color: #333;
  color: #f8f9fa;
}
</style>