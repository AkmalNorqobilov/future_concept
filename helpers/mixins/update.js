export const updateItem = {
    data: () => ({
        valid: false,
        oneItem: null,
        path: "",
        pathWithAdmin: "",
    }),
    async mounted() {
        try {
            console.log(this.pathWithAdmin, this.path);
            console.log(this.$route.query.id);
            let response = await this.$axios.$get(`${this.path.slice(0, this.path.length-1)}/one/${this.$route.query.id}`);
            console.log(response);
            this.oneItem = response.data;
        } catch (error) {
            this.$store.commit("ERROR_TRUE", "Nimadir xato ketdi!!!");
            console.log(error);
        }
    },

    methods: {
        update() {
            console.log(this.$refs);
            if (this.$refs.oneItem.validate()) {
                this.$store
                    .dispatch(`${this.path}/UPDATE_ONE`, this.oneItem)
                    .then((res) => {
                        this.$store.commit("SUCCESS_TRUE");
                        this.$router.push(`${this.pathWithAdmin}`);
                    })
                    .catch((error) => {
                        // this.$store.dispatch('ERROR_TRUE');
                        this.$store.commit("ERROR_TRUE", "Nimadir xato ketdi!!!");
                    });
            }
        },
        reset() {
            this.$refs.oneItem.reset();
        },
        resetValidation() {
            this.$refs.oneItem.resetValidation();
        },
        getPathWithAdmin(){
            let path = this.$route.path.split('/');
            this.path= path[2];
            this.pathWithAdmin = `/admin/${path[2]}`;
        }
    },
    created() {
        this.getPathWithAdmin();
    }
}