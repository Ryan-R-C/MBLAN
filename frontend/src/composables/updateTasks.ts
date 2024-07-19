import { api } from '@/api/api'
import { ITask, ITaskProps } from '@/interfaces/ITask'
import { ref } from 'vue'
import type { Ref } from 'vue'

const updateTask = (taskProps: ITaskProps) => {
  const updatedTask: Ref<ITask | null> = ref(null)
  const error = ref(null)

  const update = async () => {
    const { data }: { data: ITask } = await api.put(`/tasks/${taskProps.id}`, { ...taskProps })
    updatedTask.value = data
  }

  return { updatedTask, error, update }
}

export default updateTask
