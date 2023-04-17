<template>
  <div style="padding-left: 1%;padding-right: 1%;">
    <div class="content-wrapper">
      <div class="title">
        <h2>Now Playing Movies</h2>
      </div>
      <div class="content">
        <b-container>
          <b-row>
            <b-col>
              <b-row class="my-3">
                <b-col><b-form-input v-model="namesOfMovie" placeholder="Find your favorite movies name" @keyup.enter="findMovies()"></b-form-input></b-col>
              </b-row>
              <!-- <b-row>
                <b-col style="margin-left: 50%;">
                  <b-form-datepicker v-model="dateTo" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="en" placeholder="showing date from"></b-form-datepicker>
                </b-col>
              </b-row> -->
              <!-- <b-row>
                <b-col style="margin-left: 50%;">
                  <b-form-datepicker v-model="dateFrom" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="en" placeholder="showing date to"></b-form-datepicker>
                </b-col>
              </b-row> -->
              <b-row class="my-3">
                <b-col><b-button pill block variant="info" @click="findMovies()">Search</b-button></b-col>
              </b-row>
            </b-col>            
            <b-col cols="8">
              <b-card-group v-for="data of results" v-bind:key="data.id">
                <b-card no-body class="overflow-hidden my-1">
                  <b-row no-gutters>
                    <b-col md="6">
                      <b-card-img v-if="data.poster_path !== null" :src="baseUrlImg+data.poster_path" :title="data.title" class="rounded-0"></b-card-img>
                      <b-card-img v-else src="~/assets/no-image.jpg" :title="data.title" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                      <b-card-body :title="data.original_title">
                        
                        <div class="text-right">
                            <b-badge variant="secondary">{{ formatDate(data.release_date) }}</b-badge>
                            <b-badge variant="success">{{ data.vote_average }}</b-badge><br>
                            <b-badge variant="primary">{{ stringGenres(data.genre_ids) }}</b-badge>
                          </div>
                        <b-card-text>
                          {{ data.overview }}
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
                <!-- <b-card
                  :title="data.original_title"
                  :img-src="baseUrlImg+data.poster_path"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 25rem;"
                  class="mb-2"
                >
                  <b-card-text>
                    {{ data.overview }}
                  </b-card-text>

                  <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card> -->
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
import { ref } from 'vue';
import { API_KEY_THEMOVIE, BASE_URL_IMG_THEMOVIE, BASE_URL_LIST_THEMOVIE, BASE_URL_SEARCH_THEMOVIE } from '../config/urls'
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
        // dateFrom: ''
      }
    },
    methods: {
      getInitialMovies(){
        let url
        if(this.namesOfMovie){
          url = `${BASE_URL_SEARCH_THEMOVIE}?query=${this.namesOfMovie}&page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }else{
          url = `${BASE_URL_LIST_THEMOVIE}now_playing?page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
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
          }).catch((error) => {
            console.log(error)
        }); 
      },
      getLoadMoreMovies(){
        const newPage = this.currentPage + 1
        let url
        if(this.namesOfMovie){
          url = `${BASE_URL_SEARCH_THEMOVIE}?query=${this.namesOfMovie}&page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }else{
          url = `${BASE_URL_LIST_THEMOVIE}now_playing?page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
        }

        if(newPage <= this.total_pages){
          this.$axios.$get(`${BASE_URL_LIST_THEMOVIE}now_playing?page=${newPage}&api_key=${API_KEY_THEMOVIE}`)
              .then((res) => {
                this.currentPage = res.page
                res.results.forEach((item, index) => {
                  this.results.push(res.results[index])
                });
              }).catch((error) => {
                console.log(error)
          });
        }else{
          this.isShow = false
        }
        
      },
      getNextMovies(){
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            const newPage = this.currentPage + 1
            let url
            if(this.namesOfMovie){
              url = `${BASE_URL_SEARCH_THEMOVIE}?query=${this.namesOfMovie}&page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
            }else{
              url = `${BASE_URL_LIST_THEMOVIE}now_playing?page=${this.currentPage}&api_key=${API_KEY_THEMOVIE}`
            }
            if(newPage <= this.total_pages){
              this.$axios.$get(url)
                .then((res) => {
                  this.currentPage = res.page
                  res.results.forEach((item, index) => {
                    this.results.push(res.results[index])
                  });
                }).catch((error) => {
                  console.log(error)
              });
            }else{
              this.isShow = false
            }
          }
        }
      },
      formatDate(dateString) {
        let convertedDate = new Date(dateString);
        return convertedDate.toDateString()
      },
      getGenresOri(){
        this.$axios.$get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_THEMOVIE}`)
          .then((res) => {
            this.genresOri = res.genres
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
        this.getInitialMovies()
      },
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