import { ref, Ref, computed } from 'vue'

interface Data {
  protocol_id: string;
  id: string;
  created_at: string;
  title: string;
  function: string;
  category: string;
  subcategory: string;
  status: string;
  rating: number;
}

interface ProcessedData {
    [category: string]: {
      [subcategory: string]: {
          id: string;
          title: string;
          function: string;
          rating: number;
      }[]
    }
}


export const useGetParams = async () => {

  const data: Ref<Data[] | null> = ref(null)
  const status: Ref<string> = ref('')
  const loading: Ref<boolean> = ref(false)
  
  async function getData(): Promise<void> {  
    const supabase = useSupabaseClient()
    try {
      loading.value = true

      let { data: responseData, error, status: responseStatus } = await supabase
        .from('cps')
        .select(`protocol_id, id, created_at, title, function, category, subcategory, status, rating`)
        
      if (error && responseStatus !== 406) throw error

      if (responseData) {
        data.value = responseData;
        //console.log(data.value)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  await getData();

  const processedData = computed(() => {
    let result: ProcessedData = {};
    data.value?.forEach(item => {
      if (!result[item.category]) {
        result[item.category] = {};
      }
      if (!result[item.category][item.subcategory]) {
        result[item.category][item.subcategory] = [];
      }
      result[item.category][item.subcategory].push({
        id: item.protocol_id,
        title: item.title,
        function: item.function,
        rating: item.rating
      });
    });
    return result;
  });
  
  

  return { status, processedData }
}
