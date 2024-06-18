import {
    getAuth,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

import { getDatabase, ref, set } from "firebase/database";

export default {
    namespaced: true,
    state: () => ({
        user: null,
        message: "",
        errorMessage: "",
        profileImage: "/profile.jpg",
        authValid: {
            status: true,
            message: ""
        },
    }),
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload;
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
        SET_ERROR(state, payload) {
            state.errorMessage = payload;
        }
    },
    actions: {
        async register({state, commit}, payload) {
            try {
                const userCredential = await createUserWithEmailAndPassword(getAuth(), payload.email, payload.password);
                await updateProfile(getAuth().currentUser, {
                    displayName: payload.username,
                    photoURL: state.profileImage
                });
                const user = getAuth().currentUser
                const db = getDatabase();
                set(ref(db, 'users/' + user.uid), {
                    username: user.displayName,
                    email: user.email,
                    role: 'user'
                });
                await sendEmailVerification(user);
                commit("SET_MESSAGE", "Successfully registered", user);
                commit("SET_USER", user);
            } catch (error) {
                console.log(error);
                commit("SET_MESSAGE", `An error occurred: ${error}`);
            }
        },
        async regGoogle({ commit, state }) {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                commit("SET_USER", user);
                const db = getDatabase();
                set(ref(db, 'users/' + user.uid), {
                    username: user.displayName,
                    email: user.email,
                    role: 'user'
                });
                state.authValid = { status: true, message: "Successfully authenticated with Google" };
            } catch (error) {
                console.error(error);
                state.authValid = { status: false, message: error.message };
            }
        },
        async signInGoogle({ commit, state }) {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                commit("SET_USER", user);
                const db = getDatabase();
                state.authValid = { status: true, message: "Successfully authenticated with Google" };
            } catch (error) {
                console.error(error);
                state.authValid = { status: false, message: error.message };
            }
        },
        async signIn({commit}, payload) {
            try {
                const userCredential = await signInWithEmailAndPassword(getAuth(), payload.email, payload.password);
                commit("SET_MESSAGE", "Successfully logged in");
                commit("SET_USER", getAuth().currentUser);
            } catch (error) {
                console.log(error);
                commit("SET_MESSAGE", `An error occurred`);
                switch (error.code) {
                    case "auth/invalid-email":
                        commit("SET_ERROR", "Invalid email");
                        break;
                    case "auth/user-not-found":
                        commit("SET_ERROR", "User not found");
                        break;
                    case "auth/invalid-credential":
                        commit("SET_ERROR", "Invalid password");
                        break;
                }
            }
        },
        async updateUser({commit}, payload) {
            const firebaseUser = getAuth().currentUser;
            try {
                if (firebaseUser.displayName !== payload.updatedDisplayName) {
                    await updateProfile(firebaseUser, {displayName: payload.updatedDisplayName});
                }
                commit("SET_USER", firebaseUser);
            } catch (error) {
                console.error("Error updating user information:", error);
            }
        },
        fetchUser({commit}) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                commit("SET_USER", user);
            }
        },
    },
    getters: {
        isValid: state => state.authValid
    }
};
