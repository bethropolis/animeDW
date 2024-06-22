<script>
  import { Navigate } from "svelte-router-spa";

  export let data = {};
  function downloadAll() {
    console.log("Downloading all episodes");
  }
</script>

<div class="w-full flex">
  <div class="w-1/2 pr-4 pt-4 text-left">
    <div class="w-48 h-64 bg-gray-200 dark:bg-gray-700 mb-4">
      {#if data.cover}
        <img
          src={data.cover}
          alt={data.title}
          class="w-full h-full object-cover"
        />
      {:else}
        <div
          class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300"
        >
          No Image
        </div>
      {/if}
    </div>
    <h1 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
      {data.title || "Title"}
    </h1>
    <p
      class="text-sm text-gray-700 dark:text-gray-400 mb-4 line-clamp-6 overflow-hidden"
    >
      {data.description || "no description"}
    </p>
  </div>
  <div class="w-1/2 pl-4">
    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
      episodes
    </h2>
    <div class="episodes space-y-2 overflow-auto h-[90dvh]">
      {#each data.chapters || [] as chapter}
        <div
          class="flex justify-between items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 p-2 rounded"
        >
          <span class="truncate mr-2 text-gray-900 dark:text-white"
            >{chapter.name}</span
          >

          <div class="icons">
            <Navigate to={`/play/${chapter.url}`}>
              <button
                class="text-purple-500 dark:text-purple-400 flex-shrink-0 mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  ><path fill="currentColor" d="M8 19V5l11 7z" /></svg
                >
              </button></Navigate
            >

            <button class="text-blue-500 dark:text-blue-400 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* make the scrollbar invisible */
  .episodes::-webkit-scrollbar {
    width: 10px;
  }
  .episodes::-webkit-scrollbar-thumb {
    background-color: #6b46c1; /* Purple-dark color */
  }
</style>
