<script setup>
    import { RouterLink, RouterView, useRouter } from "vue-router";
    import { useUserStore } from "@/stores";
    let userStore = useUserStore();
    userStore.tokenLogin();
</script>

<template>
    <RouterView />
</template>

<style>
    html,
    body,
    #app {
        height: 100%;
    }
</style>
