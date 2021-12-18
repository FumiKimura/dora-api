import express, {Application} from "express";
import cors from "cors";
import RootController from "./services/root/controller";

class App {
    public static readonly DEFAULT_PORT: number = 8080;
    public readonly app: Application;
    public readonly port: number;

    constructor(port: number, rootService: RootController){
        this.app = express();
        this.port = port || App.DEFAULT_PORT;
        this.app.use(cors());
        this.app.use(rootService.path, rootService.router);
        this.app.use(rootService.path, express.static(rootService.filepath));
    }

    public start(): void{
        this.app.listen(this.port, () => console.log(`Listening to ${this.port}`));
    }
}

export default App;