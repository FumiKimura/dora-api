import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding started");

    const characters = await prisma.character.createMany({
      data: [
          {firstname: "Doraemon", lastname: null, species: "Robot Cat", age: -91},
          {firstname: "Nobita", lastname: "Nobi", species: "Human", age: 10},
          {firstname: "Dorami", lastname: null, species: "Robot Cat", age: -94},
          {firstname: "Kuruto", lastname: "Hartman", species: "Human", age: 10},
          {firstname: "Suneo", lastname: "Honekawa", species: "Human", age: 10},
          {firstname: "Takeshi", lastname: "Goda", species: "Human", age: 10},
          {firstname: "Shizuka", lastname: "Minamoto", species: "Human", age: 10},
      ]
    })

    await prisma.gadget.create({
        data:{
          name: "Time Machine", 
          type: "Hover craft",
            users: {
              connect:[
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 5},
                {id: 6},
                {id: 7},
              ]
            }
          },      
    });

    await prisma.gadget.create({
      data:{
        name: "Big Light", 
        type: "Laser",
          users: {
            connect:[
              {id: 1},
              {id: 2},
              {id: 3},
              {id: 4},
              {id: 5},
              {id: 6},
              {id: 7},
            ]
          }
        },      
    });

    await prisma.gadget.create({
      data:{
        name: "Take-Copter", 
        type: "Mini-Helicopter",
          users: {
            connect:[
              {id: 1},
              {id: 2},
              {id: 3},
              {id: 4},
              {id: 5},
              {id: 6},
              {id: 7},
            ]
          }
        },      
    });

    await prisma.gadget.create({
      data:{
        name: "Anywhere Door", 
        type: "Door",
          users: {
            connect:[
              {id: 1},
              {id: 2},
              {id: 3},
              {id: 4},
              {id: 5},
              {id: 6},
              {id: 7},
            ]
          }
        },      
    });

    await prisma.gadget.create({
      data:{
        name: "Gravity Paint", 
        type: "Paint",
          users: {
            connect:[
              {id: 1},
              {id: 2},
              {id: 5},
              {id: 6},
              {id: 7},
            ]
          }
        },      
    });

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
