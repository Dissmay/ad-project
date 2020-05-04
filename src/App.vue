<template>
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app temporary v-model="drawer">  
    <v-list>
      <v-list-item
      v-for="link of links"
      :key='link.title'
      :to="link.url"
      >
        <v-list-item-icon>
          <v-icon >{{link.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="link.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list> 
  </v-navigation-drawer>
  <v-app-bar app color="pink">
    <v-app-bar-nav-icon
    @click="drawer = !drawer"
    class="hidden-md-and-up"
    >
    </v-app-bar-nav-icon>
    <v-toolbar-title> 
      <router-link to="/" tag="span" class="pointer">Add</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn color="pink" dark
        v-for="link in links"
        :key="link.title"
        :to="link.url"
        >
          <v-icon dark left>{{link.icon}}</v-icon>
          <span>{{link.title}}</span>
          
        </v-btn>
        <v-btn v-if="isUserLoggetIn" @click="logout">Logout</v-btn>
      </v-toolbar-items>
      
  </v-app-bar>
 <v-content>
   <router-view></router-view>
 </v-content>
  <template v-if="error">
     <v-snackbar
      :bottom="true"
      :multi-line="true"
      :timeout="5000"
      color="error"
      @input="closeError"
      value="true"
    >
      {{error}}
      <v-btn
        dark
        text
        @click.native="closeError"
      >
        Close
      </v-btn>
    </v-snackbar>
  </template>
  
</v-app>

</template>
<script>
// import Home from './components/Home.vue';
export default {
  name: 'App',
 
   data (){
     return{
       drawer: false
     }
   },
    created(){
      if(this.$route.query['loginError']){
        this.$store.dispatch('setError', 'Please log in to  access this page.')
      }
    },
   computed:{
     error(){
       return this.$store.getters.error
     },
     isUserLoggetIn(){
       return this.$store.getters.isUserLoggetIn;
     },
     links(){
       if(this.isUserLoggetIn){
          return [
              {title:'Orders', icon:'bookmark_border', url:'/orders'},
              {title:'New ad', icon:'note_add', url:'/new'},
              {title:'My ads', icon:'list', url:'/list'},
          ]
       }
       return [
          {title:'Login', icon:'lock', url:'/login'},
          {title:'Registration', icon:'face', url:'/registration'},  
       ]
     }
   },
   methods: {
     closeError(){
       this.$store.dispatch('clearError')
     },
     logout(){
       this.$store.dispatch('clearUser')
       this.$router.push('/')
     },
    
   }
};
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }
 

</style>