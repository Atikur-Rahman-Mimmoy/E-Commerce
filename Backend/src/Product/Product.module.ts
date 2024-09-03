import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './Product.entity';
import { ProductController } from './Product.controller';
import { ProductService } from './Product.service';
import { DiscountEntity } from './Discount/Discount.entity';
import { DiscountModule } from './Discount/Discount.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
