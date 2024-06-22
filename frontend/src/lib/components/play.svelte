<script>
  import { getVideoList } from "../helpers/getVideoList";

  export let currentRoute;

  console.log(currentRoute);

  let path = currentRoute.name.slice(6, currentRoute.name.length);

  getVideoList(path).then((data) => {
    console.log(data);
  });
</script>


d