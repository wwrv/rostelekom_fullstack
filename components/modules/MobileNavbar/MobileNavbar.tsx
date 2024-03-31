'use client'
import { useLang } from "@/hooks/useLang"
import Link from "next/link";


const MobileNavbar = () => {
    const { lang, translations } = useLang();
  return (
    <div className="mobile-navbar">
      <Link href = '/' className="mobile-navbar__btn">
        {translations[lang].breadcrumbs.main}
      </Link>
      <button className="btn-reset mobile-navbar__btn">
      {translations[lang].breadcrumbs.catalog}
      </button>
      <Link className="mobile-navbar__btn" href="/favorites">
        {translations[lang].breadcrumbs.favorites}
      </Link>
      <Link className="mobile-navbar__btn" href="/cart">
        {translations[lang].breadcrumbs.cart}
      </Link>
      <button className="btn-reset mobile-navbar__btn">
        {translations[lang].common.more}
      </button>
    </div>
  )
}

export default MobileNavbar
