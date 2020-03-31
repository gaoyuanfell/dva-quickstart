import userServer from "../services/user";

function initUserPageState() {
  return {
    list: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    loading: false
  };
}

export default {
  namespace: "user",
  state: {
    //分页数据
    userPage: {
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false
    },
    //用户弹框
    userModel: {
      modelData: {},
      visible: false
    }
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        userPage: action.payload
      };
    },
    initUserPage(state) {
      return {
        ...state,
        userPage: initUserPageState()
      };
    },
    setLoading(state, action) {
      return {
        ...state,
        userPage: {
          ...state.userPage,
          loading: action.payload
        }
      };
    },
    setUserModel(state, action) {
      return {
        ...state,
        userModel: action.payload
      };
    }
  },

  effects: {
    *getList({ payload }, effect) {
      const { call, put } = effect;

      yield put({ type: "setLoading", payload: true });

      const result = yield call(userServer.list, payload);
      if (result.code !== 200) throw result.msg;

      yield put({
        type: "list",
        payload: result.data
      });

      yield put({ type: "setLoading", payload: false });
    },
    *remove({ payload }, { call, put }) {
      const result = yield call(userServer.remove, payload);
      if (result.code !== 200) throw result.msg;

      yield put({
        type: " initUserPage"
      });

      yield put({
        type: "getList",
        payload: {
          pageNum: 1,
          pageSize: 10
        }
      });
    },
    *editUser({ payload }, { call, put }) {
      const result = yield call(userServer.edit, payload);
      if (result.code !== 200) throw result.msg;

      yield put({
        type: "getList",
        payload: {
          pageNum: 1,
          pageSize: 10
        }
      });
    },
    *addUser({ payload }, { call, put }) {
      const result = yield call(userServer.add, payload);
      if (result.code !== 200) throw result.msg;

      yield put({
        type: "getList",
        payload: {
          pageNum: 1,
          pageSize: 10
        }
      });
    },
    *showUserModelByInfo({ payload }, { call, put }) {
      const result = yield call(userServer.info, payload);
      if (result.code !== 200) throw result.msg;

      yield put({
        type: "setUserModel",
        payload: {
          modelData: result.data,
          visible: true
        }
      });
    }
  },

  subscriptions: {}
};
