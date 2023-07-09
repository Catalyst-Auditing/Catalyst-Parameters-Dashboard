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
    "what_changed": "What changed?",
    "function_of_parameter": "Function of the parameter",
    "who_initiated": "Who initiated this change?",
    "when_mentioned": "Date first raised, considered, or discussed by whoever implemented it",
    "when_announced": "Date first announced that a decision had been made and that the change would be implemented",
    "when_implemented": "Date actually implemented",
    "who_had_input": "Who had input or was consulted",
    "where_communicated": "How or where communicated to the whole community",
    "discussion_before_announced": "Link to documentation of any discussion before it was announced",
    "publication": "Any published research or publication underpinning it",
    "community_comments": "Any community comments on how it was shared, how informed they felt, etc",
    "roles_affected": "Which roles in Catalyst does this parameter change affect?",
    "should_community_control": "Do community members submitting this change think this parameter should be in the control of the Catalyst community?",
    "conditions_for_control": "What conditions would have to be met before the Catalyst community could take control of this parameter?"
  };
  
  async function getData(): Promise<void> {  
    const supabase = useSupabaseClient()
    try {
      loading.value = true

      let { data: responseData, error, status: responseStatus } = await supabase
        .from('protocol_details')
        .select(`protocol_id, id, created_at, what_changed, function_of_parameter, who_initiated, when_mentioned, when_announced, when_implemented, who_had_input, where_communicated, discussion_before_announced, publication, community_comments, roles_affected, should_community_control, conditions_for_control`)
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
