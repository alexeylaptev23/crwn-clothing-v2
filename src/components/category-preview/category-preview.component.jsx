import { useNavigate } from 'react-router-dom';

import './category-preview.styles.scss';

import ProductCard from '../../components/product-card/product-card.component';

const CategoryPreview = ({ products, title }) => {
  const navigate = useNavigate();

  const navigateToCategoryHandler = () => {
    navigate(`/shop/${title}`);
  };
  return (
    <div className='category-preview-container'>
      <h2>
        <span className='title' onClick={navigateToCategoryHandler}>
          {title.toUpperCase()}
        </span>
      </h2>
      <div className='preview'>
        {products
          .filter((_, index) => index < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
