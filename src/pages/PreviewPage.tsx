import { useState, useEffect } from 'react';
import { BarcodePreview } from '../components/BarcodePreview';
import type { Product } from '../types';

export function PreviewPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.products) {
        setProducts(event.data.products);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <BarcodePreview products={products} />;
} 