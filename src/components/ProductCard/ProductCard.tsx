'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import styles from './ProductCard.module.scss';
import { useAuthStore } from '@/store/authStore';
import { Button } from '../Button/Button';

export function ProductCard({ product, priority }: { product: Product; priority: boolean }) {
  const { isAuth } = useAuthStore();

  const category = product.category.toUpperCase();

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          priority={priority}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      {/*Уровень h тут зависит от иерархии заголовков, ставлю h5 т.к. это тестовое и тут нет всего контекста, в реальном проекте нужно ставить так, чтобы не нарушать иерархию*/}
      <h5 className={styles.title}>{product.title}</h5>{' '}
      <span className={styles.category}>{category}</span>
      <data value={product.price} className={styles.price}>
        ${product.price}
      </data>
      {isAuth ? <Button text="Add to cart" /> : <div className={styles.emptyBox}></div>}
    </article>
  );
}
