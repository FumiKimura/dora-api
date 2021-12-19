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

    public async postNewGadget(name:string, type:string, userId:number[]): Promise<Gadget[]>{
        interface newCharacter {
            firstname: string
            lastname: string | null
            species: string
            age: number
            gadgetId: number | null
        }

        let characters: newCharacter[] = [
            {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91, gadgetId: null},
            {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10, gadgetId: null},
            {firstname: "Dorami", lastname: null, species: "Robot Cat", age: -94, gadgetId: null},
            {firstname: "Kuruto", lastname: "Hartman", species: "Human", age: 10, gadgetId: null},
            {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10, gadgetId: null},
            {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10, gadgetId: null},
            {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10, gadgetId: null},
        ]

        const newGadget = await this.prisma.gadget.create({
            data: {
                name: name,
                type: type,
            }
        });
        
        const users = userId.map(index => {
            characters[index]["gadgetId"] = newGadget.id;
            return characters[index];
        })
        
        const newUsers = await this.prisma.character.createMany({
            data: users
        })
        const newAdd = await this.prisma.gadget.findMany({take:-1, include:{users:true}});
        
        return Promise.resolve(newAdd);
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