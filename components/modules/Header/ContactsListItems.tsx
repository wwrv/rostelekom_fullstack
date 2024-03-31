import Link from "next/link"
import { useLang } from "@/hooks/useLang"

const ContactsListItems = () => {
    const { lang, translations } = useLang()
  return (
    <>
    <li className="nav-menu__accordion__item ">
    <a
        href='tel:+74995558293'
        className="nav-menu__accordion__item__link nav-menu__accordion__item__title">
        +7 (499) 555 82 93
    </a>
    </li>
    <li className="nav-menu__accordion__item">
    <a
        href='mailto:test@gmail.com'
        className="nav-menu__accordion__item__link ">
        Email
    </a>
    </li>
    <li className="nav-menu__accordion__item">
    <a
        href='https://t.me/wwrvvv'
        className="nav-menu__accordion__item__link ">
        {translations[lang].main_menu.tg}
    </a>
    </li>
    </>
  )
}

export default ContactsListItems
