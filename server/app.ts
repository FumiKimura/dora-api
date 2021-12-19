import express, {Application} from "express";
import cors from "cors";
import RootController from "./services/root/controller";
import GadgetController from "./services/gadget/controller";

class App {
    public static readonly DEFAULT_PORT: number = 8080;
    public readonly app: Application;
    public readonly port: number;

    constructor(port: number, rootService: RootController, gadgetService: GadgetController){
        this.app = express();
        this.port = port || App.DEFAULT_PORT;
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(rootService.path, rootService.router);
        this.app.use(rootService.path, express.static(rootService.filepath));
        this.app.use(gadgetService.path, gadgetService.router);
    }

    public start(): void{
        this.app.listen(this.port, () => console.log(`Listening to ${this.port}`));
    }
}

export default App;