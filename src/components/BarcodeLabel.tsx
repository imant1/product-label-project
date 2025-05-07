import { useEffect, useRef } from 'react';
import type { Product } from '../types';

interface BarcodeLabelProps {
  product: Product;
  index: number;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JsBarcode: any;
  }
}

export const BarcodeLabel = ({ product, index }: BarcodeLabelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && window.JsBarcode) {
      window.JsBarcode(canvasRef.current, product.sku, {
        height: 36,
        displayValue: false,
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