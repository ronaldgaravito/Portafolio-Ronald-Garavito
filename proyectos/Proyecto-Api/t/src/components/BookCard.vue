<script setup>
import { Bookmark, BookmarkCheck, MoreHorizontal } from "lucide-vue-next";
import { useLibraryStore } from "../stores/library";
import { computed } from "vue";

const props = defineProps({
  book: Object,
});

const store = useLibraryStore();
const isSaved = computed(() =>
  store.myCollection.some((b) => b.id === props.book.id),
);

const coverUrl = computed(() =>
  props.book.coverId
    ? `https://covers.openlibrary.org/b/id/${props.book.coverId}-M.jpg`
    : "https://via.placeholder.com/300x450/1e293b/94a3b8?text=No+Cover",
);

const toggleStatus = (e) => {
  e.stopPropagation();
  if (isSaved.value) {
    store.removeFromCollection(props.book.id);
  } else {
    store.addToCollection(props.book);
  }
};
</script>

<template>
  <div class="glass-card book-card">
    <div class="card-cover">
      <img :src="coverUrl" :alt="book.title" loading="lazy" />
      <div class="card-overlay">
        <button
          @click="toggleStatus"
          class="status-btn"
          :title="isSaved ? 'Quitar de la colección' : 'Añadir a la colección'"
        >
          <BookmarkCheck v-if="isSaved" class="icon-saved" />
          <Bookmark v-else />
        </button>
      </div>
    </div>

    <div class="card-content">
      <h3 class="title">{{ book.title }}</h3>
      <p class="author">{{ book.author }}</p>
      <div class="meta">
        <span class="year">{{ book.year }}</span>
        <button class="detail-btn">
          <MoreHorizontal :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  border-radius: 1.25rem;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-cover {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.book-card:hover .card-cover img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
}

.status-btn {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  transform: scale(1.1);
}

.icon-saved {
  color: #fbbf24;
}

.card-content {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--text-main);
}

.author {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year {
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
  color: var(--primary);
  font-weight: 600;
}

.detail-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s;
}

.detail-btn:hover {
  color: var(--primary);
}
</style>
