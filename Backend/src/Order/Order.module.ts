import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './Order.entity';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';
import { UserService } from 'src/User/User.service';
import { UserEntity } from 'src/User/User.entity';



@Module({
  imports: [
   
    TypeOrmModule.forFeature([
      OrderEntity,UserEntity
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService,UserService],
})
export class OrderModule {}