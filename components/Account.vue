<script setup>
const supabase = useSupabaseClient()
const router = useRouter();
const loading = ref(true)
const full_name = ref('')
const website = ref('')
const avatar_path = ref('')
const signedIn = ref(false)

loading.value = true
const user = useSupabaseUser()

onMounted(async () => {
  try {
    let sess = await supabase.auth.getSession();
    if (sess && sess.data && sess.data.session && sess.data.session.user) {
      let { data } = await supabase
        .from('profiles')
        .select(`full_name, website, avatar_url`)
        .eq('id', sess.data.session.user.id) // accessing user id directly from the session
        .single();
      if (data) {
        full_name.value = data.full_name;
        website.value = data.website;
        avatar_path.value = data.avatar_url;
      }
      signedIn.value = true;
    } else {
      router.push(`/`);
    }
  } catch (error) {
    console.error(error);
    // Handle the error as needed
  } finally {
    loading.value = false;
  }
});

supabase.auth.onAuthStateChange(async (event, session) => {
  signedIn.value = event === 'SIGNED_IN';
  if (session && session.data && session.data.session && session.data.session.user) {
    signedIn.value = true;
  }
});


async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      full_name: full_name.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    await supabase.auth.signOut();
    router.push({ path: '/' });
  } catch (error) {
    console.error("Error signing out:", error);
    // Handle the error as needed
  }
}

</script>

<template>
  <form v-if="signedIn" class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="full_name">full_name</label>
      <input id="full_name" type="text" v-model="full_name" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>