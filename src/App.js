import './App.css';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';



function App() {

  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(0);

  const fetchProducts = async () => {
    try {
      const data = await fetch('https://dummyjson.com/products?limit=200');
      const json = await data.json();

      setProducts(json.products);
    } catch (error) {

    }
  }

  const SHOW_NUMBER = 10;
  const numberOfPages = Math.ceil(products.length / SHOW_NUMBER);

  let start = activePage * SHOW_NUMBER;
  let end = start + SHOW_NUMBER;

  const onClickHandle = (e) => {
    setActivePage(e);
  }

  const goToNextPage = () =>{
    setActivePage((prevState)=> prevState + 1)
  }

  const goToPrevPage = () =>{
    setActivePage((prevState)=> prevState - 1)
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className='page-container'>
        <button
          disabled={activePage === 0}
          className='page-btn'
          onClick={goToPrevPage}
        >◄</button>
        {
          [...Array(numberOfPages).keys()].map((n) => <p className={`page-num ' ${(activePage === n) ? 'active' : ''}`} key={n}
            onClick={() => { onClickHandle(n) }}>{n + 1}</p>)
        }
        <button
          disabled={activePage === numberOfPages - 1}
          className='page-btn'
          onClick={goToNextPage}
        >►</button>
      </div>

      <div className='product-container'>
        {
          products.slice(start, end).map((p) => <ProductCard key={p.id} productImage={p.thumbnail} productTitle={p.title} />)
        }
      </div>
    </div>
  );
}

export default App;
