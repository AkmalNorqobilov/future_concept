export const state = () => ({
    tags: [],
    tag: null,
    status: "",
    message: "",
    error: false
});

export const mutations = {
    TAG_REQUEST(state) {
        state.status = "...loading",
            state.message = "";
        state.error = false
    },
    TAGS_SUCCESS(state, tags) {
        state.tags = tags;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    TAG_FAILURE(state, error) {
        state.status = "";
        state.message = "Muvaffaqiyatsiz yakunlandi!!!"
        state.error = true;

    },
    DISABLE_ERROR(state) {
        state.error = false;
        state.message = "";
    },

    TAG_SUCCESS(state, tag) {
        state.tag = tag;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    CLEAR_ONE_ORDER(state) {
        state.tag = null;
    }
};

export const actions = {

    GET_ONE({ commit }, id) {
        commit('TAG_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/tag/one/${id}`)
                .then(res => {
                    commit('TAG_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('TAG_FAILURE');
                    reject(false);
                })
        })
    },

    GET_ALL({ commit }) {
        commit('TAG_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get('/tag/all')
                .then(res => {
                    commit('TAGS_SUCCESS', res.data);
                    resolve(true)
                })
                .catch(err => {
                    commit('TAG_FAILURE');
                    reject(false);
                })
        })
    },

    CREATE_ONE({ commit, dispatch }, data) {
        commit('TAG_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$post('/tag/add', data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('TAG_FAILURE');
                    reject(false);
                });
        });
    },

    UPDATE_ONE({ commit, dispatch }, data) {
        commit('TAG_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$put(`/tag/update/${data._id}`, data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    // console.log(err);
                    commit('TAG_FAILURE');
                    reject(false);
                });
        });
    },

    DELETE_ONE({ commit, dispatch }, id) {
        commit('TAG_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/tag/delete/${id}`)
                .then(res => {
                    dispatch('GET_ALL', res.data);
                    resolve(true);
                })
                .catch(err => {
                    commit('TAG_FAILURE');
                    reject(false);
                });
        });
    }

}
