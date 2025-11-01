<template>
  <div id="app" class="font-sans antialiased text-gray-700 bg-blue-100">
    <div class="flex flex-col min-h-screen justify-between">
      <header class="bg-indigo-700 text-white py-5 shadow-md">
        <div class="max-w-6xl mx-auto px-5">
          <h1 class="text-3xl font-semibold mb-1">Реестр НСИ</h1>
        </div>
      </header>

      <main class="max-w-6xl mx-auto px-5 py-5 w-full">
        <router-view />
      </main>

      <footer class="bg-indigo-700 border-t border-gray-200 py-4 mt-auto">
        <div class="max-w-6xl mx-auto px-5 text-gray-600">
          <p class="text-md text-white ml-4">&copy; 2025</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>