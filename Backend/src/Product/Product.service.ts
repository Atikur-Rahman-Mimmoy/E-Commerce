import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { DiscountEntity } from './Discount/Discount.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) { }
  getHello(): string {
    return 'Hello Product!';
  }
  async SearchByID(Id: number): Promise<ProductEntity | null> {
    let productEntity = await this.productRepo.findOne({ where: { Id } });
    if (productEntity != null) {
      return productEntity;
    }
    return null;
  }
  async Search(): Promise<ProductEntity[] | null> {
    let productEntity = await this.productRepo.find();
    if (productEntity.length>= 0) {
      return productEntity;
    }
    return null;
  }
  
  
  async SearchByCategoryID(categoryId: number): Promise<ProductEntity[] | null> {
    let productEntities = await this.productRepo.find({ where: { category: { Id: categoryId } } });
    if (productEntities.length > 0) {
      return productEntities;
    }
    return null;
  }


  async addProduct(productData: Partial<ProductEntity> ): Promise<ProductEntity | boolean> {
    try {  
      const ProductDetails = await this.productRepo.save(productData);
      
      if (ProductDetails != null) {
        return ProductDetails;
      }
    
    } catch (error) {
      console.error("Error saving product details:", error.message);
      throw new InternalServerErrorException('Error saving product details');
    }
    

  
  }
}
