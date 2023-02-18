<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'
import { useStore } from '../store/index'
import Auth from '../components/Auth.vue'
import { useGetCPS } from '../composables/getparameterchanges'
import { useUpdateCps } from '../composables/updatecps'

const store = useStore()
const session = ref()

const protocolId = ref()
const titleR = ref()
const descriptionR = ref()
const categoryR = ref()
const subcategoryR = ref()
const idR = ref()
const allProtocols = ref({})
const menuCat = ref([])
const menuSubCat = ref([])

let parameters = {}
const selectedCategory = ref('')
const selectedSubcategory = ref('')


const full_name = ref('')
const avatar_url = ref('')
const title = ref('')
const description = ref('')
const category = ref('')
const subcategory = ref('')
const id = ref('')
const questions = ref({
  "what_changed":"What changed",
  "description":"Please describe in more detail",
  "when_mentioned":"When was it mentioned",
  "when_announced":"When was it announced",
  "when_implemented":"When was it implemented"
})

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

    parameters = JSON.parse(localStorage.getItem("parameters"));
  store.changeParameters(JSON.parse(localStorage.getItem("parameters")))
  console.log("parameters",parameters)
  if (parameters == null) {
    getParams()
  } else {
    test()
  }
  setTimeout(function() {
      console.log('PView loading', parameters);
      getParams()
    }, 1000);
    
  })

  async function getParams() {
  const { protocol_id, title, description, subcategory, category, id } = await useGetCPS()
  protocolId.value = protocol_id.value
  titleR.value = title.value
  descriptionR.value = description.value
  categoryR.value = category.value
  subcategoryR.value = subcategory.value
  idR.value = id.value
  console.log('categoryR.value',categoryR.value)
  for (let i in protocolId.value) {
    if (allProtocols.value[categoryR.value[i]] == undefined) {
      allProtocols.value[categoryR.value[i]] = {}
    }
    if (allProtocols.value[categoryR.value[i]][subcategoryR.value[i]] == undefined) {
      allProtocols.value[categoryR.value[i]][subcategoryR.value[i]] = {}
    }
    if (allProtocols.value[categoryR.value[i]][subcategoryR.value[i]][protocolId.value[i]] == undefined) {
      allProtocols.value[categoryR.value[i]][subcategoryR.value[i]][protocolId.value[i]] = {}
    }
    allProtocols.value[categoryR.value[i]][subcategoryR.value[i]][protocolId.value[i]].title = titleR.value[i]
    allProtocols.value[categoryR.value[i]][subcategoryR.value[i]][protocolId.value[i]].description = descriptionR.value[i]
  }
  
  store.changeParameters(allProtocols.value)
  console.log("store.parameters",store.parameters)
  // Save data to local storage
  localStorage.setItem("parameters", JSON.stringify(store.parameters));
  
  // Retrieve data from local storage
  parameters = JSON.parse(localStorage.getItem("parameters"));
  console.log("parameters",parameters); // Output: "John Doe"
  await test();
}

async function test() {
  menuCat.value = []
  for (let j in parameters) {
    menuCat.value.push(j)
  }
  console.log("MenuCat",menuCat.value)
}
async function getSubCat() {
  menuSubCat.value = []
  for (let subcat in parameters[selectedCategory.value]) {
    if (parameters[selectedCategory.value][subcat] !== "") {
      menuSubCat.value.push(subcat)
    }
  }
  console.log("menuSubCat.value", menuSubCat.value, selectedCategory.value)
}

  function getValue(name){
  return document.getElementById(name).value
  }
  
  async function submitChange() {
  const what_changed = getValue('what_changed')
  const descr = getValue('description')
  const when_menioned = getValue('when_mentioned')
  const when_announced = getValue('when_announced')
  const when_implemented = getValue('when_implemented')
  const cat = getValue('category')
  const subcat = getValue('subcategory')
  console.log("what_changed",what_changed, cat, subcat, store.parameters)
  
  const { user } = session.value
  id.value = user.id
  title.value = what_changed
  description.value = descr
  category.value = cat
  subcategory.value = subcat
  const { status } = await useUpdateCps(
    title.value, 
    description.value, 
    category.value, 
    subcategory.value, 
    id.value,
    when_menioned,
    when_announced,
    when_implemented
    )
  console.log('status',status.value)
}

</script>

<template>
  <div class="main">
    <div v-if="session" :session="session">
      <div>
        <h3>Fill in the form to submit a parameter change</h3>
      </div>
      <div>
      <select v-model="selectedCategory" name="category" id="category" @change="getSubCat()">
        <option value="" selected>Choose category</option>
        <option v-for="title in menuCat" :key="title" :value="title">{{ title }}</option>
      </select>
      </div>
      <div>
      <select v-model="selectedSubcategory" name="subcategory" id="subcategory">
        <option value="" selected>Choose sub category</option>
        <option v-for="title in menuSubCat" :key="title" :value="title">{{ title }}</option>
      </select>
      </div>
      <div v-for="title in questions" :key="title">
        <p>{{ title }}</p>
        <textarea 
          type='text'
          :name="Object.keys(questions).find(key => questions[key] === title)"
          :id="Object.keys(questions).find(key => questions[key] === title)" 
          cols="50" rows="2" 
          autoComplete="off" 
          :placeholder="title"
          required
          ></textarea>
      </div>
      <button type="button" @click="submitChange()">Submit</button>
    </div>
    <Auth v-else />
  </div>
</template>

<style scoped>
.main{
  display: flex;
  justify-content: space-around;
}
</style>