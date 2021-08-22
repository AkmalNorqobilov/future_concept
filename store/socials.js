export const state = () => ({
    socials: [],
    social: null,
    status: "",
    message: "",
    error: false
});

export const mutations = {
    SOCIAL_REQUEST(state) {
        state.status = "...loading",
            state.message = "";
        state.error = false
    },
    SOCIALS_SUCCESS(state, socials) {
        state.socials = socials;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    SOCIAL_FAILURE(state, error) {
        state.status = "";
        state.message = "Muvaffaqiyatsiz yakunlandi!!!"
        state.error = true;

    },
    DISABLE_ERROR(state) {
        state.error = false;
        state.message = "";
    },

    SOCIAL_SUCCESS(state, social) {
        state.social = social;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    CLEAR_ONE_ORDER(state) {
        state.social = null;
    }
};

export const actions = {

    GET_ONE({ commit }, id) {
        commit('SOCIAL_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/social/one/${id}`)
                .then(res => {
                    commit('SOCIAL_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('SOCIAL_FAILURE');
                    reject(false);
                })
        })
    },

    GET_ALL({ commit }) {
        commit('SOCIAL_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get('/social/all')
                .then(res => {
                    console.log(res.data);
                    commit('SOCIALS_SUCCESS', res.data);
                    resolve(true)
                })
                .catch(err => {
                    console.log(err, "xato ketdi");
                    commit('SOCIAL_FAILURE');
                    reject(false);
                })
        })
    },

    CREATE_ONE({ commit, dispatch }, data) {
        console.log(data);
        commit('SOCIAL_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$post('/social/add', data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('SOCIAL_FAILURE');
                    reject(false);
                });
        });
    },

    UPDATE_ONE({ commit, dispatch }, data) {
        commit('SOCIAL_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$put(`/social/update/${data._id}`, data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    // console.log(err);
                    commit('SOCIAL_FAILURE');
                    reject(false);
                });
        });
    },

    DELETE_ONE({ commit, dispatch }, id) {
        commit('SOCIAL_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/social/delete/${id}`)
                .then(res => {
                    dispatch('GET_ALL', res.data);
                    resolve(true);
                })
                .catch(err => {
                    commit('SOCIAL_FAILURE');
                    reject(false);
                });
        });
    }

}
