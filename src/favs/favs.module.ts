import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [PrismaModule],
})
export class FavsModule {}
