'use client'
import Link from "next/link";
import { closeCatalogMenu, closeMenu, openCatalogMenu, openMenu } from "@/context/madals";
import { useLang } from "@/hooks/useLang"
import { addOverFlowHiddenFromBody } from "@/lib/utils/common";


const MobileNavbar = () => {
    const { lang, translations } = useLang();
    const handlOpenMenu = () => {
        addOverFlowHiddenFromBody()
        openMenu()
        closeCatalogMenu();
    }
    const handlOpenCatalogMenu = () => {
        addOverFlowHiddenFromBody()
        openCatalogMenu()
        closeMenu()
    }
  return (
    <div className="mobile-navbar">
      <Link href = '/' className="mobile-navbar__btn">
        {translations[lang].breadcrumbs.main}
      </Link>
      <button className="btn-reset mobile-navbar__btn" onClick={handlOpenCatalogMenu}>
      {translations[lang].breadcrumbs.catalog}
      </button>
      <Link className="mobile-navbar__btn" href="/favorites">
        {translations[lang].breadcrumbs.favorites}
      </Link>
      <Link className="mobile-navbar__btn" href="/cart">
        {translations[lang].breadcrumbs.cart}
      </Link>
      <button className="btn-reset mobile-navbar__btn" onClick={handlOpenMenu}>
        {translations[lang].common.more}
      </button>
    </div>
  )
}

export default MobileNavbar