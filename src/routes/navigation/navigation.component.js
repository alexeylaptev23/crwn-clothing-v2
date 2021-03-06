import React, { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from '../../store/user/user.selector';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink className='nav-link' to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' className='nav-link' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink className='nav-link' to='/auth'>
              SIGN IN
            </NavLink>
          )}
          {currentUser && currentUser.email && (
            <NavLink as='span' className='nav-link'>
              {currentUser.email}
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
