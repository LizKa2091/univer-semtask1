import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setCategory, setSortBy, setSearchQuery } from '../features/productsSlice';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SortPanel from './SortPanel';
import SearchBar from './SearchBar';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, category, sortBy, searchQuery } = useSelector((state) => state.products);

  const [itemsPerRow, setItemsPerRow] = useState(2);

  useEffect(() => {
      dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = category === 'Все'
    ? items
    : items.filter((product) => product.category === category);

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleItemsPerRowChange = (value) => {
    setItemsPerRow(value);
  };

  if (status === 'loading') return <div>Загрузка...</div>;
  if (status === 'failed') return <div>Возникла ошибка при загрузке продуктов</div>;

  return (
    <div>
      <FilterPanel onFilterChange={(category) => dispatch(setCategory(category))} />
      <SortPanel onSortChange={(sortBy) => dispatch(setSortBy(sortBy))} onItemsPerRowChange={handleItemsPerRowChange}/>
      <SearchBar onSearchChange={(query) => dispatch(setSearchQuery(query))} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {sortedProducts.map((product) => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'center', flex: `0 0 calc(100% / ${itemsPerRow} - 16px)`, margin: '8px' }}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;