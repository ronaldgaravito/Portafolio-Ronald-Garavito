<script setup>
import { Library, Home, Bookmark } from "lucide-vue-next";
</script>

<template>
  <nav class="navbar glass-panel">
    <div class="nav-content container">
      <router-link to="/" class="logo">
        <Library :size="28" class="logo-icon" />
        <span>Lumina</span>
      </router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-item">
          <Home :size="20" />
          <span>Inicio</span>
        </router-link>
        <router-link to="/collection" class="nav-item">
          <Bookmark :size="20" />
          <span>Mis Libros</span>
        </router-link>
      </div>
    </div>
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <footer class="footer container">
    <p>&copy; 2026 Lumina Library. Impulsado por Open Library API.</p>
  </footer>
</template>

<style>
.navbar {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 1100px;
  z-index: 100;
  border-radius: 2rem !important;
  padding: 0.75rem 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}

.logo-icon {
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}

.nav-item:hover,
.router-link-active {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}

.router-link-active {
  color: var(--primary) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer {
  margin-top: auto;
  padding: 4rem 0 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .nav-item span {
    display: none;
  }
  .nav-links {
    gap: 0.5rem;
  }
}
</style>
