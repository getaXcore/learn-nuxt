export const state = () => ({
    fruits: []
})
export const mutations = {
    addOne(state, payload) {
        state.fruits.push({
            "_uuid" : payload._uuid,
            "fruit_name" : payload.fruit_name,
            "size" : payload.size,
            "taste" : payload.taste
        })
    },
    addAll(state, items){
        state.fruits = items
    }
}
export const getters = {
    fruitById(state, id){
        return state.list.find(fruit => fruit._uuid === id)
    }
}