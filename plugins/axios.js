export default function ({ $axios, redirect, store }) {
    $axios.onError(error => {
    //   if (error.response.status === 500) {
    //     redirect('/sorry')
        console.log(error.message)
    //   }
    })
    
  }