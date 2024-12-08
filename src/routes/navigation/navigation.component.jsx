import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NaviLink, NaviLinks } from "./navigation.styles";
import { signOutStart } from "../../store/user/user.action";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutUser = () => dispatch(signOutStart());

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'> 
            <CrwnLogo className="logo"/>
          </LogoContainer>  
          <NaviLinks>
            <NaviLink to='/shop'>
              SHOP
            </NaviLink>
            {
              currentUser ? (
                <NaviLink as='span' onClick={signOutUser} >
                  SIGN OUT
                </NaviLink>  )
                : (
                <NaviLink to='/auth'>
                  SIGN IN
                </NaviLink>)
            }
            <CartIcon/>
            
          </NaviLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  
  } 

export default Navigation;