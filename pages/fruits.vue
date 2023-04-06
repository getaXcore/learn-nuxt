<template>
    <!-- <div> -->
        <!-- <div style="padding-left: 1%;padding-right: 1%;">
            <h1>Fruits here</h1>
            <ul>
                <li v-for="data of fruits">{{ data._uuid }} / {{ data.fruit_name }} / {{ data.size }} / {{ data.taste }}</li>
            </ul>
        </div> -->
        <div>
            <b-col sm="4" class="my-2" style="float: left;">
                <b-form-group
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                >
                    <b-form-select
                        id="per-page-select"
                        v-model="perPage"
                        :options="pageOptions"
                        size="sm"
                    />
                </b-form-group>
            </b-col>
            <b-col lg="5" class="my-2" style="float: right;">
                <b-form-group
                    label="Filter"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                >
                    <b-input-group size="sm">
                        <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                        ></b-form-input>

                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-table striped hover 
                :items="items" 
                :fields="fields" 
                :current-page="currentPage"
                :per-page="perPage" 
                :filter="filter"
            />
            
            <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="center"
            />
        </div>
    <!-- </div> -->
</template>

<script>
import { useStoreFruits } from '../store/otherFruit';
import { storeToRefs } from 'pinia';
export default{
    name: "fruitsPage",
    middleware: 'stateFruits',
    // computed: {
    //     fruits(){
    //         return this.$store.state.fruits.fruits
    //     },
    // },
    setup(){
        const store = useStoreFruits()
        const { fruitById } = storeToRefs(store)
        const fruits = store.allFruits

        return{
            fruitById,
            fruits
        }
    },
    data(){
        var id = "2a41306e-2b4d-4cad-be9c-3df091e3619a"        
        return{
            fields: [
            {
                key: '_uuid',
                label: 'UUID',
                sortable: true,
            },
            {
                key: 'fruit_name',
                label: 'Fruit Name',
                sortable: true
            },
            {
                key: 'size',
                sortable: true
            },
            {
                key: 'taste',
                label: 'Taste',
                sortable: true,
            }
            ],
            // items: this.$store.state.fruits.fruits,
            items: this.fruits,
            // items: [this.fruitById(id)],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
            filter: null,
        }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
}
</script>