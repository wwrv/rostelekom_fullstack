'use client'

import { $showQuickViewModal, closeQuickViewModal, showQuickViewModal } from "@/context/modals"
import Layout from "./Layout"
import { useUnit } from "effector-react"
import { removeOverFlowHiddenFromBody } from "@/lib/utils/common"

const PageLayout = ({ children } : { children: React.ReactNode }) => {
  
  const showQuickViewModal = useUnit($showQuickViewModal)
  
  const handleCloseQuickViewModal = () => {
    removeOverFlowHiddenFromBody()
    closeQuickViewModal()
  }

    return (
    <html lang="en">
      <body>
        <Layout>{ children }</Layout>
      </body>
      <div className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : '' } `}
      onClick={handleCloseQuickViewModal}
      />

      
    </html>
  )
}

export default PageLayout
