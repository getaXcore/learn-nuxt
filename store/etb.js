export const state = () => ({
    datas: []
})

export const getters = {
    getDatas(state) {
      return state.datas
    }
}

export const mutations = {
    add(state, items) {
        state.datas = items
    },
}