import { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BarcodePreview } from './components/BarcodePreview'
import type {  Product } from './types'
import { LabelOptions } from './types'
import './App.css'
import { useOptions } from './lib/context/options-context'
import { BarcodeParamsRender } from './components/BarcodeParamsRender'

function InputPage() {
  const [input, setInput] = useState('')
	const {selectedOption, setSelectedOption} = useOptions();

  const products: Product[] = useMemo(() => {
    return input
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [title, variant, sku, stockStr, price] = line.split('\t').map(s => s.trim())
        const stock = stockStr ? parseInt(stockStr, 10) : 1
        return { title, variant, sku, stock, price }
      })
  }, [input])

  const handlePreview = () => {
    const previewWindow = window.open('/preview', '_blank')
    if (previewWindow) {
      previewWindow.onload = () => {
        previewWindow.postMessage({ products, selectedOption }, '*')
      }
    }
  }

  return (
    <div className="app">
			<div className='option-select-container'>
			<label htmlFor="option-select">Tipo de etiqueta:</label>
			<select className="option-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value as LabelOptions)}>
				{
					Object.values(LabelOptions).map(option => (
						<option key={option} value={option}>
							{option.charAt(0).toUpperCase() + option.slice(1)}
						</option>
					))
				}
			</select>

			</div>
      <div className="input-section">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter product data (one per line, using tab as separator): title  variant  sku  stock"
          rows={10}
        />
        <button onClick={handlePreview} className="preview-button">
          Open Preview
        </button>
      </div>
    </div>
  )
}

function PreviewPage() {
  const [products, setProducts] = useState<Product[]>([])
	const { setSelectedOption} = useOptions();


  window.addEventListener('message', (event) => {
    if (event.data.products) {
      setProducts(event.data.products)
			setSelectedOption(event.data.selectedOption);
    }
  })

  return <BarcodePreview products={products} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/params" element={<BarcodeParamsRender />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
