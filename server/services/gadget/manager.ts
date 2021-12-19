import { PrismaClient, Gadget } from "@prisma/client";


class GadgetManager{    
    public prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public async getAllGadget(): Promise<Gadget[]> {
        const allGadgets = await this.prisma.gadget.findMany({
            include: {
                users: true,
            },
        });
        return Promise.resolve(allGadgets);
    }

    public async getGadgetList(num: number): Promise<Gadget[]> {
        const gadgets = await this.prisma.gadget.findMany({
            include: {
                users: true
            },
            take: num
        });
        return Promise.resolve(gadgets);
    }

    public async getGadgetById(id: number): Promise<Gadget | null> {
        const gadget = await this.prisma.gadget.findUnique({
            where: {id:id},
            include: {
                users: true
            },
        });
        return Promise.resolve(gadget);
    }

    // public async postNewGadget(partial: Gadget, owner: number, characters: Array<number>): Promise<Gadget> {
    //     const characterManager = new CharacterManager();
        
    //     partial.owner = await characterManager.getCharacterById(owner);
    //     partial.characters = await Promise.all(characters.map(async (id) => {
    //         return await characterManager.getCharacterById(id)
    //     }));

    //     if(!partial.gadgetName || 
    //     !partial.gadgetType ||
    //     !partial.owner || 
    //     partial.characters.some(character => !character)){
    //         throw new Error("There is an error in input");
    //     }
            
    //     await this.gadgetRepository.save(partial);
    //     return Promise.resolve(partial);
    // }

    // public async updateGadget(id: number, updateGadget:Gadget, owner: number, characters: Array<number>): Promise<Gadget> {
    //     const characterManager = new CharacterManager();

    //     const update = await this.gadgetRepository.findOne({
    //         relations:["owner","characters"],
    //         where: {id:id}
    //     });

    //     //Make it work for now. Refactor later.
    //     if(updateGadget.gadgetName) update.gadgetName = updateGadget.gadgetName;
    //     if(updateGadget.gadgetType) update.gadgetType = updateGadget.gadgetType;
    //     if(owner) update.owner = await characterManager.getCharacterById(owner);
    //     if(characters) update.characters = await Promise.all(characters.map(async (id) => {
    //         return await characterManager.getCharacterById(id)
    //     }));

    //     await this.gadgetRepository.save(update);
    //     return Promise.resolve(update);
    // }

    // public async deleteGadget(id: number): Promise<Gadget> {
    //     const gadget = await this.gadgetRepository.findOne({
    //         relations:["owner","characters"],
    //         where: {id:id}
    //     });
    //     if(gadget) await this.gadgetRepository.delete({id: id});
    //     return Promise.resolve(gadget);
    // }
}

export default GadgetManager;