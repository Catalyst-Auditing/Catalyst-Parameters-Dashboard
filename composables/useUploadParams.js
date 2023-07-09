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
  //console.log ("upload", answers, userId, updates)

  async function uploadToSupabase() {
    error.value = null
    let updates = {
      id: userId,
      title: answers.what_changed,
      function: answers.function_of_parameter,
      category: answers.category,
      subcategory: answers.subcategory
    }
    let protocol_id = null;
    try {
      const { data, error: uploadError } = await supabase
        .from('cps')
        .insert([updates])
        .select("protocol_id")  // assuming protocol_id is a field in the response
        
      if (uploadError) {
        throw new Error(uploadError.message)
      }
      //console.log(data)
      protocol_id = data[0].protocol_id;  // again assuming protocol_id is a field in the response
    } catch (err) {
      error.value = err.message
    }

    return protocol_id;
  }

  async function uploadToSupabase2(protocol_id) {
    error.value = null
    const { category, subcategory, ...restOfAnswers } = answers;  // Destructure out category and subcategory from answers
    let dataToInsert = {
      ...restOfAnswers,  // Spread the rest of answers (excluding category and subcategory)
      id: userId,
      protocol_id // appending the protocol_id to the answers object
    };
    //console.log("dataToInsert:", dataToInsert); // debug line
    try {
      const { error: uploadError } = await supabase
        .from('protocol_details')
        .insert([dataToInsert])
          
      if (uploadError) {
        throw new Error(uploadError.message)
      }
      status.value = true;
    } catch (err) {
      error.value = err.message
      status.value = false;
    }
  }

  const protocol_id = await uploadToSupabase()
  if(protocol_id){
    await uploadToSupabase2(protocol_id)
  }

  return { status }
}
