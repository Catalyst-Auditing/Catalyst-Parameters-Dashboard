import { ref, Ref, computed } from 'vue'

interface Data {
  [key: string]: any; 
  protocol_id: string;
  id: string;
  created_at: string;
  what_changed: string;
  function_of_parameter: string;
  when_mentioned: string;
  when_announced: string;
  when_implemented: string;
}

interface ProcessedData2 {
    [protocol_id: string]: {
      title: string;
      function_of_parameter: string;
      when_mentioned: string;
      when_announced: string;
      when_implemented: string;
    };
  }
  
  


export const useGetParamDetails = async (protocolId: any) => {

  const data: Ref<Data[] | null> = ref(null)
  const status: Ref<string> = ref('')
  const loading: Ref<boolean> = ref(false)
  const questions: any = {
    "what_changed":"What Changed",
    "function_of_parameter":"Function of parameter",
    "when_mentioned":"When was it mentioned",
    "when_announced":"When was it announced",
    "when_implemented":"When was it implemented"
  };
  
  async function getData(): Promise<void> {  
    const supabase = useSupabaseClient()
    try {
      loading.value = true

      let { data: responseData, error, status: responseStatus } = await supabase
        .from('protocol_details')
        .select(`protocol_id, id, created_at, what_changed, function_of_parameter, when_mentioned, when_announced, when_implemented`)
        .eq('protocol_id', protocolId)
        
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

  const processedData2 = computed(() => {
    let result: Array<{question: string, answer: string}> = [];
    let i = 1;
    data.value?.forEach((item: Data) => { // Explicitly typing item as Data
      Object.keys(item).forEach((key, index) => {
        if (key !== 'protocol_id' && key !== 'title' && key !== "created_at" && key !== "id") {
          result.push({
            question: `${questions[key]}`,
            answer: item[key]
          })
          i++;
        }
      });
    });
    return result;
  });

  return { status, processedData2 }
}
