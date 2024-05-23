'use client'

import { $showQuickViewModal, $showSizeTable, closeQuickViewModal, showQuickViewModal, showSizeTable } from "@/context/modals"
import Layout from "./Layout"
import { useUnit } from "effector-react"
import { closeSizeTableByCheck, removeOverFlowHiddenFromBody } from "@/lib/utils/common"

const PageLayout = ({ children } : { children: React.ReactNode }) => {
  
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)

  const handleCloseQuickViewModal = () => {
    removeOverFlowHiddenFromBody()
    closeQuickViewModal()
  }
  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)
    return (
    <html lang="en">
      <body>
        <Layout>{ children }</Layout>
      </body>
      <div className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : '' } `}
      onClick={handleCloseQuickViewModal}
      />
      <div className={`size-table-overlay ${showSizeTable ? 'overlay-active' : ''}`}
      onClick={handleCloseSizeTable}
      />

      
    </html>
  )
}

export default PageLayout
