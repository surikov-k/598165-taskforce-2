import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.skill.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Клининг',
      tasks: {
        create: [
          {
            clientId: '638dac5ca3a0dafd519c1827',
            title: 'Убрать квартиру после вписки',
            description: 'Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum',
            dueDate: new Date('2022-12-20'),
            budget: 2500,
            address: 'Новый Арбат, 23, к. 1',
          }
        ]
      }
    }
  })

  await prisma.skill.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Переводы',
      tasks: {
        create: [
          {
            clientId: '638dac5ca3a0dafd519c1827',
            title: 'Перевести войну и мир на клингонский',
            description: 'Countless powerdrains will be lost in ionic cannons like cores in sonic showers ',
            dueDate: new Date('2022-12-22'),
            budget: 3400,
            address: 'улица Генерала Рычагова, 18, к. 22',
            replies: {
              create: [
                {
                  userId: '638dac5ca3a0dafd519c1828',
                  comment: 'Могу сделать всё в лучшем виде. У меня есть необходимый опыт и инструменты.',
                  budget: 3700,
                }
              ]
            },
            tags: {
              create: [
                {
                  name: 'startrack'
                }
              ]
            }
          }
        ]
      }
    }
  })

  await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create: {
      contractorId: `638dac5ca3a0dafd519c1828`,
      taskId: 1,
      text: `Кумар сделал всё в лучшем виде. Буду обращаться к нему в будущем, если возникнет такая необходимость!`,
      rating: 4,
    }
  });

  console.log('🤘 Database was filled');
}

fillDb().then(async () => {
  await prisma.$disconnect();
})
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1)
  })
