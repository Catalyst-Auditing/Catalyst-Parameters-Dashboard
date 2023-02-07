<script setup>
  import { useStore } from '../store/index'
  import { onMounted, ref } from 'vue'
  import { useGetCPS } from '../composables/getparameterchanges'

const store = useStore()
const protocolId = ref()
const titleR = ref()
const descriptionR = ref()
const categoryR = ref()
const subcategoryR = ref()
const idR = ref()

onMounted(() => {
  getParams()
})

async function getParams() {
  const { protocol_id, title, description, subcategory, category, id } = await useGetCPS()
  protocolId.value = protocol_id.value
  titleR.value = title.value
  descriptionR.value = description.value
  categoryR.value = category.value
  subcategoryR.value = subcategory.value
  idR.value = id.value
  console.log("Test",titleR.value)
}

async function test() {
  console.log("Test2",titleR.value)
}

function selectElement(container, elem, title) {
  const links = container.querySelectorAll('.link');
  links.forEach(link => link.classList.remove('selected'));
  elem.classList.toggle("selected");
  console.log("Test1",title)
}

function selectElement2(container, elem, title) {
  const links = container.querySelectorAll('.link1');
  links.forEach(link1 => link1.classList.remove('selected2'));
  elem.classList.toggle("selected2");
  console.log("Test2",title)
}

function selectElement3(container, elem, title) {
  const links = container.querySelectorAll('.link2');
  links.forEach(link2 => link2.classList.remove('selected3'));
  elem.classList.toggle("selected3");
  console.log("Test3",title)
}

</script>
<template>
    <div class="main-container">
      <div class="container" ref="container">
        <p>Step 1</p>
        <p>Choose Category</p>
        <div class="link" v-for="title in categoryR" :key="title" @click="selectElement($refs.container, $event.target, title)">{{ title }}</div>
      </div>
      <div class="container1" ref="container1">  
        <p>Step 2</p>
        <p>Choose Sub-category</p>
        <div class="link1" v-for="title in subcategoryR" :key="title" @click="selectElement2($refs.container1, $event.target, title)">{{ title }}</div>
      </div>
      <div class="container2" ref="container2">
        <p>Step 3</p>
        <p>Choose Parameter change</p>
        <div class="link2" v-for="title in titleR" :key="title" @click="selectElement3($refs.container2, $event.target, title)">{{ title }}</div>
      </div>
      <div class="container3">
        <p>Step 4 - View question and answers</p>
        <div class="card"><p>Question - What Changed?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid ducimus praesentium atque unde deserunt ipsa architecto itaque possimus odit at quaerat illo, temporibus fuga incidunt modi porro ea esse nam optio accusamus eligendi error minus? Tenetur, nulla. Fugiat, ab labore, repellendus velit eius et nihil ut blanditiis harum ex eaque.
        </p>
        </div>
        <div class="card">test</div>
        <div class="card">test</div>
      </div>
    </div>
</template>

<style scoped>
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
</style>
