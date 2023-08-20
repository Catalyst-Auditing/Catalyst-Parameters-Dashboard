<template>
  <div class="main">
    <div class="top-box">
      <div v-if="stage == 2" class="container">{{ topItem1 }}</div>
      <div v-if="stage == 3" class="container">{{ topItem2}}</div>
      <div v-if="stage == 4" class="container">{{ items[topItem1][topItem2].find(element => element.id === topItem3)?.title || 'Item not found' }}</div>
      <div v-if="stage == 4"><star-rating :rating="items[topItem1][topItem2].find(element => element.id === topItem3)?.rating" /></div>
      <div v-if="stage == 5" class="container">Question: </div>
      <div v-if="stage == 5" class="container">{{ topItem4.question }}</div>
      <div v-if="stage == 5" class="container">Answer: </div>
      <div v-if="stage == 5" class="container"><span v-html="convertURLsToLinks(topItem4.answer)"></span></div>
      <div v-if="stage == 1" class="container">Please select a category</div>
    </div>
    <div class="main-container">
      <div class="container">
          <transition-group :css="!disableAnimations" name="list1-transition" tag="div" class="list" :class="{ active: stage >= 1 }">
            <button 
              class="button" 
              v-for="key in list1" :key="key"
              @click="selectItem(key, 1)"
              :class="{ selected: key === topItem1 }" id="button1"
            >
              {{ key }}
            </button>
          </transition-group>
          <transition-group :css="!disableAnimations" name="list2-transition" tag="div" class="list" :class="{ active: stage >= 2 }" v-if="stage1Key">
            <button 
              class="button" 
              v-for="key in list2" :key="key"
              @click="selectSubItem(key, 2)"
              :class="{ selected: key === topItem2 }" id="button2"
            >
              {{ key }}
            </button>
          </transition-group>
          <transition-group :css="!disableAnimations" name="list3-transition" tag="div" class="list" :class="{ active: stage >= 3 }" v-if="stage1Key && stage2Key">
            <button
              class="button" 
              v-for="(item, index) in list3" :key="index"
              @click="getParamDetails(item.id, 3)"
              :class="{ selected: item.id === topItem3 }" id="button3"
            >
              <div><span class="title">{{ item.title }}</span></div>
              <!-- <div>Descrition : <span class="description">{{ item.function }}</span></div> -->
              <div><star-rating :rating="item.rating" /></div>
            </button>
          </transition-group>
          <transition-group :css="!disableAnimations" name="list4-transition" tag="div" class="list" :class="{ active: stage >= 4 }" v-if="stage1Key && stage2Key && stage3Key">
            <button
              class="button" 
              v-for="(item, index) in list4" :key="index"
              @click="getQuestionDetails(item, 4)"
              :class="{ selected: item === topItem4 }"  id="button4"
            >
              <div>Question : {{ item.question }}</div>
              <div>Answer : {{ item.answer }}</div>
            </button>
          </transition-group>
      </div>
    </div>
  </div>
</template>


<script setup>
import { watch, ref, computed } from 'vue';

const loaded = ref(false)
const route = useRoute();
const router = useRouter();
const stage = ref(1);
const stage1Key = ref('');
const stage2Key = ref('');
const stage3Key = ref('');
const thirdItems = ref([]);
const finalItems = ref([]);
const topItem1 = ref('');
const topItem2 = ref('');
const topItem3 = ref('');
const topItem4 = ref('');
const disableAnimations = ref(false);
const { processedData } = await useGetParams();
let items = processedData.value
console.log(processedData.value)
let selectedItem = ref(null);
let selectedSubItem = ref(null);
let selectedSubSubItem = ref(null);

onMounted(async () => {
  loaded.value = true;
  console.log("onMounter route", route.params)
  const segments = route.fullPath.replace(/^\/|\/$/g, '').split('/');
  if (route.params.stage && segments.length < 4) {
    stage.value = Number(route.params.stage);
  }
  if (route.params.item1 && segments.length < 5) {
    step2(route.params.item1, stage.value);
  }
  if (route.params.item2 && segments.length < 6) {
    step3(route.params.item2, stage.value);
  }
  if (route.params.item3 && segments.length < 7) {
    await step4(route.params.item3, stage.value);
  }
});

function step2(item, stageNumber) {
  topItem1.value = item;
  topItem2.value = '';
  topItem3.value = '';
  topItem4.value = '';
  selectedItem.value = item;
  selectedSubItem.value = null; 
  selectedSubSubItem.value = null;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 2;
  stage1Key.value = item
}

