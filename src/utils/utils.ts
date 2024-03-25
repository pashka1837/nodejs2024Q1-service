import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export async function createFav(
  prisma: PrismaClient,
  id: string,
  favsId: string,
  entityName: string,
) {
  try {
    await prisma[entityName].update({
      where: { id: id },
      data: {
        favsId: favsId,
      },
    });
  } catch {
    throw new HttpException(
      `${entityName} not found`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export async function deleteFav(
  prisma: PrismaClient,
  id: string,
  entityName: string,
) {
  try {
    await prisma[entityName].update({
      where: { id: id },
      data: {
        favsId: null,
      },
    });
  } catch {
    throw new HttpException(`${entityName} not found`, HttpStatus.NOT_FOUND);
  }
}
