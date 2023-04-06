<template>
    <div style="padding-left: 1%;padding-right: 1%;">
        <h1>Nuext Counter</h1>
        <b-button @click='decrement' variant="danger" size="sm">
            <b-icon icon="caret-left" aria-hidden="true"></b-icon>
        </b-button>
        {{counter}}
        <b-button @click='increment' variant="success" size="sm">
            <b-icon icon="caret-right" aria-hidden="true"></b-icon>
        </b-button>
    </div>
</template>

<script>
import { mapMutations} from 'vuex';

export default {
    name: "AboutComponent",
    computed:{
        counter(){
            return this.$store.state.count.counter
        }
    },
    methods:{
        ...mapMutations({
            increment: 'count/increment',
            decrement: 'count/decrement'
        })
    }
}
</script>