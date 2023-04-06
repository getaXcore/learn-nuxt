import { defineStore } from "pinia";

export const useStoreFruits = defineStore('otherFruit',{
    state: () => {
        return{
            fruits: []
        }
    },
    getters:{
        allFruits: (state) => state.fruits,
        fruitById: (state) => {
            return (id) => state.fruits.find((fruit) => fruit._uuid === id)
        },
    }
})