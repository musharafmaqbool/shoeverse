import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { products, categories, brands, searchProducts, getProductsByCategory } from '../data/products';
import ShoeCard from '../components/ShoeCard';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const ProductsContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 12px 45px 12px 15px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 16px;
  width: 300px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &::placeholder {
    color: #888;
  }

  @media (max-width: 768px) {
    width: 250px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  color: #888;
  font-size: 16px;
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  background-color: #1a1a1a;
  border: 2px solid #333;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffffff;
    background-color: #333;
  }
`;

const FiltersPanel = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterSection = styled.div`
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
    color: #ffffff;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterOption = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  border: 2px solid #333;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    border-color: #ffffff;
    background-color: ${props => props.active ? '#ffffff' : '#333'};
  }
`;

const ClearFiltersButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  color: #ff6b6b;
  border: 2px solid #ff6b6b;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #ff6b6b;
    color: #ffffff;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #888;
  font-size: 1.2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  border: 2px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffffff;
    background-color: ${props => props.active ? '#ffffff' : '#333'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #888;
  font-size: 14px;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  background-color: #1a1a1a;
  border: 2px solid #333;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'all');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        matchesPrice = product.discountedPrice >= min && product.discountedPrice <= max;
      } else {
        matchesPrice = product.discountedPrice >= min;
      }
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.discountedPrice - b.discountedPrice;
      case 'price-high':
        return b.discountedPrice - a.discountedPrice;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedBrand !== 'all') params.set('brand', selectedBrand);
    if (priceRange !== 'all') params.set('price', priceRange);
    if (sortBy !== 'name') params.set('sort', sortBy);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy, setSearchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setSortBy('name');
  };

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-5000', label: 'Under ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: '10000-15000', label: '₹10,000 - ₹15,000' },
    { value: '15000-', label: 'Above ₹15,000' }
  ];

  return (
    <ProductsContainer>
      <Header>
        <Title>All Products</Title>
        <SearchContainer>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
          </SearchBox>
          <FilterButton onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            <FaFilter />
            Filters
          </FilterButton>
        </SearchContainer>
      </Header>

      <FiltersPanel isOpen={isFiltersOpen}>
        <FilterSection>
          <h3>Categories</h3>
          <FilterOptions>
            {categories.map(category => (
              <FilterOption
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </FilterOption>
            ))}
          </FilterOptions>
        </FilterSection>

        <FilterSection>
          <h3>Brands</h3>
          <FilterOptions>
            <FilterOption
              active={selectedBrand === 'all'}
              onClick={() => setSelectedBrand('all')}
            >
              All Brands
            </FilterOption>
            {brands.map(brand => (
              <FilterOption
                key={brand}
                active={selectedBrand === brand}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </FilterOption>
            ))}
          </FilterOptions>
        </FilterSection>

        <FilterSection>
          <h3>Price Range</h3>
          <FilterOptions>
            {priceRanges.map(range => (
              <FilterOption
                key={range.value}
                active={priceRange === range.value}
                onClick={() => setPriceRange(range.value)}
              >
                {range.label}
              </FilterOption>
            ))}
          </FilterOptions>
        </FilterSection>

        <ClearFiltersButton onClick={clearFilters}>
          <FaTimes />
          Clear All Filters
        </ClearFiltersButton>
      </FiltersPanel>

      <ResultsInfo>
        <span>
          Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} products
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Sort by:</span>
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </SortSelect>
        </div>
      </ResultsInfo>

      {paginatedProducts.length > 0 ? (
        <>
          <ProductsGrid>
            {paginatedProducts.map(product => (
              <ShoeCard key={product.id} shoe={product} />
            ))}
          </ProductsGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PageButton
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ))}
              
              <PageButton
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      ) : (
        <NoResults>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </NoResults>
      )}
    </ProductsContainer>
  );
};

export default Products; 