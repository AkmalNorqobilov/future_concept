export const createItem = {
  data: () => ({
    valid: false,
    path: "",
    pathWithAdmin: "",
  }),
  methods: {
    addData(data) {
      console.log(data, this.path);
      if (this.$refs.oneItem.validate()) {
        console.log(this.path, this.pathWithAdmin);
        this.$store
          .dispatch(`${this.path}/CREATE_ONE`, data)
          .then((res) => {
            this.$toast.success('Muvaffaqiyatli yakunlandi!!!');
            this.$router.push(this.pathWithAdmin);
          })
          .catch((error) => {
            this.$toast.error('Nimadir xato ketdi!!!');;
          });
      }
    },
    reset() {
      this.$refs.oneItem.reset();
    },
    resetValidation() {
      this.$refs.oneItem.resetValidation();
    },
    getPathWithAdmin() {
      let path = this.$route.path.split('/');
      this.path = path[2];
      this.pathWithAdmin = `/admin/${path[2]}`;
    }
  },
  created() {
    this.getPathWithAdmin();
    console.log(this.path, this.pathWithAdmin);
  }
}