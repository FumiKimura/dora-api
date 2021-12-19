import { Router, Request, Response } from "express";
import GadgetManager from "./manager";
import { Gadget } from "@prisma/client";


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
        // router.patch("", this.updateGadget);
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

    // protected updateGadget = async (req: Request, res:Response): Promise<void> => {
    //     try {
    //         const updateInfo = new Gadget();
    //         const id = req.query.id;
    //         updateInfo.gadgetName = req.body.gadgetName; 
    //         updateInfo.gadgetType = req.body.gadgetType;
    //         const owner = parseInt(req.body.ownerId);
            
    //         //Cannot append new character to gadget's user and delete specific a user
    //         //New array of characters overwrites given gadgets users (array of characters)
    //         let characters: Array<number>;
    //         if(req.body.characters) characters = req.body.characters.map(id => parseInt(id));
            
    //         const response = await this.manager.updateGadget(parseInt(id as string), updateInfo, owner, characters);
    //         res.send(response);
    //     }catch(e){
    //         console.log(e);
    //         res.sendStatus(404);
    //     }
    // }

    protected deleteGadget = async (req: Request, res: Response): Promise<void> => {
        const id = req.query.id;
        const response = await this.manager.deleteGadget(parseInt(id as string));
        !response ? res.sendStatus(404):res.send(response);
    }
}

export default GadgetController;