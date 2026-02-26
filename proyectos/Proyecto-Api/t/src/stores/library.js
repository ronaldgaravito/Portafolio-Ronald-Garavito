import { defineStore } from "pinia";
import axios from "axios";

export const useLibraryStore = defineStore("library", {
  state: () => ({
    searchResults: [],
    myCollection: JSON.parse(localStorage.getItem("myLibrary") || "[]"),
    loading: false,
    error: null,
    currentBook: null,
  }),

  actions: {
    async searchBooks(query) {
      if (!query) return;
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&language=spa&limit=20`,
        );
        this.searchResults = response.data.docs.map((doc) => ({
          id: doc.key.replace("/works/", ""),
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : "Unknown Author",
          coverId: doc.cover_i,
          year: doc.first_publish_year,
          subjects: doc.subject ? doc.subject.slice(0, 5) : [],
        }));
      } catch (err) {
        this.error = "Error al buscar libros. Por favor, intenta de nuevo.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchBookDetails(id) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${id}.json`,
        );
        this.currentBook = {
          ...response.data,
          description:
            typeof response.data.description === "object"
              ? response.data.description.value
              : response.data.description,
        };
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    addToCollection(book) {
      if (!this.myCollection.find((b) => b.id === book.id)) {
        this.myCollection.push(book);
        this.saveCollection();
      }
    },

    removeFromCollection(id) {
      this.myCollection = this.myCollection.filter((b) => b.id !== id);
      this.saveCollection();
    },

    saveCollection() {
      localStorage.setItem("myLibrary", JSON.stringify(this.myCollection));
    },
  },
});
