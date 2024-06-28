'use client'

import { useUnit }                                                                                     from "effector-react"
import { Toaster }                                                                                     from "react-hot-toast"
import { EarthoOneProvider }                                                                           from '@eartho/one-client-react'
import { $showQuickViewModal, $showSizeTable, closeQuickViewModal, showQuickViewModal, showSizeTable } from "@/context/modals"
import Layout                                                                                          from "./Layout"
import { closeSizeTableByCheck, handleCloseAuthPopup, removeOverFlowHiddenFromBody }                   from "@/lib/utils/common"
import { $openAuthPopup }                                                                              from "@/context/auth"
import { useEffect, useState }                                                                         from "react"
import { motion }                                                                                      from "framer-motion"
import CookieAlert                                                                                     from "../modules/CookieAlert/CookieAlert"
import { Next13ProgressBar }                                                                           from 'next13-progressbar'
const PageLayout = ({ children } : { children: React.ReactNode }) => {
  const [ isClient, setIsClient ]           = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
  const showQuickViewModal                  = useUnit($showQuickViewModal)
  const showSizeTable                       = useUnit($showSizeTable)
  const openAuthPopup                       = useUnit($openAuthPopup)
  
  const handleCloseQuickViewModal = () => {
    removeOverFlowHiddenFromBody()
    closeQuickViewModal()
  }
  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)
  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=Rostelecom')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true),3000)
  }, [])
  return (
    <>
      <EarthoOneProvider domain="rostelecom" clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}>
        <html lang="en">
          <body>
            <Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
          <Layout>{ children }</Layout>
          <div className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : '' } `}
          onClick={handleCloseQuickViewModal}
          />
          <div 
            className={`size-table-overlay ${showSizeTable ? 'overlay-active' : ''}`}
            onClick={handleCloseSizeTable}
          />
          <div 
            className={`auth-overlay ${openAuthPopup ? 'overlay-active' : '' }`}
            onClick={handleCloseAuthPopup}
          />
          {cookieAlertOpen && (
            <motion.div
            initial={{ opacity: 0, scale: 0.5}}
            animate={{ opacity: 1, scale: 1}}
            exit={{ opacity: 0, scale: 0.5}}
            className="cookie-popup"
            >
              <CookieAlert setCookieAlertOpen={setCookieAlertOpen}/>
            </motion.div>
          )}
            <Toaster position='top-center' reverseOrder={false}/>
          </body>
        </html>
      </EarthoOneProvider>  
    </>
  )
}

export default PageLayout
