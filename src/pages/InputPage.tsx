import { useState, useMemo } from 'react';

export function InputPage() {
  const [input, setInput] = useState('');

  const products = useMemo(() => {
    return input
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [title, variant, sku, stockStr] = line.split(',').map(s => s.trim());
        const stock = stockStr ? parseInt(stockStr, 10) : 1;
        return { title, variant, sku, stock };
      });
  }, [input]);

  const handlePreview = () => {
    const previewWindow = window.open('/preview', '_blank');
    if (previewWindow) {
      previewWindow.onload = () => {
        previewWindow.postMessage({ products }, '*');
      };
    }
  };

  return (
    <div className="app">
      <div className="input-section">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter product data (one per line):&#10;title, variant, sku, stock"
          rows={10}
        />
        <button onClick={handlePreview} className="preview-button">
          Open Preview
        </button>
      </div>
    </div>
  );
} 