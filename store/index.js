export const state = ()=>({
    error: false,
    success: false,
    message: "",
    uploads: 'http://localhost:8080/public/uploads/'
});


export const mutations = {
    ERROR_TRUE(state, message){
        state.message = message;
        state.error = true;
        state.success = false;
    },
    ERROR_FALSE(state){
        state.error = false;
        state.message = "";
    },
    SUCCESS_TRUE(state, message){
        state.message = message;
        state.error = false;
        state.success = true;
    },
    SUCCESS_FALSE(state){
        state.message = "";
        state.success = false;
    }
};