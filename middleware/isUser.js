export default function ({ store, redirect }) {
    // If the user is not authenticated
    // if (store.state.auth.user.role==='user') {
    //   console.log(store.$auth.logout());
    if (store.$auth.loggedIn && store.auth?.user?.role === 'user')
        store.$auth.logout();
    // return redirect('/auth/login')
    // }
}