import { useLang } from "@/hooks/useLang"
import { handleCloseSearchModal } from "@/lib/utils/common"

const SearchModal = () => {
    console.log()
    const { lang, translations } = useLang()
    return (
        <div className="search-modal">
            <button  className="btn-reset search-modal__close" onClick={handleCloseSearchModal}/>
            <h3 className="search-modal__title">
                {translations[lang].header.search_products}
            </h3>
            <div className="search-modal__top">
                <label className="search-modal__label">
                    <input 
                        type="text" 
                        className="search-modal__input" 
                    />
                    <span className="search-modal__floating_label">
                        {translations[lang].header.search_infos}
                    </span>
                </label>
            </div>
        </div>
    )
}

export default SearchModal
