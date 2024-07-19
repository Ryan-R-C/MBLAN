import { api } from '@/api/api'
import { ITask, ITaskProps } from '@/interfaces/ITask'
import { ref } from 'vue'
import type { Ref } from 'vue'

const createTask = (taskProps: ITaskProps) => {
  const createdTask: Ref<ITask | null> = ref(null)
  const error = ref(null)

  const create = async () => {
    const { data }: { data: ITask } = await api.post('/tasks', { ...taskProps })
    createdTask.value = data
  }

  return { createdTask, error, create }
}

export default createTask
