import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import _ from "lodash";

Vue.use(Vuex, axios);

export default new Vuex.Store({
    state: {
        data: [],
        lodash: "",
        chip1: false,
        chip2: false,
        chip3: false,
        chip4: false,
    },
    mutations: {
        addData(state, payload) {
            state.lodash = payload
        },
        open(state, payload) {
            payload === 0 ?
                state.chip1 = true :
                payload === 1 ?
                state.chip2 = true :
                payload === 2 ?
                state.chip3 = true :
                payload === 3 ?
                state.chip4 = true : false;
        },
        close(state, payload) {
            if (payload === 0) {
                state.chip1 = false;
            } else if (payload === 1) {
                state.chip2 = false;
            } else if (payload === 2) {
                state.chip3 = false;
            } else {
                state.chip1 = false,
                    state.chip2 = false,
                    state.chip3 = false,
                    state.chip4 = false,
                    state.dataChart = "";
            }
        },
    },
    actions: {
        receiveData(context, payload) {
            context.commit("addData", payload)
        },
        fireChips(context, payload) {
            context.commit("open", payload)
        },
        closeChips(context, payload) {
            context.commit("close", payload)
        },
    },
    getters: {
        getData(state) {
            if (state.chip1 === true) {
                const obj = state.lodash;
                const obj2 = obj[Object.keys(obj)[0]];
                return obj2;
            }
            if (state.chip2 === true) {
                const obj = state.lodash;
                const obj2 = obj[Object.keys(obj)[1]];
                return obj2;
            }
            if (state.chip3 === true) {
                const obj = state.lodash;
                const obj2 = obj[Object.keys(obj)[3]];
                return obj2;
            }
            if (state.chip4 === true) {
                const obj = state.lodash;
                const obj2 = obj[Object.keys(obj)[2]];
                return obj2;
            }
        },
        chips(state) {
            if (state.chip1 || state.chip2 || state.chip3 || state.chip4) {
                return true
            }
            return false
        }
    }
})