import { Router, Request, Response } from "express";
import GadgetManager from "./manager";


class GadgetController {
    public path = "/gadget";
    public router: Router;
    public manager: GadgetManager;

    constructor(){
        this.router = this.setupRoute();
        this.manager = new GadgetManager();
    }

    protected setupRoute(){
        const router = Router();
        router.get("/allgadget", this.getAllGadgets);
        router.get("/gadgetlist", this.getGadgetList);
        router.get("/gadgetbyid", this.getGadgetById);
        router.post("", this.postNewGadget);
        router.patch("", this.updateGadget);
        router.delete("", this.deleteGadget);
        return router;
    }

    protected getAllGadgets = async (req: Request, res:Response): Promise<void> => {
        const gadget = await this.manager.getAllGadget();
        res.send(gadget);
    }

    protected getGadgetList = async (req: Request, res:Response): Promise<void> => {
        let gadget;
        const { num } = req.query;
        if(num === undefined){
            gadget = await this.manager.getAllGadget();
            res.send(gadget);
        }else{
            gadget = await this.manager.getGadgetList(parseInt(num as string));
            res.send(gadget);
        }
    }

    protected getGadgetById = async (req: Request, res:Response): Promise<void> => {
        const { id } = req.query;
        if(id === undefined){
            res.sendStatus(404);
        }else{
            const gadget = await this.manager.getGadgetById(parseInt(id as string));
            !gadget ? res.sendStatus(404): res.send(gadget);
        }
    }

    protected postNewGadget = async (req: Request, res:Response): Promise<void> => {
        try{
            const {name, type, users} = req.body;
            res.send(await this.manager.postNewGadget(name, type, users));
        }catch(e){
            console.log(e);
            res.sendStatus(400);
        }
    }

    protected updateGadget = async (req: Request, res:Response): Promise<void> => {
        try {
            const id = req.query.id;
            if(id === undefined) throw new Error("No ID in the query");
            
            const name: string | undefined = req.body.name;
            const type: string | undefined = req.body.type; 
            let users: {id:number}[] | undefined;
            if(req.body.users !== undefined){
                users = req.body.users.map((id: string) => {
                    return {id: parseInt(id)};
                });
            }else {
                users = undefined;
            }    
            
            const response = await this.manager.updateGadget(parseInt(id as string), name, type, users);
            res.send(response);
        }catch(e){
            console.log(e);
            res.send(e);
        }
    }

    protected deleteGadget = async (req: Request, res: Response): Promise<void> => {
        const id = req.query.id;
        const response = await this.manager.deleteGadget(parseInt(id as string));
        !response ? res.sendStatus(404):res.send(response);
    }
}

export default GadgetController;