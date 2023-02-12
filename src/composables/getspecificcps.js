// mouse.js
import { ref } from 'vue' 
import { supabase } from '../supabase'

// by convention, composable function names start with "use"
export async function useGetSpecificCPS(menu, cat) {
  
    const loading = ref(true)
  
    const spec_protocol_id = ref([])
    const spec_title = ref([])
    const spec_description = ref([])
    const spec_category = ref([])
    const spec_subcategory = ref([])
    const spec_id = ref([])

  async function getParameters() {  // still busy building and testing
    
    try {
      loading.value = true

      let { data, error, status } = await supabase
        .from('cps')
        .select(`protocol_id, title, description, subcategory, category, id`)
        .eq(menu, cat)
        //.eq('category', 'Administration')
        
      if (error && status !== 406) throw error

      if (data) {
        for (let j in data) {
          spec_protocol_id.value.push(data[j].protocol_id)
          spec_title.value.push(data[j].title)
          spec_description.value.push(data[j].description)
          spec_category.value.push(data[j].category)
          spec_subcategory.value.push(data[j].subcategory)
          spec_id.value.push(data[j].id)
        }
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
    spec_category.value = Array.from(new Set(spec_category.value))
    spec_subcategory.value = Array.from(new Set(spec_subcategory.value))
  }

  await getParameters()

  return { spec_protocol_id, spec_title, spec_description, spec_subcategory, spec_category, spec_id }
}
