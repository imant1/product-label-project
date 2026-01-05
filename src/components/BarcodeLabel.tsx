import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { LabelOptions, LabelOptionsCss, type Product } from '../types';

interface BarcodeLabelProps {
  product: Product;
  index: number;
  withPrice?: boolean;
}

export const BarcodeLabel = ({ product, index, withPrice }: BarcodeLabelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, product.sku, withPrice ? LabelOptionsCss[LabelOptions.SELL].skuLabel :  LabelOptionsCss[LabelOptions.WAREHOUSE].skuLabel);
    }
  }, [product.sku, withPrice]);

	let formatedPrice = product.price;
	if (formatedPrice && !Number.isNaN(Number(formatedPrice))) {
		formatedPrice = Intl.NumberFormat("es-CL", {
			currency: "CLP",
			style: "currency",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(Number(formatedPrice));
	}

  return (
    <div className="barcode-item">
      <div className="product-name">
        {product.variant}, {product.title}
      </div>

			{
				withPrice && (
				<div className="price">
					{formatedPrice}
				</div>
				)
			}
      <canvas ref={canvasRef} id={`barcode-${index}`} />
    </div>
  );
}; 