<script setup>
import { ref, onMounted } from "vue";
import { Search, Loader2, Sparkles } from "lucide-vue-next";
import { useLibraryStore } from "../stores/library";
import BookCard from "../components/BookCard.vue";

const store = useLibraryStore();
const searchQuery = ref("");

const handleSearch = () => {
  store.searchBooks(searchQuery.value);
};

onMounted(() => {
  if (store.searchResults.length === 0) {
    store.searchBooks("Fantasía"); // Búsqueda inicial en español
  }
});
</script>

<template>
  <main class="home-view">
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content animate-fade-in">
        <div class="badge">
          <Sparkles :size="14" />
          <span>Descubre tu próxima aventura</span>
        </div>
        <h1>
          Explora el universo de <br /><span class="gradient-text"
            >Lumina Library</span
          >
        </h1>

        <div class="search-container glass-panel">
          <Search class="search-icon" :size="20" />
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Busca por título, autor o ISBN..."
          />
          <button @click="handleSearch" class="btn-primary">Buscar</button>
        </div>
      </div>
    </header>

    <!-- Results Section -->
    <section class="results container">
      <div v-if="store.loading" class="state-container">
        <Loader2 class="spinner" :size="48" />
        <p>Buceando en los archivos...</p>
      </div>

      <div v-else-if="store.error" class="state-container error">
        <p>{{ store.error }}</p>
      </div>

      <div v-else class="grid-container">
        <div
          v-for="book in store.searchResults"
          :key="book.id"
          class="grid-item"
        >
          <BookCard :book="book" />
        </div>
      </div>

      <div
        v-if="!store.loading && store.searchResults.length === 0"
        class="state-container"
      >
        <p>No se encontraron libros. Intenta con otro término.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  padding: 8rem 2rem 4rem;
  background:
    radial-gradient(
      circle at top right,
      rgba(129, 140, 248, 0.15),
      transparent
    ),
    radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.1), transparent);
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(129, 140, 248, 0.1);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(129, 140, 248, 0.2);
}

h1 {
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 2.5rem;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  padding-left: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  gap: 1rem;
}

.search-icon {
  color: var(--text-muted);
}

input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.1rem;
  outline: none;
  width: 100%;
}

.results {
  padding-bottom: 5rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.state-container {
  padding: 10rem 0;
  text-align: center;
  color: var(--text-muted);
}

.spinner {
  animation: spin 1s linear infinite;
  color: var(--primary);
  margin-bottom: 1rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  .search-container {
    flex-direction: column;
    padding: 1rem;
  }
  .search-container button {
    width: 100%;
  }
}
</style>
