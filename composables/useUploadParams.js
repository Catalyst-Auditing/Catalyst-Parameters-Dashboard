import { ref } from 'vue'

export async function useUploadParams(answers, userId) {
  const supabase = useSupabaseClient()
  const error = ref(null)
  const status = ref(false)
  let updates = {
    id: userId,
    title: answers.what_changed,
    function: answers.function_of_parameter,
    category: answers.category,
    subcategory: answers.subcategory
  }
  console.log ("upload", answers, userId, updates)
  async function uploadToSupabase() {
    error.value = null
    let updates = {
      id: userId,
      title: answers.what_changed,
      function: answers.function_of_parameter,
      category: answers.category,
      subcategory: answers.subcategory
    }
    try {
      const { data, error: uploadError } = await supabase
        .from('cps')
        .insert([updates])
        .select(protocol_id)
        
      if (uploadError) {
        throw new Error(uploadError.message)
      }
      console.log(data)
      status.value = true;
    } catch (err) {
      error.value = err.message
      status.value = false;
    }
  }
  async function uploadToSupabase2() {
    error.value = null
    try {
      const { error: uploadError } = await supabase
        .from('protocol_details')
        .insert([answers])
        
      if (uploadError) {
        throw new Error(uploadError.message)
      }
      status.value = true;
    } catch (err) {
      error.value = err.message
      status.value = false;
    }
  }
  //await uploadToSupabase()
  //await uploadToSupabase2()

  return { status }
}
