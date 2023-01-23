// mouse.js
import { ref } from 'vue' 
import { supabase } from '../supabase'

// by convention, composable function names start with "use"
export async function useGetCPS() {
  
    const loading = ref(true)
  
    const protocol_id = ref([])
    const title = ref([])
    const description = ref([])
    const category = ref([])
    const id = ref([])

  async function getApprovedParameters() {  // still busy building and testing
    
    try {
      loading.value = true

      let { data, error, status } = await supabase
        .from('cps')
        .select(`protocol_id, title, description, category, id`)
        .eq('status', 'Approved')
        
      if (error && status !== 406) throw error

      if (data) {
        for (let j in data) {
          protocol_id.value.push(data[j].protocol_id)
          title.value.push(data[j].title)
          description.value.push(data[j].description)
          category.value.push(data[j].category)
          id.value.push(data[j].id)
        }
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  await getApprovedParameters()

  return { protocol_id, title, description, category, id }
}
