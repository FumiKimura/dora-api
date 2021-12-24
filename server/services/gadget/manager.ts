import { PrismaClient, Gadget } from "@prisma/client";

class GadgetManager{    
    public prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public async getAllGadget(): Promise<Gadget[]> {
        const allGadgets = await this.prisma.gadget.findMany({
            include: {
                users: true
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

    public async postNewGadget(name:string, type:string, userIds:number[]): Promise<Gadget>{
        const users = userIds.map((id) => {
            return {id:id};
        });

        const newGadget = await this.prisma.gadget.create({
            data: {
                name: name,
                type: type,
                users: {
                    connect: users
                }
            },
            include: {
                users: true
            }
        });

        return Promise.resolve(newGadget);
    }

    public async updateGadget(id: number, name: string | undefined, type: string | undefined, users: {id: number}[] | undefined): Promise<Gadget> {
        
        const updateGadget = await this.prisma.gadget.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            type: type,
            users: {
                set: users
            }
        },
        include: {
            users: true
        },
        })

        return Promise.resolve(updateGadget);
    }


    public async deleteGadget(id: number): Promise<Gadget | null> {
        const isIdExist = await this.getGadgetById(id);
        if(isIdExist === undefined)return null;

        const deleteGadget = await this.prisma.gadget.delete({
            where: {
                id: id
            },
            include: {
                users: true
            }
        })

        return Promise.resolve(deleteGadget);
    }
}

export default GadgetManager;