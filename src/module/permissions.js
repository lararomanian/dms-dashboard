export const permissions = {
    state: {
        permissions: [],
    },
    getters: {
        
        getPermissions(state) {
            return state.permissions;
        },
    },
    
    mutations: {
        SET_PERMISSIONS(state, permissions) {
            state.permissions = permissions;
        },
    },
    
    actions: {
        setPermissions({ commit }, permissions) {
            commit("SET_PERMISSIONS", permissions);
          },
    },
};
