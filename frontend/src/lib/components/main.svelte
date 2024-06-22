<script>
  import Content from "./content.svelte";
import MainNav from "./mainNav.svelte";
  import { getPopular } from "../helpers/getPopular";

</script>
<div class="flex-1 flex flex-col dark:text-white">
    <!-- Top nav -->
     <MainNav />
    <!-- Main content area -->
    <div class="p-4 flex-1">
      {#await getPopular()}
         <p>fetching the data...</p>
      {:then data} 
        <Content popular={data.list} />
      {:catch}
          <p>failed to fetch data</p>
      {/await}
    </div>
</div>