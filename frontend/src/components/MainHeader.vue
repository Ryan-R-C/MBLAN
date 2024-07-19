<template>
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="control has-icons-right">
            <input
              class="input"
              type="search"
              placeholder="Search"
              v-model="internalSearchQuery"
              @input="emitSearch"
            />
            <span class="icon is-right">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-dark button-modal js-modal-trigger" data-target="modal-js-example">
              <span class="icon">
                <i class="fa-solid fa-plus"></i>
              </span>
              <strong>Create new</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainHeader',
  emits: ['updateSearch'],
  setup (_, { emit }) {
    const internalSearchQuery = ref('')

    const emitSearch = () => {
      emit('updateSearch', internalSearchQuery.value)
    }

    return { emitSearch, internalSearchQuery }
  }
})
</script>

  <style scoped>
  </style>
