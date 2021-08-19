export const state = () => ({
    orders: [],
    order: null,
    status: "",
    message: "",
    error: false
});

export const mutations = {
    ORDER_REQUEST(state) {
        state.status = "...loading",
            state.message = "";
        state.error = false
    },
    ORDERS_SUCCESS(state, orders) {
        state.orders = orders;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    ORDER_FAILURE(state, error) {
        state.status = "";
        state.message = "Muvaffaqiyatsiz yakunlandi!!!"
        state.error = true;

    },
    DISABLE_ERROR(state) {
        state.error = false;
        state.message = "";
    },

    ORDER_SUCCESS(state, order) {
        state.order = order;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    CLEAR_ONE_ORDER(state) {
        state.order = null;
    }
};

export const actions = {

    GET_ONE({ commit }, id) {
        commit('ORDER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/order/${id}`)
                .then(res => {
                    commit('ORDER_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('ORDER_FAILURE');
                    reject(false);
                })
        })
    },

    GET_ALL({ commit }) {
        commit('ORDER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get('/order/all')
                .then(res => {
                    commit('ORDERS_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('ORDER_FAILURE');
                    reject(false);
                })
        })
    },

    CREATE_ONE({ commit, dispatch }, data) {
        commit('ORDER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$post('/order', data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('ORDER_FAILURE');
                    reject(false);
                });
        });
    },

    UPDATE_ONE({ commit, dispatch }, data) {
        commit('ORDER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$put(`/order/${data._id}`, data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('ORDER_FAILURE');
                    reject(false);
                });
        });
    },

    DELETE_ONE({ commit }, id) {
        commit('ORDER_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/order/${data._id}`)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('ORDER_FAILURE');
                    reject(false);
                });
        });
    }

}
