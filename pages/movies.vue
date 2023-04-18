<template>
  <div style="padding-left: 1%;padding-right: 1%;">
    <div class="content-wrapper">
      <div class="title">
        <h2>Now Playing Movies</h2>
      </div>
      <div class="content">
        <b-container>
          <b-row>
            <b-col cols="5">
              <b-row class="my-3">
                <b-col><b-form-input v-model="namesOfMovie" placeholder="Find your favorite movies name" @keyup.enter="findMovies()"></b-form-input></b-col>
              </b-row>
              <b-row class="my-3">
                <b-col><b-form-select v-model="selected" :options="options"></b-form-select></b-col>
              </b-row>
              <b-row class="my-3">
                <b-col><b-button pill block variant="info" @click="findMovies()">Search</b-button></b-col>
              </b-row>
            </b-col>            
            <b-col cols="7">
              <b-card-group v-for="data of results" v-bind:key="data.id">
                <b-card no-body class="overflow-hidden my-1" style="max-width: 640px;">
                  <b-row no-gutters>
                    <b-col md="6">
                      <b-card-img v-if="data.poster_path !== null" :src="baseUrlImg+data.poster_path" :title="data.title" class="rounded-0"></b-card-img>
                      <b-card-img v-else src="~/assets/no-image.jpg" :title="data.title" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                      <b-card-body :title="data.original_title">
                        <div class="text-right">
                            <b-badge variant="warning">Release : {{ formatDate(data.release_date) }}</b-badge>
                            <b-badge variant="success">Vote Average : {{ data.vote_average }}</b-badge><br>
                            <b-badge variant="primary">{{ stringGenres(data.genre_ids) }}</b-badge>
                          </div>
                        <b-card-text>
                          {{ data.overview }}
                        </b-card-text>
                        <!-- Modal Button -->
                        <b-button v-b-modal=(data.id).toString() variant="outline-success" @click="openReviews(data.id)">See reviews</b-button>
                        <!-- End Modal Button -->
                        <!-- Reviews Modal -->
                        <b-modal :id="(data.id).toString()" scrollable hide-footer>
                          <template #modal-title>
                            <b-img style="width: 5%;height: 5%;" v-if="data.poster_path !== null" :src="baseUrlImg+data.poster_path"></b-img>
                            {{ data.title }}
                          </template>
                          <p class="my-1" v-if="reviews.length === 0">
                            No reviews yet
                          </p>
                          <p class="my-1" v-else v-for="res of reviews" v-bind:key="res.id">
                            <b-list-group>
                              <b-list-group-item variant="info">
                                <b-avatar variant="info" v-if="res.author_details.avatar_path !== null && (res.author_details.avatar_path).charAt(1) === 'h'" :src="(res.author_details.avatar_path).substring(1)" class="mr-3"></b-avatar>
                                <b-avatar variant="info" v-else-if="res.author_details.avatar_path !== null && (res.author_details.avatar_path).charAt(1) !== 'h'" :src="baseUrlImg+res.author_details.avatar_path" class="mr-3"></b-avatar>
                                <b-avatar variant="info" v-else class="mr-3"></b-avatar>
                                <span class="mr-auto">{{ res.author }}</span>
                              </b-list-group-item>
                              <b-list-group-item>
                                <b-badge variant="success"> Rating : {{ res.author_details.rating?res.author_details.rating:0 }}/10</b-badge>
                                <b-badge variant="warning">{{ formatDate(res.created_at) }}</b-badge>
                                <b-badge variant="light"><b-link target="_blank" :href="res.url" class="card-link"><b-icon icon="box-arrow-up-right"></b-icon></b-link></b-badge>
                              </b-list-group-item>
                              <b-list-group-item>
                                {{ res.content }}
                              </b-list-group-item>
                            </b-list-group>  
                          </p>
                          <template #modal-footer="{ close }">
                            <b-button size="sm" variant="outline-danger" @click="close()">close</b-button>
                          </template>
                        </b-modal>
                        <!-- End Reviews Modal -->
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </b-card-group>
              <b-button block variant="primary" @click="getLoadMoreMovies()" v-show="isShow">Load more...</b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import { API_KEY_THEMOVIE, BASE_URL_IMG_THEMOVIE, URL_LIST_THEMOVIE, URL_SEARCH_THEMOVIE, URL_GENRE_THEMOVIE, BASE_URL_THEMOVIE, URL_DISCOVER_THEMOVIE, URL_REVIEWS_THEMOVIE } from '../config/urls'
