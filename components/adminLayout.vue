<template>
  <v-app id="myapp">
    <v-app-bar color="blue" app>
      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on">
            {{ $auth.user.firstname }} {{ $auth.user.lastname }}
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  :src="`http://localhost:8080` + $auth.user.photo"
                  alt="John"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  >{{ $auth.user.firstname }}
                  {{ $auth.user.lastname }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item dense>
              <v-list-item-action>
                <v-list-item-avatar
                  ><v-icon>mdi-email</v-icon></v-list-item-avatar
                >
              </v-list-item-action>
              <v-list-item-title>{{$auth.user.email}}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-list-item-avatar
                  ><v-icon>mdi-information</v-icon></v-list-item-avatar
                >
              </v-list-item-action>
              <v-list-item-title>Profilingiz</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$auth.logout()">
              <v-list-item-action>
                <v-list-item-avatar
                  ><v-icon>mdi-logout</v-icon></v-list-item-avatar
                >
              </v-list-item-action>
              <v-list-item-title>Chiqish</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app color="blue lighten-2">
      <v-toolbar dark color="blue">
        <v-toolbar-title> Admin Panel </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-item-group v-model="selectedItem" color="white">
          <v-list-item v-for="(item, i) in sections" :to="item.route" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div>
        <v-alert v-if="$store.state.success" @click="$store.commit('SUCCESS_FALSE')" color="success white--text"  class="text-h6 font-weight-bold alert-position" dismissible border="left" >Muvaffaqiyatli yakunlandi!!!</v-alert>
                <v-alert v-if="$store.state.error" @click="$store.commit('ERROR_FALSE')" color="error white--text"  class="text-h6 font-weight-bold alert-position" dismissible border="left" >Nimadir xato ketdi!!!</v-alert>
        <v-breadcrumbs class="ma-0" :items="breadcrumbs">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :to="item.route" :disabled="item.disabled">
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: "isAdmin",
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    selectedItem: 1,
    sections: [
      {
        text: "Foydalanuvchilar",
        route: "/admin/users",
        icon: "mdi-account-multiple",
      },
      {
        text: "Qilingingan ishlar",
        route: "/admin/portfolio",
        icon: "mdi-briefcase",
      },
      {
        text: "Buyurtmalar",
        route: "/admin/orders",
        icon: "mdi-order-bool-ascending-variant",
      },
      {
        text: "Ijtimoiy tarmoqlar",
        route: "/admin/socials",
        icon: "mdi-social-distance-6-feet",
      },

      {
        text: "Teglar",
        route: "/admin/tags",
        icon: "mdi-tag",
      },

      {
        text: "Xizmatlar",
        route: "/admin/services",
        icon: "mdi-toolbox-outline",
      },
    ],
    breadcrumbs: [
      {
        text: "Admin",
        disabled: false,
        route: "/",
      },
    ],
  }),
  methods: {},
  mounted() {
    // console.log("salomsizlarga".search('salomga'), "borekan");
    let uri = this.$route.path.split("/");
    // console.log(uri, uri.join('/'), uri);
    this.sections.forEach((section) => {
      // console.log(this.$route.path);
      if (this.$route.path.search(section.route) == 0) {
        let route = "/" + uri[1] + "/" + uri[2];
        let secondItem = {
          text: section.text,
          disabled: false,
          route: route,
        };
        this.breadcrumbs.push(secondItem);
        // break;
      }
    });
    if (uri.length > 3) {
      let thirdItem = {
        text:
          uri[3] == "create"
            ? "Qo'shish"
            : uri[3] == "update"
            ? "Yangilash"
            : "Ko'rish",
        disabled: false,
        route: "/admin/portfolio/" + uri[3],
      };
      this.breadcrumbs.push(thirdItem);
    }
    // this.breadcrumbs.push();
    // console.log(this.$route);
  },
};
</script>

<style lang="scss">
  .alert-position{
    position: fixed;
    top: 15%;
    right: 1%;
    z-index: 1000;
  }
</style>