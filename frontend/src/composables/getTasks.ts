import { api } from '@/api/api'
import { ITask } from '@/interfaces/ITask'
import { ref } from 'vue'
import type { Ref } from 'vue'

const getTasks = () => {
  const tasks: Ref<ITask[]> = ref([])
  const error = ref(null)

  const loadTasks = async (searchQuery?: string) => {
    try {
      const { data }: { data: ITask[] } = await api.get('/tasks', {
        params: {
          q: searchQuery
        }
      })
      tasks.value = data
    } catch (e) {
      console.error(e)
    }
  }

  return { tasks, error, loadTasks }
}

export default getTasks
