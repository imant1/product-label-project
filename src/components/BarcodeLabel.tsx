import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import type { Product } from '../types';

interface BarcodeLabelProps {
  product: Product;
  index: number;
}

export const BarcodeLabel = ({ product, index }: BarcodeLabelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, product.sku, {
        height: 80,
				fontSize:30,
      });
    }
  }, [product.sku]);

  return (
    <div className="barcode-item">
      <div className="product-name">
        {product.variant}, {product.title}
      </div>
      <canvas ref={canvasRef} id={`barcode-${index}`} />
    </div>
  );
}; 