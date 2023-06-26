<template>
  <div>
    <form @submit.prevent="updateData" class="form-container">
      <div v-for="(question, key) in questions" :key="key" class="form-group">
        <label :for="key">{{ question }}</label>
        <input v-model="answers[key]" :id="key" type="text" class="form-input" autocomplete="off" />
      </div>
      <button type="submit">Submit changes</button>
    </form>
  </div>
</template>


<script setup>
const questions = {
  what_changed: 'What changed?',
  function_of_parameter: 'Function of the parameter',
  who_initiated: 'Who initiated this change?',
  when_mentioned: 'Date first raised, considered, or discussed by whoever implemented it',
  when_announced: 'Date first announced that a decision had been made and that the change would be implemented',
  when_implemented: 'Date actually implemented',
  who_had_input: 'Who had input or was consulted',
  where_communicated: 'How or where communicated to the whole community',
  discussion_before_announced: 'Link to documentation of any discussion before it was announced',
  publication: 'Any published research or publication underpinning it',
  community_comments: 'Any community comments on how it was shared, how informed they felt, etc',
  roles_affected: 'Which roles in Catalyst does this parameter change affect?',
  should_community_control: 'Do community members submitting this change think this parameter should be in the control of the Catalyst community?',
  conditions_for_control: 'What conditions would have to be met before the Catalyst community could take control of this parameter?'
}
const answers = ref({
  what_changed: '',
  function_of_parameter: '',
  who_initiated: '',
  when_mentioned: '',
  when_announced: '',
  when_implemented: '',
  who_had_input: '',
  where_communicated: '',
  discussion_before_announced: '',
  publication: '',
  community_comments: '',
  roles_affected: '',
  should_community_control: '',
  conditions_for_control: ''
})

async function updateData() {
  console.log(answers.value)
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1em;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.form-input {
  background-color: black;
  color: white;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0.5em;
}

button {
  align-self: center;
  padding: 0.5em 1em;
  margin-top: 1em;
  margin-bottom: 100px;
}
</style>
