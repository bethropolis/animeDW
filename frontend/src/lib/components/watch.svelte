<script>
import { getDetail } from "../helpers/getDetail";
  import WatchContent from "./watchContent.svelte";

  export let currentRoute;

  $: console.log(currentRoute);

  getDetail(currentRoute.path).then((data) => {
    console.log(data);
  });
</script>

{#await getDetail(currentRoute.path)}
  <p>loading data...</p>
{:then data}
   <WatchContent {data}/>
{:catch}
  an error occured
{/await}

<style>
  /* your styles go here */
</style>
