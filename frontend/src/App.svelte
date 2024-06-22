<script>
  // @ts-nocheck

  import { Router } from "svelte-router-spa";
  import Sidebar from "./lib/components/sidebar.svelte";
  import { routes } from "./routes";
  import { onMount } from "svelte";

  export let params = {};

  $: console.log(params);
</script>

<main class="h-screen min-h-[640px] flex dark:bg-gray-800 dark:text-gray-50">
  <Sidebar />
  <Router {routes} {params}/>
</main>

<style>
  :root {
    font-family:
      "Nunito",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
</style>
