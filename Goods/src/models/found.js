import {
  addFound,
  queryFound,
  removeFound,
  updateFound,
  Add_user_role,
  Add_user_app
} from "../services/found";
export default {
  namespace: "found",

  state: {
    data: {
      list: [],
      pagination: { pageSize: 8 }
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield (yield call(queryFound, payload)).json();
      yield put({
        type: "save",
        payload: {
          list: response,
          pagination: { pageSize: 8 }
        }
      });
    },
    *add({ payload, callback }, { call, put, select }) {
      console.log(payload);
      const response = yield (yield call(addFound, payload)).json();
      let list = yield select(state => state.found.data.list);
      list.push(response[0]);
      yield put({
        type: "save",
        payload: {
          list: list,
          pagination: { pageSize: 8 }
        }
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put, select }) {
      const response = yield call(removeFound, payload);
      console.log(payload);
      let list = yield select(state => state.found.data.list);
      for (let i = 0, flag = true; i < list.length; flag ? i++ : i) {
        for (let j = 0; j < payload.ids.length; j++) {
          if (list[i].id === payload.ids[j]) {
            list.splice(i, 1);
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
      } //好了，可以删掉31，33了
      yield put({
        type: "save",
        payload: {
          list: list,
          pagination: { pageSize: 8 }
        }
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put, select }) {
      const response = yield (yield call(updateFound, payload)).json();
      let list = yield select(state => state.found.data.list);
      yield list.forEach((value, index, array) => {
        let user = array[index];
        let res_user = response[0];
        if (user.id === res_user.id) {
          array[index] = res_user;
        }
        /*if(user.id == payload .id) {
                array[index] = payload;
              }*/
      });
      yield put({
        type: "save",
        payload: {
          list: list, //response:undefine
          pagination: { pageSize: 8 }
        }
      });
      if (callback) callback();
    },
    *add_user_role({ payload, callback }, { call, put, select }) {
      let list = yield select(state => state.found.data.list);
      let x = JSON.parse(sessionStorage.getItem("selectedRoleRows"));
      console.log(x);
      console.log(x.length);
      console.log(payload.userIds.length);

      for (let k = 0; k < x.length; k++) {
        for (let j = 0; j < payload.userIds.length; j++) {
          for (let i = 0; i < list.length; i++) {
            if (JSON.parse(list[i].id) === payload.userIds[j]) {
              var y = list[i].roles + "," + x[k].name;
              console.log(y);
              list[i].roles = y;
            }
          }
        }
      }
      const response = yield call(Add_user_role, payload);
      yield put({
        type: "save",
        payload: {
          list: list,
          pagination: { pageSize: 8 }
        }
      });
      if (callback) callback();
    },
    *add_user_app({ payload, callback }, { call, put, select }) {
      let list = yield select(state => state.found.data.list);
      const response = yield call(Add_user_app, payload);
      yield put({
        type: "save",
        payload: {
          list: list,
          pagination: { pageSize: 8 }
        }
      });
      if (callback) callback();
    }
  },

  reducers: {
    //处理所有同步逻辑
    save(state, action) {
      return {
        ...state,
        data: action.payload //数据返回给页面
      };
    }
  }
};
