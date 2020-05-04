<template>
    <v-container>
        <v-layout row  >
            <v-card
                class="mx-auto mb-3"
                sm6
                outlined
               
                elevation="10" 
                v-for="ad in myAds"
                :key="ad.id"

            >
                <v-list-item three-line>
                <v-list-item-content>
                    <img :src="ad.imgSrc" 
                    height="175px"  alt="">
                    <v-list-item-subtitle>{{ad.title}}</v-list-item-subtitle>
                    <p>{{ad.description}}</p>
                </v-list-item-content>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" :to="/ad/ + ad.id">Open</v-btn>
                </v-card-actions>
                </v-list-item>

               
            </v-card>
           
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed:{
        myAds(){
            return this.$store.getters.myAds
        }
    }
}
</script>