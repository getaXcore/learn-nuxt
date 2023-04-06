import { useStoreFruits } from "../store/otherFruit"

export default async function({ store, redirect, $axios, $config: { apiKeyFruit, baseUrlFruit, getFruit}, $pinia}){
    try {
        const useStore = useStoreFruits($pinia)
        $axios.onError((err) => {
            console.log(err.message)
            // return redirect('/')
        })
        $axios.setHeader('Access-Control-Allow-Credentials','*')
        $axios.setHeader('Content-Type', 'application/json')
        $axios.setHeader('Accept','application/json')
        $axios.setToken(apiKeyFruit,'Bearer')
        $axios.setBaseURL(baseUrlFruit)
        const fruits = await $axios.$get(getFruit)
        fruits.items.forEach(e => {
            // store.commit({
            //     type: 'fruits/addOne',
            //     _uuid: e._uuid,
            //     fruit_name: e.fruit_name,
            //     size: e.size,
            //     taste: e.taste
            // })
            useStore.$patch((state) => {
                state.fruits.push({
                    _uuid: e._uuid,
                    fruit_name: e.fruit_name,
                    size: e.size,
                    taste: e.taste
                })
            })
        });
        
    } catch (error) {
        console.log(error.message)
    }
    
}