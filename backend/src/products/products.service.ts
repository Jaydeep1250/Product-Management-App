import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productRepo.find({
        where: [{ name: ILike(`%${search}%`) }, { description: ILike(`%${search}%`) }],
      });
    }
    return this.productRepo.find();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.delete(id);
  }
}
