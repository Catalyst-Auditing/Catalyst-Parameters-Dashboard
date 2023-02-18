import { ref } from 'vue'
import { useStore } from '../store/index';
import { supabase } from '../supabase'

export async function useUpdateCps(title, 
  description, 
  category, 
  subcategory, 
  id,
  when_menioned,
  when_announced,
  when_implemented
  ) {

  const status = ref('')
  const loading = ref(true)
  const protocol_id = ref()
  
  const store = useStore()

  async function updateCps() {
      try {
      loading.value = true
      const updates = {
        description: description,
        title: title,
        category: category,
        subcategory: subcategory,
        id: id
      }
      let { data, error } = await supabase
      .from('cps')
      .upsert(updates)
      .select(`protocol_id`)
      .single()

      if (error) throw error
      if (data) {
        protocol_id.value = data.protocol_id
        console.log('Testing if data returns when sending data', protocol_id.value)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  async function updateQuestions() {
    try {
    loading.value = true
    const updates = {
      what_changed: title,
      description: description,
      when_mentioned: when_menioned,
      when_announced: when_announced,
      when_implemented: when_implemented,
      id: id,
      protocol_id: protocol_id.value
    }
    let { error } = await supabase
    .from('protocol_details')
    .upsert(updates)
    
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
  
  await updateCps()
  await updateQuestions()
  status.value = 'done'

  return { status }
}
