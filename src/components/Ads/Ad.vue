<template>
    <v-content>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 v-if="!loading">
                <v-card
                    sm12
                    
                >
                    <v-img
                    height="300px"
                    :src="ad.imgSrc"
                    >
                    </v-img>
                    <v-card-text class="text--primary">
                    <div>{{ad.title}}</div>

                    <div>{{ad.description}}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                    <addEditAdModal :ad="ad" v-if="isOwner"></addEditAdModal>
                    
                    <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex v-else  xs12 sm6 offset-sm3>  
                <v-progress-circular
                    :size="400"
                    :width="7"
                    color="purple"
                    indeterminate
                    ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
import EditAdModal from './EditModal'
export default {
    props: ['id'],
   computed:{

       ad(){
           const id = this.id;
           return this.$store.getters.adById(id)
       },
       loading(){
           return this.$store.getters.loading
       },
       isOwner () {
            return this.ad.ownerId === this.$store.getters.user.id
       }
     
   },
   components:{
      addEditAdModal: EditAdModal
   }
}
</script>