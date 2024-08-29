import { Product } from 'src/modules/product/entities/product.entity';

const productFactory = async (productData: any): Promise<Product> => {
  const product = new Product();

  return product;
};

export default productFactory;
