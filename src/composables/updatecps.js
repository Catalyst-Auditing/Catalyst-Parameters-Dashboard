import { ref } from 'vue'
import { useStore } from '../store/index';
import { supabase } from '../supabase'

export async function useUpdateCps(title, description, category, id) {

  const status = ref('')
  const loading = ref(true)
  
  const store = useStore()

  async function updateCps() {
    
      try {
      loading.value = true

      const updates = {
        description: description,
        title: title,
        category: category,
        id: id
      }

      let { error } = await supabase.from('cps').upsert(updates)

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
    }
  
  await updateCps()
  status.value = 'done'

  return { status }
}
