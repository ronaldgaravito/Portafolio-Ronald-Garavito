<script setup>
import { Bookmark } from "lucide-vue-next";
import { useLibraryStore } from "../stores/library";
import BookCard from "../components/BookCard.vue";

const store = useLibraryStore();
</script>

<template>
  <main class="collection-view container">
    <header class="view-header">
      <h1>Mi <span class="gradient-text">Colección</span></h1>
      <p v-if="store.myCollection.length > 0">
        Tienes {{ store.myCollection.length }} libros en tu tesoro personal.
      </p>
    </header>

    <div v-if="store.myCollection.length === 0" class="empty-state glass-panel">
      <div class="empty-icon">
        <Bookmark :size="64" />
      </div>
      <h2>Tu biblioteca está vacía</h2>
      <p>
        Los libros que guardes desde la página principal aparecerán aquí para
        explorarlos más tarde.
      </p>
      <router-link to="/" class="btn-primary"> Volver al Inicio </router-link>
    </div>

    <div v-else class="grid-container animate-fade-in">
      <div v-for="book in store.myCollection" :key="book.id" class="grid-item">
        <BookCard :book="book" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.collection-view {
  padding-top: 8rem;
  padding-bottom: 5rem;
}

.view-header {
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  margin-top: 2rem;
}

.empty-icon {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h2 {
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}
</style>
