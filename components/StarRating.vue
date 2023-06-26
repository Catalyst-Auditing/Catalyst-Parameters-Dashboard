<template>
  <div class="star-rating">
    <span v-for="star in stars" :key="star" :class="{ filled: star <= rating }">
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: ['rating'],
  data() {
    return {
      stars: [1, 2, 3, 4, 5]
    }
  }
}
</script>

<style scoped>
.star-rating {
  display: flex;  
  justify-content: center;  
  margin-bottom: -0.5em;
}

.star-rating span {
  color: #707070;
  font-size: 15px;
}

.star-rating .filled {
  color: gold;
}
</style>
