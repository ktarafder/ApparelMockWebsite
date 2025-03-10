import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';
import { products } from '../data';

// @ts-ignore - Next.js page props type issue
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const product = await products.find(p => p.id === parseInt(id, 10));
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
