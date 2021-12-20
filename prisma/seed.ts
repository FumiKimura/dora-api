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
              create:[
                {user:{connect:{id:1}}},
                {user:{connect:{id:2}}},
                {user:{connect:{id:3}}},
                {user:{connect:{id:5}}},
                {user:{connect:{id:6}}},
                {user:{connect:{id:7}}},
              ]
            }
          },      
    });

    await prisma.gadget.create({
      data:{
        name: "Big Light", 
        type: "Laser",
          users: {
            create:[
              {user:{connect:{id:1}}},
              {user:{connect:{id:2}}},
              {user:{connect:{id:3}}},
              {user:{connect:{id:4}}},
              {user:{connect:{id:5}}},
              {user:{connect:{id:6}}},
              {user:{connect:{id:7}}},
            ]
          }
        },      
    });

    await prisma.gadget.create({
      data:{
        name: "Take-Copter", 
        type: "Mini-Helicopter",
          users: {
            create:[
              {user:{connect:{id:1}}},
              {user:{connect:{id:2}}},
              {user:{connect:{id:3}}},
              {user:{connect:{id:4}}},
              {user:{connect:{id:5}}},
              {user:{connect:{id:6}}},
              {user:{connect:{id:7}}},
            ]
          }
        },      
    });

    await prisma.gadget.create({
      data:{
        name: "Anywhere Door", 
        type: "Door",
          users: {
            create:[
              {user:{connect:{id:1}}},
              {user:{connect:{id:2}}},
              {user:{connect:{id:3}}},
              {user:{connect:{id:4}}},
              {user:{connect:{id:5}}},
              {user:{connect:{id:6}}},
              {user:{connect:{id:7}}},
            ]
          }
        },      
    });

    await prisma.gadget.create({
      data:{
        name: "Gravity Paint", 
        type: "Paint",
          users: {
            create:[
              {user:{connect:{id:1}}},
              {user:{connect:{id:2}}},
              {user:{connect:{id:5}}},
              {user:{connect:{id:6}}},
              {user:{connect:{id:7}}},
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
