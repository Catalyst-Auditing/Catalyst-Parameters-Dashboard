import { ref } from 'vue' 
import { supabase } from '../supabase'

// by convention, composable function names start with "use"
export async function useGetQuestions(protocol_id) {
  
    const loading = ref(true)
  
    const questions = ref({})
    

  async function getQuestions() {  
    
    try {
      loading.value = true

      let { data, error, status } = await supabase
        .from('protocol_details')
        .select(`what_changed, when_mentioned, when_announced, when_implemented`)
        .eq('protocol_id', protocol_id)
        
      if (error && status !== 406) throw error

      if (data) {
        console.log("tadat",protocol_id)
        for (let j in data) {
          questions.value = {}
          questions.value.what_changed = {}
          questions.value.what_changed = data[j].what_changed
          questions.value.when_mentioned = {}
          questions.value.when_mentioned = data[j].when_mentioned
          questions.value.when_announced = {}
          questions.value.when_announced = data[j].when_announced
          questions.value.when_implemented = {}
          questions.value.when_implemented = data[j].when_implemented
        }
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  await getQuestions()
  console.log("questions.value",questions.value)
  return { questions }
}
