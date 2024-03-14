import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { id: 'xxx' },
    update: {},
    create: {
      login: 'user1',
      password: '11223',
    },
  });
  const user2 = await prisma.user.upsert({
    where: { id: 'xxx' },
    update: {},
    create: {
      login: 'user2',
      password: '11223',
    },
  });

  const artist1 = await prisma.artist.upsert({
    where: { id: 'xxx' },
    update: {},
    create: {
      name: 'artist1',
      grammy: false,
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { id: 'xxx' },
    update: {},
    create: {
      name: 'artist2',
      grammy: true,
    },
  });

  const album1 = await prisma.album.upsert({
    where: { id: 'xxxx' },
    update: {},
    create: {
      name: 'album3',
      year: 2021,
      artistId: artist1.id,
    },
  });
  const album2 = await prisma.album.upsert({
    where: { id: 'xxxx' },
    update: {},
    create: {
      name: 'album2',
      year: 2022,
      artistId: artist2.id,
    },
  });

  const track1 = await prisma.track.upsert({
    where: { id: 'xxxx' },
    update: {},
    create: {
      name: 'tarck1',
      duration: 130,
      artistId: artist1.id,
      albumId: album1.id,
    },
  });

  const track2 = await prisma.track.upsert({
    where: { id: 'xxxx' },
    update: {},
    create: {
      name: 'tarck2',
      duration: 132,
      artistId: artist1.id,
      albumId: album1.id,
    },
  });

  const track3 = await prisma.track.upsert({
    where: { id: 'xxxx' },
    update: {},
    create: {
      name: 'tarck3',
      duration: 133,
      artistId: artist2.id,
      albumId: album2.id,
    },
  });

  const track4 = await prisma.track.upsert({
    where: { id: 'xxxx' },
    update: {},
    create: {
      name: 'tarck4',
      duration: 134,
      artistId: artist2.id,
      albumId: album2.id,
    },
  });
  console.log(user1, artist1, album1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
