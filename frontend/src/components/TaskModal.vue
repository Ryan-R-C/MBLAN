<template>
    <div class="modal" id="modal-js-example">
        <div @click="onCloseModal" class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head is-shadowless">
            <p class="modal-card-title">
                Create Task
            </p>
            <button @click="onCloseModal" class="delete" aria-label="close"></button>
            </header>
            <form @submit.prevent="create">
                <section class="modal-card-body align-left">
                    <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                            <input v-model="title" required class="input" type="text" placeholder="Title">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea v-model="description" required class="textarea" placeholder="Description"></textarea>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                <div class="buttons buttons-container is-flex is-justify-content-space-between">
                    <button @click="onCloseModal" type="button" class="button cancel">Cancel</button>
                    <button type="submit" class="button is-link">Save changes</button>
                </div>
                </footer>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { ITask } from '@/interfaces/ITask'
import { defineComponent, PropType } from 'vue'
import createTask from '@/composables/createTasks'
import updateTask from '@/composables/updateTasks'

export default defineComponent({
  name: 'TaskModal',
  props: {
    task: {
      type: Object as PropType<ITask | null>,
      required: true
    }
  },
  watch: {
    task: {
      immediate: true,
      handler (newTask) {
        if (newTask) {
          this.id = newTask.id
          this.title = newTask.title
          this.description = newTask.description
          this.completed = newTask.completed
        } else {
          this.id = ''
          this.title = ''
          this.description = ''
        }
      }
    }
  },
  data () {
    return {
      id: '',
      title: '',
      description: '',
      completed: false
    }
  },
  emits: [
    'refetchData',
    'onClose'
  ],
  methods: {
    create () {
      const onCreateTask = async () => {
        if (!this.id) {
          const { create } = createTask({ title: this.title, description: this.description })
          await create()
          this.$emit('refetchData')
          return
        }
        const { update } = updateTask({ id: this.id, title: this.title, description: this.description, completed: this.completed })
        await update()
        this.$emit('refetchData')
      }
      onCreateTask()
    },
    onCloseModal () {
      this.$emit('onClose')
    }
  }
})
</script>
<style scoped>
    .align-left {
        text-align: left;
    }
    .buttons-container {
        width: 100%;
    }
</style>
