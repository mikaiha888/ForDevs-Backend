import { Product } from 'src/modules/core/product/entities/product.entity';

const productFactory = async (): Promise<Product> => {
  const product = new Product();

  return product;
};

export default productFactory;
