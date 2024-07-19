<template>
  <div class="card p-4 card-flex">
      <header class="is-flex gap-icons">
      <p class="card-header-title p-0">{{titleFormatted}}#{{idFormatted}}</p>
      <span v-if="task.completed" class="icon">
          <i class="fa-solid fa-check"></i>
      </span>
      <button @click="onSetCompleted(task)" v-else>
          <span class="icon">
          <i class="fa-regular fa-circle"></i>
          </span>
      </button>
      <button @click="openEdit(task)" class="js-modal-trigger" data-target="modal-js-example">
        <i class="fa-solid fa-pen"></i>
      </button>

      </header>
      <div class="card-content p-0">
      <div class="content description">
          {{ descriptionFormatted }}
      </div>
      </div>
      <div class="is-flex is-align-items-center is-justify-content-space-between">
        <time datetime="2016-1-1" class="time">
          <i class="fa-solid fa-clock"></i>
          {{ hourFormatted }}
           -
          {{ dateFormatted }}
        </time>
        <button @click="onDeleteTask(task.id)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
  </div>
</template>
<script lang="ts">
import { ITask } from '@/interfaces/ITask'
import { defineComponent, PropType, computed } from 'vue'
import updateTask from '@/composables/updateTasks'
import deleteTasks from '@/composables/deleteTasks'

export default defineComponent({
  name: 'TaskComponent',
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    }
  },
  emits: [
    'toOpenEdit',
    'onRefreshData'
  ],
  methods: {
    openEdit (task: ITask) {
      this.$emit('toOpenEdit', {
        task: task
      })
    },
    onDeleteTask (taskId: string) {
      const onDeleteTask = async () => {
        const { deleteTask } = deleteTasks(taskId)
        await deleteTask()
        this.$emit('onRefreshData')
      }
      onDeleteTask()
    },
    onSetCompleted (task: ITask) {
      const onUpdateTask = async () => {
        task.completed = true
        const { update } = updateTask({ ...task })
        await update()
      }
      onUpdateTask()
    }
  },
  setup (props) {
    const idFormatted = computed(() => {
      return props.task.id.split('-')[0]
    })

    const titleFormatted = computed(() => {
      return props.task.title.length < 25 ? props.task.title : props.task.title.substring(0, 25) + '...'
    })

    const descriptionFormatted = computed(() => {
      return props.task.description.length < 100 ? props.task.description : props.task.description.substring(0, 100) + '...'
    })

    const hourFormatted = computed(() => {
      return new Date(props.task.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    })
    const dateFormatted = computed(() => {
      return new Date(props.task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    })

    return {
      titleFormatted,
      idFormatted,
      descriptionFormatted,
      hourFormatted,
      dateFormatted
    }
  }
})
</script>

<style scoped>
  .gap-container {
    gap: 32px;
  }
  .card-flex {
    border: 1px solid var(--bulma-skeleton-background);
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 450px;
    text-align: left;
    margin-bottom: 0 !important;
  }
  .gap-icons {
    gap: 6px
  }
  .description{
    font-size: 14px;
    height: 42px;
    font-weight: 500;
    word-break: break-word;
  }
  .time {
    font-size: 12px;
    font-weight: bold;
  }
  </style>
