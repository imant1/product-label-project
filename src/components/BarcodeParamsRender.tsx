import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"; // If using React Router
import { BarcodeLabel } from './BarcodeLabel';
import type { Product } from '../types';

export const BarcodeParamsRender = () => {
  const [searchParams] = useSearchParams();

  const products: Product[] = useMemo(() => {
    const raw = searchParams.get("products");
    if (!raw) return [];

    try {
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded);

      // Optional: filter valid products
      return Array.isArray(parsed) ? parsed.filter(p => p?.sku && p?.stock) : [];
    } catch (err) {
      console.error("Invalid product data in query:", err);
      return [];
    }
  }, [searchParams]);


  return (
    <div className="barcode-container">
      {products.map((product, index) => (
        <div key={`${product.sku}-${index}`} className="page">
          <BarcodeLabel product={product} index={index} withPrice={!!product.price}/>
        </div>
      ))}
    </div>
  );
};
