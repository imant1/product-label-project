import { BarcodeLabel } from './BarcodeLabel';
import type { Product } from '../types';

interface BarcodePreviewProps {
  products: Product[];
}

export const BarcodePreview = ({ products }: BarcodePreviewProps) => {


  return (
    <div className="barcode-container">
      {products.map((product, index) => (
        <div key={`${product.sku}-${index}`} className="page">
          <BarcodeLabel product={product} index={index} withPrice={!!product.price} />
        </div>
      ))}
    </div>
  );
}; 