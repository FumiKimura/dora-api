import path from "path";
import App from "./app"
import RootController from "./services/root/controller";

const filepath = path.join(__dirname, "../", "build");
const filename = "index.html";

const app: App = new App(8080, new RootController(filepath, filename));
app.start();
