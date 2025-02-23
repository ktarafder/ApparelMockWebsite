import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';
import { products } from '../data';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(id, 10));
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