function step3(subItem, stageNumber) {
  topItem1.value = route.params.item1
  topItem2.value = subItem;
  topItem3.value = '';
  topItem4.value = '';
  selectedItem.value = route.params.item1;
  selectedSubItem.value = subItem;
  selectedSubSubItem.value = null;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 3;
  stage1Key.value = route.params.item1
  stage2Key.value = subItem
  thirdItems.value = items[stage1Key.value][stage2Key.value]
}

async function step4(subSubItem, stageNumber) {
  topItem1.value = route.params.item1
  topItem2.value = route.params.item2
  selectedItem.value = route.params.item1;
  selectedSubItem.value = route.params.item2;
  const { processedData2 } = await useGetParamDetails(subSubItem);
  topItem3.value = subSubItem;
  topItem4.value = '';
  selectedSubSubItem.value = processedData2.value;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 4;
  stage1Key.value = route.params.item1
  stage2Key.value = route.params.item2;
  stage3Key.value = subSubItem
  thirdItems.value = items[stage1Key.value][stage2Key.value]
  finalItems.value = selectedSubSubItem.value
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function convertURLsToLinks(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '" target="_blank">' + url + '</a>';
  });
}

const list1 = computed(() => {
  if (topItem1.value) {
    return [topItem1?.value, ...Object.keys(items).filter(key => key !== topItem1?.value)];
}
  return Object.keys(items);
});
const list2 = computed(() => {
  if (topItem2.value) {
    return [topItem2?.value, ...Object.keys(items[stage1Key.value]).filter(key => key !== topItem2?.value)];
  }
  return Object.keys(items[stage1Key.value] || {});
});
const list3 = computed(() => {
  return (thirdItems.value || []);
});
const list4 = computed(() => {
  return (finalItems.value || []);  
});


function selectItem(item, stageNumber) {
  stage.value = 2;
  router.push(`/cps/${stage.value}/${item}`);
}

function selectSubItem(subItem, stageNumber) {
  topItem2.value = subItem;
  topItem3.value = '';
  topItem4.value = '';
  selectedSubItem.value = subItem;
  selectedSubSubItem.value = null;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 3;
  stage2Key.value = subItem
  thirdItems.value = items[stage1Key.value][stage2Key.value]
  router.push(`/cps/${stage.value}/${stage1Key.value}/${subItem}`);
}

async function getParamDetails(subSubItem, stageNumber) {
  //const { processedData2 } = await useGetParamDetails(subSubItem);
  //topItem3.value = subSubItem;
  topItem4.value = '';
  //selectedSubSubItem.value = processedData2.value;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 4;
  stage3Key.value = subSubItem
  finalItems.value = selectedSubSubItem.value
  window.scrollTo({ top: 0, behavior: 'smooth' });
  router.push(`/cps/${stage.value}/${stage1Key.value}/${stage2Key.value}/${subSubItem}`);
}
async function getQuestionDetails(questions, stageNumber) {
  topItem4.value = questions;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 5;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
}
.top-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 700px;
  border: 1px solid gray; 
  border-radius: 5px;
  padding: 10px;
  margin-bottom: -50px;
}
.main-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
}
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.list {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
.list.active {
  display: flex;
  flex-direction: column;
}
#firstList {
  display: flex;
  flex-direction: column;
}

.button {
  order: 1;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid gray; 
  border-radius: 5px;
  cursor: pointer;
}
#button1 {
    margin-bottom: 20px;
    width: 14em;
  }
#button2 {
    margin-bottom: 20px;
    width: 14em;
  }
#button3 {
    margin-bottom: 20px;
    width: 30em;
    text-transform: none;
  }
#button4 {
    margin-bottom: 20px;
    width: 40em;
    text-transform: none;
  }
.button:hover {
  border: 1px solid white; /* Add white border on hover */
}
.list button.selected {
    order: 0;
    font-weight: bold;
    padding: 10px 20px;  /* Increase padding to make buttons bigger */
}
.list1-transition-move,
.list2-transition-move,
.list3-transition-move,
.list4-transition-move {
  transition: transform 0.5s;
}
.rating-button {
  position: relative;
  padding: 10px;
  margin: 5px;
  background-color: #f5f5f5;
}
.title {
  color: rgb(202, 252, 253);
}
.description {
  color: rgb(210, 212, 156);
}
</style>

