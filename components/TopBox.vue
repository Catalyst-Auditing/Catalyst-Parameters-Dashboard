<template>
  <div class="top-box">
    <div v-if="stage === 2" class="container">{{ topItem1 }}</div>
    <div v-if="stage === 3" class="container">{{ topItem2 }}</div>
    <div v-if="stage === 4" class="container">{{ computedTitle }}</div>
    <div v-if="stage === 5" class="container">Question: </div>
    <div v-if="stage === 5" class="container">{{ topItem4.question }}</div>
    <div v-if="stage === 5" class="container">Answer: </div>
    <div v-if="stage === 5" class="container"><span v-html="convertURLsToLinks(topItem4.answer)"></span></div>
    <div v-if="stage === 1" class="container">Please select a category</div>
  </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';
  const {
    stage,
    items,
    topItem1,
    topItem2,
    topItem3,
    topItem4
  } = defineProps(['stage', 'items', 'topItem1', 'topItem2', 'topItem3', 'topItem4']);

  const computedTitle = ref('Item not found'); // Initialize with default value

  watchEffect(() => {
if (stage === 3 && items && topItem1 !== undefined && topItem2 !== undefined && topItem3 !== undefined) {
    const item1 = items[topItem1];
    if (item1) {
      const item2 = item1[topItem2];
      if (item2) {
        computedTitle.value = item2.find(element => element.id === topItem3)?.title || 'Item not found';
      } else {
        console.error('item2 is undefined', { topItem2, item1 });
      }
    } else {
      console.error('item1 is undefined', { topItem1, items });
    }
  } else {
    console.warn('One or more dependencies are undefined', { items, topItem1, topItem2, topItem3 });
  }
});


    function convertURLsToLinks(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
      });
    }
    console.log("component", items)
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
</style>
