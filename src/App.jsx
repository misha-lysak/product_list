import React, { useCallback, useEffect, useState } from 'react';
import { data } from './api';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import uniqueKey from 'unique-key';

import { SelectedCard } from './components/SelectedCard';
import { ProductList } from './components/ProductList';
import { AddProduct } from './components/AddProduct';

function App() {
  const [productsList, setProductsList] = useState([]);
  const [description, setDescription] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  

  useEffect(async() => {
    setProductsList(await data())
  }, [data])

  const closeDescription = useCallback(
    () => {
      setDescription(false);
    }, []
  )

  const sortProducts = useCallback(
    (option) => {
      switch (option) {
        case 'name':
          setProductsList(prev => [...prev].sort((currItem, nextItem) => (
            currItem.name.localeCompare(nextItem.name)
          )))
          break;

        case 'count':
          setProductsList(prev => [...prev].sort((currItem, nextItem) => (
            currItem.count - nextItem.count
            )))
          break;
      
        default:
          break;
      }
    }, []
  )

  const openProduct = useCallback(
    (id) => {
      setDescription(true);
      setSelectedProduct(id);
    }, [],
  )

  return (
    <>
      <Button key={uniqueKey('button-name')} onClick={() => sortProducts('name')}>Sort by name</Button>
      <Button key={uniqueKey('button-count')} onClick={() => sortProducts('count')}>Sort by count</Button>
      <AddProduct />
      <div className="App">
        {!description && productsList.map(product => (
            <ProductList
              key={uniqueKey('card')}
              product={product}
              openProduct={openProduct}
            />
        ))}
      </div>
      {description && (
        <SelectedCard
          key={uniqueKey(123)}
          selectedProduct={selectedProduct}
          closeDescription={closeDescription}
        />
      )}
    </>
  );
}

export default App;
