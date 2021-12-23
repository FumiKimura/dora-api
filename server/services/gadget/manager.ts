import { PrismaClient, Gadget } from "@prisma/client";
import e from "express";


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

    public async getGadgetById(id: number): Promise<Gadget | null> {
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
        return Promise.resolve(result[0]);
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

    public async updateGadget(id: number, name: string | undefined, type: string | undefined, users: {user:{connect:{id:number}}}[] | undefined): Promise<Gadget> {
        
        const updateGadget = await this.prisma.gadget.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            type: type,
            users: {
                set: [
                    {gadgetId_userId: {
                        gadgetId: id,
                        userId: 2
                    }},
                ]
            }
        },
        include: {
            users: {
                include: {
                    user:true
                }
            }
        },
        })

        const result = [updateGadget].map((user) => {
            return { ...user, users: user.users.map((user) => user.user) }
        })[0];
        return Promise.resolve(result);
    }


    public async deleteGadget(id: number): Promise<Gadget | null> {
        const isIdExist = await this.getGadgetById(id);
        if(isIdExist === undefined)return null;

        await this.prisma.gadget.update({
            data: {
              users: {
                deleteMany: {},
              },
            },
            where: {
              id: id,
            },
          })

        const deleteGadget = await this.prisma.gadget.delete({
            where: {
                id: id
            }
        })

        return Promise.resolve(deleteGadget);
    }
}

export default GadgetManager;