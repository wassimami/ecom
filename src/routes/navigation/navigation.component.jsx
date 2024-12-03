import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NaviLink, NaviLinks } from "./navigation.styles";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
   

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