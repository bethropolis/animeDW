<script>
    import { Navigate } from "svelte-router-spa";
  
    export let popular = [];
  </script>
  
  <div class="content grid gap-4 overflow-y-scroll">
      {#each popular as item, index}
      <Navigate to={item.link}>
          <div class="card w-32 h-64" key={index}>
              <img src={item.imageUrl} alt={`Card ${index+1}`} class="w-full h-48" loading="lazy"/>
              <div class="card-title text-sm">{item.name}</div>
          </div>
      </Navigate>
      {/each}
  </div>
  
  <style>
      .content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          /* Set height to 80vh (80% of viewport height) */
          height: 80vh;
          /* Ensure overflow is scrollable */
          overflow-y: auto;
      }
  
      /* make the scrollbar invisible */
      .content::-webkit-scrollbar {
          width: 0;
      }
  </style>
  