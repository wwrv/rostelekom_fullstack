'use client'

import Link from "next/link"
import { openMenu } from "@/context/modals"
import { openSearchModall } from "@/context/modals"

import { addOverFlowHiddenFromBody, handleOpenAuthPopup } from "@/lib/utils/common"
import { useLang } from "@/hooks/useLang"
import Menu from "./Menu"
import Logo from "@/components/elements/Logo/Logo"

import '../../../app/globalStyles/header.css'
import CartPopup from "./CartPopup/CartPopup"


const Header = () => {
  const { lang, translations } = useLang();


  
  const handlOpenMenu = () => {
    openMenu()
    addOverFlowHiddenFromBody()
  }
  const handleOpenSearchModal = () => {
    openSearchModall()
    addOverFlowHiddenFromBody()
  }

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
            <button className="btn-reset header__links__item__btn header__links__item__btn--profile"
            onClick={handleOpenAuthPopup}/>
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

