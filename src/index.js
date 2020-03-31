import dva from "dva";
import { message } from "antd";
import "./index.css";
import example from "./models/example";
import homeModel from "./models/home";
import userModel from "./models/user";
import router from "./router";

// 1. Initialize
const app = dva({
  history: require("history").createBrowserHistory(),
  onError(e) {
    message.error(e.message, /* duration */ 3);
  }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(example);
app.model(homeModel);
app.model(userModel);

// 4. Router
app.router(router);

// 5. Start
app.start("#root");
