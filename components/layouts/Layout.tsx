'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Header from '../modules/Header/Header'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'
import './../../app/globalStyles/mobile-navbar.css'
import './../../app/globalStyles/catalog-menu.css'


const Layout = ({ children }: {
    children: React.ReactNode
}) => {
  const isMedia800 = useMediaQuery(800)
  return (
    <>
      <Header />
      {children}
      {isMedia800 && < MobileNavbar />}
      <div className=''></div>
    </>
  )
}

export default Layout
