<template>
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
        <b-table small responsive striped hover show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0" :filter="filter">
            <!-- <template #cell(index)="data">
                {{ data.index + 1 }}
            </template> -->
        </b-table>
        <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage" align="center"></b-pagination>
    </div>
</template>

<script>
import { useStoreUsers } from '../store/users'
import { storeToRefs } from 'pinia'
export default{
    name: "usersPage",
    mounted(){
        this.fetchData().catch(err => {
            console.log(err)
        })
    },
    setup(){
        const store = useStoreUsers()
        const {usersData} = storeToRefs(store)
        // const usersData = computed(()=>store.usersData)

        return{
            store,
            usersData,
        }
    },
    methods: {
        async fetchData(){
            await this.usersData(this.currentPage,this.perPage,"2022-04-08","2022-12-02") //fetching
            const data = this.store.users //get response body
            this.totalItems = data.totalItems
            this.items = data.content
            this.currentPage = data.currentPage
            
            return data
        },
    },
    watch: {
        currentPage: {
            handler: function(value) {
                this.fetchData().catch(error => {
                    console.error(error)
                })
            }
        }
    },
    data(){     
        return{
            fields: [
            // 'index',
            {
                key: 'rowid',
                label: 'Rowid',
                sortable: true,
            },
            {
                key: 'nomor_kartu',
                label: 'Nomor Kartu',
                sortable: true
            },
            {
                key: 'no_hp',
                label: 'No.HP',
                sortable: true
            },
            {
                key: 'email_addr',
                label: 'Email',
                sortable: true,
            },
            {
                key: 'model',
                label: 'Model',
                sortable: true
            },
            {
                key: 'user_reg_datetime',
                label: 'Registration Date',
                sortable: true
            },
            {
                key: 'referral_code',
                label: 'Referal Code',
                sortable: true
            },
            {
                key: 'mb_tm_referral_code.gcn',
                label: 'GCN',
                sortable: true,
            },
            ],
            items: [],
            totalItems: 0,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 25, 50, 100],
            filter: null,
        }
    },
}
</script>