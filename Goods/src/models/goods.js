import { queryGoods } from "@/services/goods";

export default {
    namespace: "goods",

    state: {
        ServiceData: [],
        port:''
    },

    effects: {
        *fetch(_, { call, put }) {
            const response =yield( yield call(queryGoods)).json();
            console.log(response);
            yield put({
                type: "show",
                payload: {
                    ServiceData: response.data,
                    port:response.port
                }
            });
        }
    },

    reducers: {
        show(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
};
