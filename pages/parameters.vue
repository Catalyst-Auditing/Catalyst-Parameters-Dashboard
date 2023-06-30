<template>
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
            @click="getParamDetails(item, 3)"
            :class="{ selected: item === topItem3 }" id="button3"
          >
            <div>Title : <span class="title">{{ item.title }}</span></div>
            <div>Descrition : <span class="description">{{ item.function }}</span></div>
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
</template>


<script setup>
import { watch, ref, computed } from 'vue';
onMounted(() => {
  const router = useRouter();
  if (localStorage.getItem('refreshed')) {
    localStorage.removeItem('refreshed');
    router.push('/loading');
  } else {
    localStorage.setItem('refreshed', 'true');
  }
})
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
}

async function getParamDetails(subSubItem, stageNumber) {
  const { processedData2 } = await useGetParamDetails(subSubItem.id);
  topItem3.value = subSubItem;
  topItem4.value = '';
  selectedSubSubItem.value = processedData2.value;
  if (stageNumber < stage.value) {
    disableAnimations.value = true;
  } else {
    disableAnimations.value = false;
  }
  stage.value = 4;
  stage3Key.value = subSubItem
  finalItems.value = selectedSubSubItem.value
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
    display: none;
    flex-direction: column;
    margin-right: 20px;
  }
.list.active {
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
  }
#button4 {
    margin-bottom: 20px;
    width: 40em;
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

