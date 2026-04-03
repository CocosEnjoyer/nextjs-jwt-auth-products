import { ProductList } from '@/components/ProductList/ProductList';
import styles from './page.module.scss';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className={styles.contentContainer}>
      <h2>Latest Products</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
