<script>
import { store } from "../store";

export default {
    methods: {
        $can(permissionName) {
            return store.getters.getPermissions.indexOf(permissionName) !== -1;
        },
    },
};
</script>