<template>
    <div style="padding-left: 1%;padding-right: 1%;">
        <div>
            <p v-if="$fetchState.pending">Fetching mountains...</p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>
            <div v-else>
                <h1>Nuxt Mountains</h1>
                <ul>
                    <li v-for="data of etb">{{ data.title }}</li>
                </ul>
                <b-button @click="$fetch" variant="primary">Refresh</b-button>
                <!-- <button @click="refresh()">Refresh</button> -->
            </div>
        </div>
    </div>
</template>

<script>
// import {  mapGetters  } from 'vuex'
export default{
    name: "apiComponent",
    data(){
        return{
            mountains: [],
            etbs:{},
        }
    },
    async fetch() {
        // this.mountains = await fetch('https://api.nuxtjs.dev/mountains').then(res => res.json())
        // this.mountains = await this.$http.$get('https://api.nuxtjs.dev/mountains')
        this.mountains = await this.$axios.$get('https://api.nuxtjs.dev/mountains')
        // this.etbs = await this.$http.post(
        //     'http://127.0.0.1:30340/v1/middleware/parameter/etb',
        //     { id:'' },
        //     {  baseUrl: process.env.BASE_URL_ETB,  prefixUrl: process.env.ETB_GET }
        // )

        this.$store.commit('etb/add',this.mountains)
    },
    computed: {
        etb(){
            return this.$store.state.etb.datas
        },
    },
    // methods: {
    //     ...mapGetters({
    //         refresh:'etb/getDatas'
    //     })
    // }
    // actions: {
    //     async getEtb(){
    //         const res = await this.$http.post(
    //             'http://127.0.0.1:30340/v1/middleware/parameter/etb',
    //             { id:'' },
    //             {  baseUrl: process.env.BASE_URL_ETB,  prefixUrl: process.env.ETB_GET }
    //         )
    //         this.$store.commit('etb/add',res)
    //     }
    // },
    // async asyncData({$http}) {
    //     try {
    //         const res = await $http.post('http://127.0.0.1:30340/v1/middleware/parameter/etb',{id:''})
    //         this.data = res.json()
            
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // }
    
}
</script>