export default{
    name: "moviesPage",
    data() {
      return {
        results:[],
        // dates:'',
        // page:'',
        total_pages:'',
        total_rows:'',
        currentPage: 1,
        perPage: 20,
        isShow: true,
        baseUrlImg: BASE_URL_IMG_THEMOVIE,
        genresOri:[],
        genreIds:[],
        namesOfMovie: '',
        // dateTo: '',
        // dateFrom: '',
        options: [{ value: null, text: 'Select one genre you like' },],
        selected: null,
        reviews: [],
        pageReviews: 1
      }
    },
    methods: {
      getInitialMovies(){
        let url
        if(this.namesOfMovie){
          url = `${BASE_URL_THEMOVIE}${URL_SEARCH_THEMOVIE}?query=${this.namesOfMovie}&page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }else if(this.selected){
          url = `${BASE_URL_THEMOVIE}${URL_DISCOVER_THEMOVIE}?page=${this.currentPage}&with_genres=${this.selected}&api_key=${API_KEY_THEMOVIE}`
        }else{
          url = `${BASE_URL_THEMOVIE}${URL_LIST_THEMOVIE}now_playing?page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }
        this.$axios.$get(url)
          .then((res) => {
            this.perPage = res.results.length
            this.results = res.results
            // this.dates = res.dates
            // this.page = res.page
            this.total_pages = res.total_pages
            this.total_rows = res.total_results
            this.currentPage = res.page
            this.genreIds = res.genre_ids
            this.currentPage = parseInt(res.page) + 1
          }).catch((error) => {
            console.log(error)
        }); 
      },
      getLoadMoreMovies(){
        let url
        if(this.namesOfMovie){
          url = `${BASE_URL_THEMOVIE}${URL_SEARCH_THEMOVIE}?query=${this.namesOfMovie}&page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }else if(this.selected){
          url = `${BASE_URL_THEMOVIE}${URL_DISCOVER_THEMOVIE}?page=${this.currentPage}&with_genres=${this.selected}&api_key=${API_KEY_THEMOVIE}`
        }else{
          url = `${BASE_URL_THEMOVIE}${URL_LIST_THEMOVIE}now_playing?page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }

        if(this.currentPage > this.total_pages){
          this.isShow = false
        }else{              
          this.$axios.$get(url)
            .then((res) => {
              this.currentPage = parseInt(res.page) + 1
              res.results.forEach((item, index) => {
                this.results.push(res.results[index])
              });
            }).catch((error) => {
              console.log(error)
          });
        }
        
      },
      getNextMovies(){
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            let url
            if(this.namesOfMovie){
              url = `${BASE_URL_THEMOVIE}${URL_SEARCH_THEMOVIE}?query=${this.namesOfMovie}&page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
            }else if(this.selected){
              url = `${BASE_URL_THEMOVIE}${URL_DISCOVER_THEMOVIE}?page=${this.currentPage}&with_genres=${this.selected}&api_key=${API_KEY_THEMOVIE}`
            }else{
              url = `${BASE_URL_THEMOVIE}${URL_LIST_THEMOVIE}now_playing?page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
            }
            if(this.currentPage > this.total_pages){
              this.isShow = false
            }else{              
              this.$axios.$get(url)
                .then((res) => {
                  this.currentPage = parseInt(res.page) + 1
                  res.results.forEach((item, index) => {
                    this.results.push(res.results[index])
                  });
                }).catch((error) => {
                  console.log(error)
              });
            }
          }
        }
      },
      formatDate(dateString) {
        let convertedDate = new Date(dateString);
        return convertedDate.toDateString()
      },
      getGenresOri(){
        this.$axios.$get(`${BASE_URL_THEMOVIE}${URL_GENRE_THEMOVIE}?api_key=${API_KEY_THEMOVIE}`)
          .then((res) => {
            this.genresOri = res.genres
            this.genresOri.forEach(element => {
              this.options.push(
                {value: element.id, text: element.name}
              )
            });
          }).catch((error) => {
            console.log(error)
        });
      },
      stringGenres(ids){
        let names = ""
        this.genresOri.map((value,index) => {
          ids.filter((val) => {
            if(val === value.id){
              names += value.name+" "
            }
          })
        })
        return names
      },
      findMovies(){
        this.currentPage = 1
        this.getInitialMovies()
      },
      openReviews(movieId){
        this.$axios.$get(`${BASE_URL_THEMOVIE}${URL_LIST_THEMOVIE}${movieId}${URL_REVIEWS_THEMOVIE}?page=${this.pageReviews}&api_key=${API_KEY_THEMOVIE}`)
          .then((res) => {
            this.reviews = res.results
          }).catch((error) => {
            console.log(error)
        });
      }
    },
    beforeMount(){
      this.getInitialMovies()
      this.getGenresOri()
    },
    mounted(){
      this.getNextMovies()
    }
}
</script>