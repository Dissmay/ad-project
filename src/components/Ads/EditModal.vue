<template>
   <div>
        <v-btn
         color="primary"
         dark
         @click.stop="modal = true"
        >
           Open Dialog
        </v-btn>
        <v-dialog width="900px"  v-model="modal">
            <v-card>
                <v-layout>
                    <v-flex xs12>
                        <v-card-title>
                            <h1> EDIT AD</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout >
                    <v-flex xs12>
                        <v-card-text>
                           <v-text-field
                                label="title"
                                name="title"
                                type="text"
                                v-model="editedTitle"
                            />
                            <v-text-field
                                label="description"
                                name="Description"
                                type="text"
                                v-model="editedDescription"
                            />
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout >
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="" @click="onCancel">
                                Cancel
                            </v-btn>
                            <v-btn class="success" @click="onSave">Save</v-btn>
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
                editedTitle: this.ad.title,
                editedDescription: this.ad.description
            }
        },
         methods:{
             onCancel(){
                 this.editedTitle =this.ad.title
                 this.editedDescription = this.ad.description
                 this.modal= false

             },
             onSave(){
                if(this.editedTitle !== '' && this.editedDescription !== ''){
                    
                    this.$store.dispatch('updateAd',{
                        title: this.editedTitle,
                        description:this.editedDescription,
                        id: this.ad.id
                    })
                    this.modal = false
                }
             }
         }
}
</script>