<script setup>
  import { useStore } from '../store/index'
  import { onMounted, ref } from 'vue'
  import { useGetCPS } from '../composables/getparameterchanges'

const store = useStore()
const protocolId = ref()
const titleR = ref()
const descriptionR = ref()
const categoryR = ref()
const idR = ref()

async function getParams() {
  const { protocol_id, title, description, category, id } = await useGetCPS()
  protocolId.value = protocol_id.value
  titleR.value = title.value
  descriptionR.value = description.value
  categoryR.value = category.value
  idR.value = id.value
}



</script>
<template>
    <div class="has-text-light">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      Home
    </div>
    <div class="column is-half is-offset-one-quarter has-text-centered">
      {{ store.name }}
      {{ store.number }}
    </div>
    </div>
</template>