import {
  CategoryPreviewContainer,
  LinkTitle,
  Preview,
} from './category-preview.styles';

import ProductCard from '../../components/product-card/product-card.component';

const CategoryPreview = ({ products, title }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <LinkTitle to={title}>{title.toUpperCase()}</LinkTitle>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
