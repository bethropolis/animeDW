import Main from "./lib/components/main.svelte";
import Play from "./lib/components/play.svelte";
import Watch from "./lib/components/watch.svelte";



export const routes = [
    {
        name: '/',
        component: Main
    },
    {
        name: '/watch/:name',
        component: Watch
    },
    {
        name: '/play/:id/:watch/:name/:ep',
        component: Play
    }
];