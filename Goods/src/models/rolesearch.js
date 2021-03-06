import {
  addRole,
  deleteRole,
  queryRole,
  updateRole,
  menuList
} from "@/services/rolesearch";
import { message } from "antd";

export default {
  namespace: "rolesearch",

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield (yield call(queryRole, payload)).json();
      //
      // for(let i=0;i<response.length;i++){
      //     for(let j=0;j<response[i].roleMenu.length;j++)
      //         response[i].roleMenu[j].push(',');
      // }
      //    console.log(response.length);
      //    console.log(response[0].roleMenu.length);
      yield put({
        type: "save",
        payload: {
          list: response
        }
      });
      // console.log(response);
    },
    *add({ payload, callback }, { call, put, select }) {
      const response = yield (yield call(addRole, payload)).json();
      console.log(response);
      // const list = yield select(state => state.rolesearch.data.list);
      // list.push(payload);
      // console.log(list);
      // console.log(list.map(item=>(item.id)));   遍历数组中的每一项的某一属性
      yield put({
        type: "save",
        payload: {
          list: response
          //   pagination: {}
        }
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put, select }) {
      const response = yield (yield call(updateRole, payload)).json();
      let list = yield select(state => state.rolesearch.data.list);
      //  console.log(list);
      yield list.forEach((value, index, array) => {
        let role = array[index];
        if (role.id === payload.id) {
          array[index] = payload;
        }
      });
      yield put({
        type: "save",
        payload: {
          list: list
          //   pagination: {}
        }
      });
      if (callback) callback();
    },

    *delete({ payload, callback }, { call, put, select }) {
      //   console.log(payload);
      const response = yield call(deleteRole, payload);
      console.log(payload);
      let list = yield select(state => state.rolesearch.data.list);
      //console.log(list);
      for (let i = 0, flag = true; i < list.length; flag ? i++ : i) {
        for (let j = 0; j < payload.id.length; j++) {
          if (list[i].id === payload.id[j]) {
            list.splice(i, 1);
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
      }
      yield put({
        type: "save",
        payload: {
          list: list
        }
      });
      if (callback) callback();
    },

    *menu({ payload, callback }, { call, put, select }) {
      const response = yield (yield call(menuList, payload)).json();
      //  console.log(response);

      let list = yield select(state => state.rolesearch.data.list);
      // console.log(list);
      yield list.forEach((value, index, array) => {
        let role = array[index];
        console.log(role);
        console.log(array[index].roleMenu);
        if (response.length === 0) {
          return false;
        } else if (role.name === response[0].name) {
          //  console.log(array[index].roleMenu);
          // let a=response[0].roleMenu;
          //array[index].roleMenu.push(response[0].roleMenu + "," );
          array[index].roleMenu =
            array[index].roleMenu + "," + response[0].roleMenu;
        }
      });
      //   console.log(response);
      yield put({
        type: "save",
        payload: {
          list: list
          //   pagination: {}
        }
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    } /*,
        menuList(state, action) {
          return {
            ...state,
            menu: action.payload
          };
        }*/
  }
};
