import { useDispatch, useSelector } from 'react-redux';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price } = product;
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => dispatch(addItemToCart(cartItems, product))}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
