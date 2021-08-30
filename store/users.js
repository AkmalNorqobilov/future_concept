export const state = () => ({
    users: [],
    user: null,
    status: "",
    message: "",
    error: false
});

export const mutations = {
    USER_REQUEST(state) {
        state.status = "...loading",
            state.message = "";
        state.error = false
    },
    USERS_SUCCESS(state, users) {
        state.users = users;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    USER_FAILURE(state, error) {
        state.status = "";
        state.message = "Muvaffaqiyatsiz yakunlandi!!!"
        state.error = true;

    },
    DISABLE_ERROR(state) {
        state.error = false;
        state.message = "";
    },

    USER_SUCCESS(state, user) {
        state.user = user;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    CLEAR_ONE_ORDER(state) {
        state.user = null;
    }
};

export const actions = {

    GET_ONE({ commit }, id) {
        commit('USER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/user/one/${id}`)
                .then(res => {
                    commit('USER_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('USER_FAILURE');
                    reject(false);
                })
        })
    },

    GET_ALL({ commit }) {
        commit('USER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get('/user/all')
                .then(res => {
                    commit('USERS_SUCCESS', res.data);
                    resolve(true)
                })
                .catch(err => {
                    commit('USER_FAILURE');
                    reject(false);
                })
        })
    },

    CREATE_ONE({ commit, dispatch }, data) {
        commit('USER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$post('/user/signup', data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('USER_FAILURE');
                    reject(false);
                });
        });
    },

    UPDATE_ONE({ commit, dispatch }, data) {
        commit('USER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$put(`/user/update/${data._id}`, data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    // console.log(err);
                    commit('USER_FAILURE');
                    reject(false);
                });
        });
    },

    DELETE_ONE({ commit, dispatch }, id) {
        commit('USER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/user/delete/${id}`)
                .then(res => {
                    dispatch('GET_ALL', res.data);
                    resolve(true);
                })
                .catch(err => {
                    commit('USER_FAILURE');
                    reject(false);
                });
        });
    }

}
