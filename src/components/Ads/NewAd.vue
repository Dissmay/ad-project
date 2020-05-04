<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3"> Createn new ad</h1>
                  <v-form 
                ref="form"
                validation
                v-model="valid"
                > 
                  <v-text-field
                    label="title"
                    name="title"
                    type="text"
                    v-model="title"
                    :rules="[v => !!v || 'Title is required']" 
                  />

                  <v-textarea
                    rows="5"
                    label="Descritpion"
                    name="Descritpion"
                    type="text"
                    v-model="description"
                    :rules="[v => !!v || 'Descritpion is required']"
                  ></v-textarea>
                  <v-layout row mb-3> 
                    <v-flex xs12>
                       <v-btn
                          color="warning"
                          class="ma-2 white--text"
                          @click="triggerUpload"
                        >
                          Upload
                          <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        <input
                         ref="fileinput"
                         type="file"
                         style="display:none;"
                         accept="image/*"
                         @change="onFileChange"
                        >

                    </v-flex>
                  </v-layout >
                  <v-layout row>
                    <v-flex xs12>
                      <img  height="100" :src="imgSrc" alt="" v-if="imgSrc">
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                       <v-switch
                        v-model="promo"
                        label="Add to promo"
                      ></v-switch>
                    </v-flex>
                  </v-layout>
                   <v-layout row>
                    <v-flex xs12>
                       <v-spacer></v-spacer>
                       <v-btn 
                       :loading="loading"
                      :disabled="!valid || !img|| loading "
                       class="success" @click="createAd"> Create ad</v-btn>
                    </v-flex>
                  </v-layout>

                </v-form>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed:{
      loading(){
        return this.$store.getters.loading
      }
    },
    data (){
        return{
          title:'',
          description:'',
          promo:false,
          valid:false,
          img:null,
          imgSrc:''
        }
    },
    methods:{
      createAd(){
        if(this.$refs.form.validate() && this.img){
            const ad = {  
              title: this.title,
              description: this.description,
              promo: this.promo,
              img: this.img
            }
            this.$store.dispatch('createAd', ad)
            .then(()=>{
               this.$router.push('/')
            })
        }
      },
      triggerUpload(){
        this.$refs.fileinput.click()
      },
      onFileChange(event){
        let file = event.target.files[0]
        let reader = new FileReader();
          reader.onload = () =>{
        this.imgSrc = reader.result;
        
        
      }
      reader.readAsDataURL(file)
      this.img = file
      }
    }
}
</script>