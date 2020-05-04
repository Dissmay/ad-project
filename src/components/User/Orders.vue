<template>
    <v-container>
        <v-layout row>
           
            <v-flex xs12 sm6 offset-sm3  v-if="!loading" >
                <v-list
                    subheader
                    two-line
                    flat
                    >
                    <h1 class="text--secondary mb3">Orders</h1>
                        <v-list-item-group
                            multiple
                            v-for="order in orders"
                            :key="order.id"
                        >
                            <v-list-item>
                                <template>
                                    <v-radio-group v-model="order.done">
                                        <v-radio 
                                        @change="markDone(order)"
                                        color="success"
                                        :value="true"
                                        ></v-radio>
                                    </v-radio-group>
                                    <v-list-item-content>
                                        <v-list-item-title>{{order.name}}</v-list-item-title>
                                        <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                                <v-btn class="primary"
                                :to="'/ad/' + order.adId"
                                >Open</v-btn>
                            </v-list-item>       
                        </v-list-item-group>
                    </v-list>
            </v-flex>
            <div v-else>  <v-progress-circular
                    :size="400"
                    :width="7"
                    color="purple"
                    indeterminate
                    ></v-progress-circular></div>
             
        </v-layout>
    </v-container>
</template>

<script>
export default {
 
    methods: {
        markDone(order){
            this.$store.dispatch('markOrderDone', order.id)
            .then(()=>{
                order.done = true

            })

        },
       
    },
    computed: {
         loading(){
            return this.$store.getters.loading
        },
      orders(){
          return this.$store.getters.orders
      } 

    },
      created(){
            this.$store.dispatch('fetchOrders')           

        }
   
}
</script>