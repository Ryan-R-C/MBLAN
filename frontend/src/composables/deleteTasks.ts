import { api } from '@/api/api'
import { ITask } from '@/interfaces/ITask'
import { ref } from 'vue'
import type { Ref } from 'vue'

const deleteTasks = (taskId: string) => {
  const deletedTask: Ref<ITask | null> = ref(null)
  const error = ref(null)

  const deleteTask = async () => {
    const { data }: { data: ITask } = await api.delete(`/tasks/${taskId}`)
    deletedTask.value = data
  }

  return { deletedTask, error, deleteTask }
}

export default deleteTasks
