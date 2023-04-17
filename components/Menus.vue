<template>
    <main>
        <b-nav align="center" style="background-color: rgba(0, 0, 0, 0.03);padding-top: 1%;padding-bottom: 1%;">
            <b-nav-item><NuxtLink to="/">Listing</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/counter">Counter</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/api">API Fetch</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/fruits">Fruits Store</NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/users">Paging Users Api </NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/movies">Movies</NuxtLink></b-nav-item>
        </b-nav>
    </main>    
</template>

<script>
export default {
  name: 'MenusComponent'
}
</script>