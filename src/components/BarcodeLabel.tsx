import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { LabelOptions, LabelOptionsCss, type Product } from '../types';
import { useOptions } from '../lib/context/options-context';

interface BarcodeLabelProps {
  product: Product;
  index: number;
}

export const BarcodeLabel = ({ product, index }: BarcodeLabelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
	const { selectedOption} = useOptions();

	console.log( `Rendering barcode for SKU: ${product.sku} with option: ${selectedOption}`);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, product.sku, LabelOptionsCss[selectedOption].skuLabel);
    }
  }, [product.sku, selectedOption]);

  return (
    <div className="barcode-item">
      <div className="product-name">
        {product.variant}, {product.title}
      </div>

			{
				selectedOption === LabelOptions.SELL && (
				<div className="price">
					{product.price}
				</div>
				)
			}
      <canvas ref={canvasRef} id={`barcode-${index}`} />
    </div>
  );
}; 