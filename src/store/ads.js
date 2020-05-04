import * as fb from 'firebase'
class Ad{
    constructor(title, description, ownerId, promo = false, imgSrc = '',id = null){
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imgSrc = imgSrc
        this.promo = promo
        this.id = id
    }
}
export default {
    state:{
        ads: []
    }, 
    mutations:{
        createAd(state, payload){
            state.ads.push(payload)
        },
        loadAds(state, payload){
            state.ads = payload
        },
        updateAd(state, {title, description, id}){
            const ad = state.ads.find(a =>{
                return a.id === id
            });
            ad.title = title,
            ad.description = description
        }
    },
    actions:{
        async createAd({commit, getters}, payload){
            // payload.id = 'adsadasd',
            commit('clearError')
            commit('setLoading', true)
            const img = payload.img
            try{
                const newAd = new Ad(
                payload.title,
                payload.description, 
                getters.user.id,
                payload.promo
                )
                const ad = await fb.database().ref('ads').push(newAd)
                let imgExt = img.name.slice(img.name.lastIndexOf('.'))
                await fb.storage().ref(`ads/${ad.key}${imgExt}`).put(img);
                
                let imgSrc = await fb.storage().ref(`ads/${ad.key}${imgExt}`).getDownloadURL()
                
                await fb.database().ref('ads').child(ad.key).update({
                    imgSrc,
                    id: ad.key
                })
               
               commit('setLoading', false)
               commit('createAd', {
                    ...newAd,
                    imgSrc,
                    id: ad.key
                   
               });
               

               
            }catch(error){
                commit('setError', error.massage)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchAds({commit}){
            commit('clearError')
            commit('setLoading', true)
            let resultsAds = []
            try{
             const fbVal = await fb.database().ref('ads').once('value')
             const ads = fbVal.val();
             Object.keys(ads).forEach(key=>{
                 const ad = ads[key]
                 resultsAds.push(
                     new Ad(ad.title, ad.description, ad.ownerId, ad.promo,ad.imgSrc ,key)
                 )
             })
             commit('loadAds', resultsAds)             
             commit('setLoading', false)               
            }catch(error){
             commit('setError', error.massage)
             commit('setLoading', false)
             throw error
            }
        },
        async updateAd({commit}, {title, description, id}){
            commit('clearError')
            commit('setLoading', true)

            try{
                await fb.database().ref('ads').child(id).update({
                    title, description
                })
                commit('updateAd',{
                    title, description, id
                })
                commit('setLoading', false)
            }catch(error){

                commit('setError', error)
                commit('setLoading', false)
            }
        }

    },
    getters:{
        ads(state) {
            return state.ads
        },
        promoAds(state){
            return state.ads.filter(ad=> {
                return ad.promo
            })
        },
        myAds(state, getters){
            return state.ads.filter(ad=>{
                if(ad.ownerId === getters.user.id){
                    return ad
                }
            })
        },
        adById(state){
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    },

}