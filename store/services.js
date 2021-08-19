export const state = () => ({
    services: [],
    service: null,
    status: "",
    message: "",
    error: false
});

export const mutations = {
    SERVICE_REQUEST(state) {
        state.status = "...loading",
            state.message = "";
        state.error = false
    },
    SERVICES_SUCCESS(state, services) {
        state.services = services;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    SERVICE_FAILURE(state, error) {
        state.status = "";
        state.message = "Muvaffaqiyatsiz yakunlandi!!!"
        state.error = true;

    },
    DISABLE_ERROR(state) {
        state.error = false;
        state.message = "";
    },

    SERVICE_SUCCESS(state, service) {
        state.service = service;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    CLEAR_ONE_ORDER(state) {
        state.service = null;
    }
};

export const actions = {

    GET_ONE({ commit }, id) {
        commit('SERVICE_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/service/one/${id}`)
                .then(res => {
                    commit('SERVICE_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('SERVICE_FAILURE');
                    reject(false);
                })
        })
    },

    GET_ALL({ commit }) {
        commit('SERVICE_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get('/service/all')
                .then(res => {
                    commit('SERVICES_SUCCESS', res.data);
                    resolve(true)
                })
                .catch(err => {
                    commit('SERVICE_FAILURE');
                    reject(false);
                })
        })
    },

    CREATE_ONE({ commit, dispatch }, data) {
        commit('SERVICE_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$post('/service/add', data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('SERVICE_FAILURE');
                    reject(false);
                });
        });
    },

    UPDATE_ONE({ commit, dispatch }, data) {
        commit('SERVICE_REQUEST');
        console.log(data, "update uchun");
        return new Promise((resolve, reject) => {
            this.$axios.$put(`/service/update/${data._id}`, data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    // console.log(err);
                    commit('SERVICE_FAILURE');
                    reject(false);
                });
        });
    },

    DELETE_ONE({ commit, dispatch }, id) {
        commit('SERVICE_REQUEST');
        console.log(id, 'mening idim');
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/service/delete/${id}`)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true);
                })
                .catch(err => {
                    commit('SERVICE_FAILURE');
                    reject(false);
                });
        });
    }

}
