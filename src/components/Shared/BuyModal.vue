<template>
   <div>
        <v-btn
         color="primary"
         dark
         @click.stop="modal = true"
        >
          Buy
        </v-btn>
        <v-dialog width="900px"  v-model="modal">
            <v-card>
                <v-layout>
                    <v-flex xs12>
                        <v-card-title>
                            <h1> Do you want to buy it? </h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout >
                    <v-flex xs12>
                        <v-card-text>
                           <v-text-field
                                label="name"
                                name="Name"
                                type="text"
                                v-model="name"
                            />
                            <v-text-field
                                label="phone"
                                name="phone"
                                type="text"
                                v-model="phone"
                            />
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout >
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="" @click="onCancel"
                            :disabled="localLoading"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                             class="success"
                             @click="onSave" :disabled="localLoading"
                             :loading="localLoading"
                             >Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>

 </div>
       
        
</template>

<script>
export default {
    props:['ad'],
        data(){
            return {
                modal: false,
                name:'',
                phone: '',
                localLoading: false
            }
        },
         methods:{
             onCancel(){
                 this.name = ''
                 this.phone = ""
                 this.modal= false
             },
             onSave(){
                if(this.name !== '' && this.phone !== ''){
                    this.localLoading = true
                    this.$store.dispatch('createOrder',{
                        name: this.name,
                        phone:this.phone,
                        adId: this.ad.id,
                        ownerId: this.ad.ownerId
                    })
                    .finally(()=>{
                        this.name = ''
                        this.phone = ''
                        this.localLoading = false
                        this.modal = false

                    })
                }
             }
         }
}
</script>