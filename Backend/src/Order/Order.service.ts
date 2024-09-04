import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { UserService } from '../User/User.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private readonly userService: UserService,

  ) { }
  getHello(): string {
    return 'Hello Order!';
  }
  async findById(id: number): Promise<OrderEntity | null> {
    let orderEntity = await this.orderRepo.findOne({ where: { Id: id } });
    if (orderEntity != null) {
      return orderEntity;
    }
    return null;
  }

  // async addOrder(orderEntity: OrderEntity): Promise<boolean> {
  //   let Order = await this.orderRepo.save(orderEntity);
  //   if (Order != null) {
  //     return true;
  //   }
  //   return false;
  // }


  async addOrder(orderEntity: OrderEntity): Promise<any> {
    const user = await this.userService.findByEmail(orderEntity.user.email);
    
    if (!user) {
      return {
        message: 'User does not exist. Please create an account or sign up with Google.',
       
      };
    }

    if (!user.address) {
      return {
        message: 'Address missing.Please fill up Address!',
        
      };
    }
    if (!user.phone) {
      return {
        message: 'Phone number missing.Please fill up phone number!',
        
      };
    }


    const order = await this.orderRepo.save(orderEntity);

    if (order) {
      return { message: 'Order placed successfully!' };
    } else {
      throw new BadRequestException('Failed to place the order.');
    }
  }


  //   async login(loginData:OrderEntity):Promise<boolean>
  //   {
  //     let findAdmin= await this.findByUsername(loginData.username);
  //     if(findAdmin!=null && findAdmin.password==loginData.password)
  //     {
  //       return true;
  //     }

  //     return false;

  //   }
}
