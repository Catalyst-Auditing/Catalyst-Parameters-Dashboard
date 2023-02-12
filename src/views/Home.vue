<script setup>
  import { useStore } from '../store/index'
  import { onMounted, ref } from 'vue'
  import { useGetCPS } from '../composables/getparameterchanges'
  import { useGetQuestions } from '../composables/getquestions'
  import { useGetSpecificCPS } from '../composables/getspecificcps'

const store = useStore()
const protocolId = ref()
const titleR = ref()
const descriptionR = ref()
const categoryR = ref()
const subcategoryR = ref()
const idR = ref()
const allProtocols = ref({})
const questionsR = ref({})
const whenMentioned = ref([])
const whenAnnounced = ref([])
const whenImplemented = ref([])
const rating = ref()
const loading = ref(false)

const menuCat = ref([])
const menuSubCat = ref([])
const menuParameter = ref([])

let menu = ''
let submenu = ''
let parameters = {}

const spec_titleR = ref()
const spec_descriptionR = ref()
const spec_subcategoryR = ref()
const spec_protocolId = ref()

onMounted(() => {
  // Remove data from local storage
  // localStorage.removeItem("parameters"); 
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
    for (let k in parameters[j]) {
      if (parameters[j] == "") {
        menuSubCat.value.push(k)
      }
    }
  }
  console.log("MenuCat",menuCat.value)
}

async function selectElement(container, elem, title) {
  spec_titleR.value = []
  spec_subcategoryR.value = []
  questionsR.value = {}
  rating.value = "⭐⭐⭐⭐⭐"
  store.changeCategory(title)
  menu = 'category'
  for (let j in parameters) {
    for (let k in parameters[j]) {
      console.log("allProtocols.value[j]",parameters[j])
      if (j == title) {
        spec_subcategoryR.value.push(k)
      }
    }
  }
  
  const links = container.querySelectorAll('.link');
  links.forEach(link => link.classList.remove('selected'));
  elem.classList.toggle("selected");
  console.log("Test1",menu,title, store.category)
}

async function selectElement2(container, elem, title) {
  submenu = 'subcategory'
  spec_titleR.value = {}
  spec_protocolId.value = {}
  questionsR.value = {}
  for (let j in parameters[store.category][title]) {
    console.log("j",parameters[store.category][title][j])
    spec_titleR.value[parameters[store.category][title][j].title] = parameters[store.category][title][j].description
    spec_protocolId.value[j] = parameters[store.category][title][j].title
  }
  const links = container.querySelectorAll('.link1');
  links.forEach(link1 => link1.classList.remove('selected2'));
  elem.classList.toggle("selected2");
  console.log("spec_protocolId.value",spec_protocolId.value)
}

async function selectElement3(container, elem, title) {
  loading.value = true
  const { questions } = await useGetQuestions(title)
  questionsR.value = questions.value
  loading.value = false
  const links = container.querySelectorAll('.link2:not(.rank):not(.title)');
  links.forEach(link2 => link2.classList.remove('selected3'));
  elem.closest('.link2').classList.toggle("selected3");
  console.log("questionsR.value", questionsR.value)
}

</script>
<template>
    <div class="main-container">
      <div class="container" ref="container">
        <p>Step 1</p>
        <p>Choose Category</p>
        <div class="link" v-for="title in menuCat" :key="title" @click="selectElement($refs.container, $event.target, title)">{{ title }}</div>
      </div>
      <div class="container1" ref="container1">  
        <p>Step 2</p>
        <p>Choose Sub-category</p>
        <div class="link1" v-for="title in spec_subcategoryR" :key="title" @click="selectElement2($refs.container1, $event.target, title)">{{ title }}</div>
      </div>
      <div class="container2" ref="container2">
        <p>Step 3</p>
        <p>Choose Parameter change</p>
        <div class="link2" v-for="title in spec_titleR" :key="title" @click="selectElement3($refs.container2, $event.target, Object.keys(spec_protocolId).find(key => spec_protocolId[key] === Object.keys(spec_titleR).find(key => spec_titleR[key] === title)))">{{ Object.keys(spec_titleR).find(key => spec_titleR[key] === title) }}<div class="title">{{ title }}</div><div class="rank">{{ rating }}</div></div>
      </div>
      <div class="container3" ref="container3">
        <p>Step 4 - View question and answers</p>
        <div v-if="loading">Loading</div>
        <div v-else class="link3" v-for="title in questionsR" :key="title">{{ Object.keys(questionsR).find(key => questionsR[key] === title) }} <div>{{ title }}</div></div>
      </div>
    </div>
</template>

<style scoped>
.rank {
   position: absolute;
   bottom: 0;
   right: 0;
   font-size: smaller;
   width: 100px;
   height: 26px;
}
.title {
  font-size: smaller;
}
.link:hover {
  background-color:black;
  border-radius: 5px;
  cursor: pointer;
}
.link1:hover {
  background-color:black;
  border-radius: 5px;
  cursor: pointer;
}
.link2:hover {
  background-color:black;
  border-radius: 5px;
  cursor: pointer;
}
.selected {
  background-color: #1d8be6;
  border-radius: 8px;
  border: 1px solid transparent;
  outline: 4px auto -webkit-focus-ring-color;
}
.selected2 {
  background-color: #1d8be6;
  border-radius: 8px;
  border: 1px solid transparent;
  outline: 4px auto -webkit-focus-ring-color;
}

.selected3 {
  background-color: #1d8be6;
  border-radius: 8px;
  border: 1px solid transparent;
  outline: 4px auto -webkit-focus-ring-color;
}

.selected4 {
  background-color: #1d8be6;
  border-radius: 8px;
  border: 1px solid transparent;
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
