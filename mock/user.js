const Mock = require("mockjs");
const Random = Mock.Random;

let userTotal = 1000;
let userIds = 1000;
const userList = Mock.mock({
  // 属性 list 的值是一个数组
  "list|1000": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
      "age|20-100": 100,
      name: () => Random.cname(),
      date: () => Random.datetime("yyyy/MM/dd")
    }
  ]
}).list.reverse();

module.exports = {
  "POST /mock/api/userList"(req, res) {
    const { pageSize, pageNum } = req.body;
    res.json({
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: userTotal,
        list: userList.slice((pageNum - 1) * pageSize, pageSize * pageNum)
      },
      code: 200
    });
  },
  "GET /mock/api/user/:id"(req, res) {
    const { id } = req.params;
    res.json({
      data: userList.find(item => item.id == id),
      code: 200
    });
  },
  "DELETE /mock/api/user/:id"(req, res) {
    const { id } = req.params;
    let index = userList.findIndex(item => item.id == id);
    if (index != -1) {
      console.info(userList[index]);
      userList.splice(index, 1);
    }

    --userTotal;
    res.send({
      code: 200
    });
  },
  "POST /mock/api/user/add"(req, res) {
    const { age, name, date } = req.body;
    userList.unshift({
      age,
      name,
      date,
      id: ++userIds
    });
    ++userTotal;
    res.send({
      code: 200
    });
  },
  "POST /mock/api/user/edit"(req, res) {
    const { age, name, date, id } = req.body;
    let data = userList.find(item => item.id == id);
    Object.assign(data, { age, name, date });
    res.send({
      code: 200
    });
  }
};
