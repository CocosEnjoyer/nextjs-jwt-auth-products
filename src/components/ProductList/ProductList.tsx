import { productService } from '@/services/productService';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import styles from './ProductList.module.scss';

export async function ProductList() {
  try {
    const products = await productService.getProducts();
    return (
      <div className={styles.productsContainer}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to load products:', error);
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }
}
