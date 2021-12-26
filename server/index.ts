import path from "path";
import App from "./app"
import RootController from "./services/root/controller";
import GadgetController from "./services/gadget/controller";

//filepath and filename for production frontend build
const filepath = path.join(__dirname, "../", "build");
const filename = "index.html";
const PORT: number = parseInt(<string>process.env.PORT, 10) || 8080

const app: App = new App(PORT, new RootController(filepath, filename), new GadgetController());
app.start();
