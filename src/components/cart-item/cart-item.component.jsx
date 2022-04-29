import { CartItemContainer, ItemDetails, InfoSpan } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <InfoSpan>{name}</InfoSpan>
        <InfoSpan>
          {quantity} x ${price}
        </InfoSpan>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
