export const deleteItem = {
    data: () => ({
        id: "",
        isDelete: false,
        search: "",
    }),
    methods: {
        openDelete(id) {
            this.isDelete = true;
            this.id = id;
        },
        deleteRequest(vuex_delete_action) {
            this.isDelete = false;
            this.$store.dispatch(vuex_delete_action, this.id)
                .then((res) => {
                    this.$store.commit('SUCCESS_TRUE', 'Muvaffaqiyatli yakunlandi!!!');
                })
                .catch((error) => {
                    // this.$store.dispatch('ERROR_TRUE');
                    this.$store.commit("ERROR_TRUE", "Nimadir xato ketdi!!!");
                });
            ;
        },

        closeDelete() {
            this.isDelete = false;
        },
        getUri() {
            let sliced = this.$route.path;
            // console.log(sliced);
            return sliced
        }
    },
}