'use client'
import { $showQuickViewModal, showSizeTable } from "@/context/modals"
import { setSizeTableSizes } from "@/context/sizeTable"
import { useLang } from "@/hooks/useLang"
import { addOverFlowHiddenFromBody } from "@/lib/utils/common"
import { ISelectedSizes } from "@/types/common"
import { useUnit } from "effector-react"



    const ProductSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
    const { lang,translations } = useLang()
    const showQuickViewModal = useUnit($showQuickViewModal)

    const handleShowSizeTable = () => {
        if(!showQuickViewModal) {
            addOverFlowHiddenFromBody()
        }
        setSizeTableSizes({ sizes, type })
        showSizeTable()
    }
    return (
        <button className={`btn-reset ${className}`} onClick={handleShowSizeTable}>
            {translations[lang].product.size_table}
        </button>
    )
}

export default ProductSizeTableBtn