import {deleteUser, getAuth, reauthenticateWithRedirect} from "firebase/auth";
import {useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";

export default {
    namespaced: true,
    state: () => ({}),
    actions: {
        async deleteAccount() {
            const user = getAuth().currentUser
            // reauthenticateWithRedirect(user, )
            const router = useRouter()
            deleteUser(user)
                .then(() => {
                    router.push("/auth/register")
                })
        }
    }
}