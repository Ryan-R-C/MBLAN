<template>
  <div class="home">
    <main class="is-flex is-flex-direction-column is-multiline">
      <MainHeader @updateSearch="handleSearch" />

      <TaskModal @refetchData="loadData" @onClose="onClearModal" :task="selectedTask"/>

      <section class="is-flex is-flex-direction-column is-multiline gap-container padding-container">
        <div class="">
          <h1 class="title">To do list</h1>
        </div>
        <div v-if="!!tasks?.length" class="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center gap-container">
          <TaskComponent @onRefreshData="loadData" @toOpenEdit="toOpenEdit" v-for="(task, index) in tasks" :key="index" :task="task"/>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { ITask } from '@/interfaces/ITask'
import TaskComponent from '@/components/TaskComponent.vue'
import TaskModal from '@/components/TaskModal.vue'
import MainHeader from '@/components/MainHeader.vue'
import getTasks from '@/composables/getTasks'
import deleteTasks from '@/composables/deleteTasks'
import { closeAllModals, openModal } from '@/utils/modal'

export default defineComponent({
  name: 'HomeView',
  setup () {
    const selectedTask = ref<ITask | null>(null)
    const searchQuery = ref<string>('')

    const { tasks, error, loadTasks } = getTasks()

    const handleSearch = (query: string) => {
      searchQuery.value = query
    }

    watch(searchQuery, (newQuery) => {
      loadTasks(newQuery)
    })

    onMounted(() => {
      loadTasks(searchQuery.value)
    })

    return {
      tasks,
      error,
      loadTasks,
      selectedTask,
      searchQuery,
      handleSearch
    }
  },
  methods: {
    toOpenEdit ({ task }: { task: ITask }) {
      this.selectedTask = task
      this.onOpenModal()
    },
    loadData () {
      this.onClearModal()
      this.loadTasks()
      closeAllModals()
    },
    onOpenModal () {
      const $target = document.getElementById('modal-js-example')
      openModal($target)
    },
    onClearModal () {
      this.selectedTask = null
    },
    onDeleteTask (taskId: string) {
      const onDeleteTask = async () => {
        const { deleteTask } = deleteTasks(taskId)
        await deleteTask()
        this.loadData()
      }
      onDeleteTask()
    }
  },
  components: {
    TaskComponent,
    TaskModal,
    MainHeader
  }
})
</script>

<style scoped>
main {
  --primary-bg: #ffff;
  --primary-text: #363636;
  --main-transition: background-color 1.5s, color .75s;
}

.button-modal {
  width: 100%;
}

.gap-container {
  gap: 32px;
}

.padding-container {
  padding: 32px;
}

.title {
  text-align: left;
}
</style>
