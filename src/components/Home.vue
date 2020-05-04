<template>
   <div v-if="!loading">
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                    v-for="ad of promoAds"
                    :key="ad.id"
                    :src="ad.imgSrc"
                    >
                    <div class="car-link">
                        <v-btn class="error carBtn" :to="'/ad/' + ad.id"> {{ad.title}}</v-btn>
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex 
             xs12
             sm6
             md4
             v-for="ad of ads"
             :key="ad.id"
            >
                <v-card
                >
                <v-img
                class="white--text align-end"
                height="200px"
                :src="ad.imgSrc"
                >
                </v-img>


                <v-card-text class="text--primary">
                <div>{{ad.description}}</div>

                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn :to="'/ad/' + ad.id">
                    Open</v-btn>

                   <app-buy-modal :ad="ad"></app-buy-modal>
                </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
   </div>
   <div v-else>
       <v-container>
           <v-layout row>
               <v-flex xs12  class="d-flex justify-center">
                <v-progress-circular
                    :size="400"
                    :width="7"
                    color="purple"
                    indeterminate
                    ></v-progress-circular>
               </v-flex>
           </v-layout>
       </v-container>
   </div>
</template>

<script>
export default {
    
    computed: {
        promoAds() {
            return this.$store.getters.promoAds
        },
         ads() {
            return this.$store.getters.ads
        },
        loading(){
            return this.$store.getters.loading
        }
    },
   
}
</script>

<style scoped>
 .car-link{
    position: absolute;
    bottom: 50px;
    left: 50%;
    background:rgba(0, 0, 0, 0.3);
    transform: translate(-50%, 0 );
    padding: 10px 20px;
    border-radius: 5px;  
    }
    .carBtn{
        width: 300px;
    }
</style>