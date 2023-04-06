import { defineStore } from "pinia";
import { axiosUserService } from "../services/userService";
import { GET_USERS_REPORTING } from "../config/urls";
export const useStoreUsers = defineStore('users',{
    state: () => ({
        users: null
    }), 
    actions: {
        async usersData(currentPage, perPage, date_start, date_end) {
            try {     
                await axiosUserService({
                    url: `${GET_USERS_REPORTING}`,
                    data: {
                        "date_start": date_start,
                        "date_end": date_end,
                    },                    
                    params:{
                        "page":currentPage,
                        "size":perPage
                    }
                }).then((res) => {
                    if(res.status === 200){                        
                        if(res.data.status === 200 && res.data.datas !== null){
                            this.users = res.data.datas
                        }else{
                            console.log('status: '+res.data.status+', message: '+res.data.message)
                        }  
                    }else{
                        console.log('status: '+res.status+', message: '+res.statusText)
                    } 
                }).catch((error) => {
                    console.log(error)
                });                
            } catch (error) {
                console.log(error)
            }
        },
    },
})