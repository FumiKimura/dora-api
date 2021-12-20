import { PrismaClient, Gadget } from "@prisma/client";


class GadgetManager{    
    public prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public async getAllGadget(): Promise<Gadget[]> {
        const allGadgets = await this.prisma.gadget.findMany({
            include: {
                users: {
                    include: {
                        user:true
                    }
                }
            },
        });

        const result = allGadgets.map((user) => {
            return { ...user, users: user.users.map((user) => user.user) }
        });
        return Promise.resolve(result);
    }

    public async getGadgetList(num: number): Promise<Gadget[]> {
        const gadgets = await this.prisma.gadget.findMany({
            include: {
                users: {
                    include: {
                        user:true
                    }
                }
            },
            take: num
        });
        const result = gadgets.map((user) => {
            return { ...user, users: user.users.map((user) => user.user) }
        });
        return Promise.resolve(result);
    }

    public async getGadgetById(id: number): Promise<Gadget[] | null> {
        const gadget = await this.prisma.gadget.findMany({
            where: {id:id},
            include: {
                users: {
                    include: {
                        user:true
                    }
                }
            },
        });
        const result = gadget.map((user) => {
            return { ...user, users: user.users.map((user) => user.user) }
        });
        return Promise.resolve(result);
    }

    public async postNewGadget(name:string, type:string, userIds:number[]): Promise<Gadget[]>{
        const users = userIds.map((id) => {
            return {user:{connect:{id:id}}};
        });

        await this.prisma.gadget.create({
            data: {
                name: name,
                type: type,
                users: {
                    create: users
                }
            }
        });

        const newGadget = this.getGadgetList(-1);
        return Promise.resolve(newGadget);
    }

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

    public async deleteGadget(id: number): Promise<Gadget> {
        const deletedGadget = await this.prisma.gadget.delete({
            where: {
                id: id
            }
        })
        return Promise.resolve(deletedGadget);
    }
}

export default GadgetManager;