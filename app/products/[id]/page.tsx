import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';
import { products, type Product } from '../data';

async function getProduct(id: string): Promise<Product | undefined> {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 100));
  return products.find(p => p.id === parseInt(id, 10));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
