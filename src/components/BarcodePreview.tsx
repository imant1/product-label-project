import { BarcodeLabel } from './BarcodeLabel';
import type { Product } from '../types';

interface BarcodePreviewProps {
  products: Product[];
}

export const BarcodePreview = ({ products }: BarcodePreviewProps) => {
  const expandedProducts = products.flatMap(product => 
    Array(product.stock).fill(product)
  );

  return (
    <div className="barcode-container">
      {expandedProducts.map((product, index) => (
        <div key={`${product.sku}-${index}`} className="page">
          <BarcodeLabel product={product} index={index} />
        </div>
      ))}
    </div>
  );
}; 