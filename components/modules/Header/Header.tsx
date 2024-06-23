'use client'

import Link from "next/link"
import { openMenu } from "@/context/modals"
import { openSearchModall } from "@/context/modals"

import { addOverFlowHiddenFromBody, handleOpenAuthPopup, triggerLoginCheck } from "@/lib/utils/common"
import { useLang } from "@/hooks/useLang"
import Menu from "./Menu"
import Logo from "@/components/elements/Logo/Logo"

import '../../../app/globalStyles/header.css'
import CartPopup from "./CartPopup/CartPopup"
import HeaderProfile from "./HeaderProfile"
import { useUnit } from "effector-react"
import { $isAuth } from "@/context/auth"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { loginCheckFx } from "@/api/auth"
import { useEffect } from "react"
import { $user } from "@/context/user"
import { useCartByAuth } from "@/hooks/useCartByAuth"
import { addProductsFromLSToCart, setCartFromLS } from "@/context/cart"
import { setLang } from "@/context/lang"


const Header = () => {
  const isAuth = useUnit($isAuth)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const { lang, translations } = useLang();
  const user = useUnit($user)
  const currentCartByAuth = useCartByAuth()
  console.log(currentCartByAuth)

  const handlOpenMenu = () => {
    openMenu()
    addOverFlowHiddenFromBody()
  }
  const handleOpenSearchModal = () => {
    openSearchModall()
    addOverFlowHiddenFromBody()
  }

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const cart = JSON.parse(localStorage.getItem('cart') as string)

    if(lang) {
      if(lang === 'ru' || lang === 'en'){
        setLang(lang)
      }
    }

    if(cart) {
      setCartFromLS(cart)
    }
    triggerLoginCheck()
  }, [])

  useEffect(() => {
    
    if(isAuth) {

      const auth       = JSON.parse(localStorage.getItem('auth') as string)
      const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)

      if(cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }
    }
  }, [isAuth])

  return (
    <header className="header">

      <div className="container header__container">
        <button className="btn-reset header__burger" onClick={handlOpenMenu}>
            {translations[lang].header.menu_btn}
        </button>
        <Menu />
        <div className="header__logo"> 
          <Logo /> 
        </div>
      <ul className="header__links list-reset">
        <li className="header__links__item">
            <button 
              className="btn-reset header__links__item__btn header__links__item__btn--search" 
              onClick={handleOpenSearchModal}
            />
        </li>
        <li className="header__links__item">
            <Link href='/favorites' className="header__links__item__btn header__links__item__btn--favorites"/>
        </li>
        <li className="header__links__item">
            <Link href='/comparison' className="header__links__item__btn header__links__item__btn--compare"/>
        </li>
        <li className="header__links__item">
            <CartPopup />
        </li>
        <li className="header__links__item header__links__item--profile">
          {isAuth ? (
              <HeaderProfile />
            ) : loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <button
                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                onClick={handleOpenAuthPopup}
              />
          )}
        </li>
      </ul>
      </div>
    </header>
  )
}

export default Header
function openSearchModal() {
  throw new Error("Function not implemented.")
}

