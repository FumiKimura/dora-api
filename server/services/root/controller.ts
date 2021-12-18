import { Router, Request, Response } from "express";
import path from "path";

class RootController {
    public path = "/";
    public router: Router;
    public filepath: string;
    public filename: string;

    constructor(filepath: string, filename: string){
        this.router = this.setupRoute();
        this.filepath = filepath;
        this.filename = filename;
    }

    protected setupRoute(){
        const router = Router();
        router.get("", this.getStaticFile);
        return router;
    }

    protected getStaticFile = (req: Request, res: Response): void => {
        res.sendFile(path.join(this.filepath, this.filename));
    }
}

export default RootController;