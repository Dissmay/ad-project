import * as fb from 'firebase';
class User {
    constructor(id){
        this.id = id
    }
}
export default {
    state:{
        user: null
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        },
        clearUser(state, payload){
            state.user = payload  
        }
    },
    actions:{
        async registerUser({commit}, {email, password}){
            commit('clearError');
            commit('setLoading', true);
           try{
           let user = await fb.auth().createUserWithEmailAndPassword(email, password)
            commit('setUser',new User(user.user.uid))
            commit('setLoading', false)
           }catch(error){
                commit('setLoading', true);
                commit('setError', error.massage)
                throw error
           }
        },
        async loginUser({commit}, {email, password}){
            commit('clearError');
            commit('setLoading', false);
           try{
           let user = await fb.auth().signInWithEmailAndPassword(email, password)
            commit('setUser',new User(user.user.uid))
            commit('setLoading', false)
           }catch(error){
                commit('setLoading', false);
                commit('setError', error.message)
                throw error
           }
        },
        autoLoginUser({commit}, payload){
            commit('setUser', new User(payload.uid))
        },
        clearUser({commit}){
            fb.auth().signOut();
            commit('clearUser', null)
        }
    },
    getters:{
        user(state){
            return state.user
        },
        isUserLoggetIn(state){
            return state.user !== (null)
        }
    }
}