import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding started");

    const gadgets = await prisma.gadget.createMany({
        data:[
            {name: "Time Machine", type: "Hover craft"},
            {name: "Big Light", type: "Laser"},
            {name: "Take-Copter", type: "Mini-Helicopter"},
            {name: "Anywhere Door", type: "Door"},
            {name: "Gravity Paint", type: "Paint"},
        ]              
    });

    const characters = await prisma.character.createMany({
        data: [
            //Time Machine
            {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91, gadgetId: 1},
            {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10, gadgetId: 1},
            {firstname: "Dorami", lastname: null, species: "Robot Cat", age: -94, gadgetId: 1},
            {firstname: "Kuruto", lastname: "Hartman", species: "Human", age: 10, gadgetId: 1},
            {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10, gadgetId: 1},
            {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10, gadgetId: 1},
            {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10, gadgetId: 1},
            //Big Light
            {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91, gadgetId: 2},
            {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10, gadgetId: 2},
            {firstname: "Dorami", lastname: null, species: "Robot Cat", age: -94, gadgetId: 2},
            {firstname: "Kuruto", lastname: "Hartman", species: "Human", age: 10, gadgetId: 2},
            {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10, gadgetId: 2},
            {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10, gadgetId: 2},
            {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10, gadgetId: 2},
            //Take-Copter
            {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91, gadgetId: 3},
            {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10, gadgetId: 3},
            {firstname: "Kuruto", lastname: "Hartman", species: "Human", age: 10, gadgetId: 3},
            {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10, gadgetId: 3},
            {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10, gadgetId: 3},
            {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10, gadgetId: 3},
            //Anywhere Door
            {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91, gadgetId: 4},
            {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10, gadgetId: 4},
            {firstname: "Dorami", lastname: null, species: "Robot Cat", age: -94, gadgetId: 4},
            {firstname: "Kuruto", lastname: "Hartman", species: "Human", age: 10, gadgetId: 4},
            {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10, gadgetId: 4},
            {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10, gadgetId: 4},
            {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10, gadgetId: 4},   
            //Gravity Paint
            {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91, gadgetId: 5},
            {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10, gadgetId: 5},
            {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10, gadgetId: 5},
            {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10, gadgetId: 5},
            {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10, gadgetId: 5}, 
        ]
    })

    console.log("Seeding finished");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
