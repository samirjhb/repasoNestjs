import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as UuidV4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;
    const newProduct = new Product(UuidV4(), name, description, price);
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id:_, name, description, price } = updateProductDto;

    const product = this.findOne(id);

    product.updateWith({name, description, price});
    
    return product; 
    
  }

  remove(id: string) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }
    this.products.splice(productIndex, 1);
    return `Product with id "${id}" has been removed`;
  }
}
