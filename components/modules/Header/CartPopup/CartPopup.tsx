import Link                         from "next/link"
import CartPopupItem                from "./CartPopupItem"
import { getCartItemsFx }           from "@/api/cart"
import { withClickOutside }         from "@/components/hocs/withClickOutside"
import { useCartByAuth }            from "@/hooks/useCartByAuth"
import { useLang }                  from "@/hooks/useLang"
import { IWrappedComponentProps }   from "@/types/hocs"
import { useUnit }                  from "effector-react"
import { AnimatePresence, motion }  from "framer-motion"
import { forwardRef }               from "react"
import { FontAwesomeIcon }          from "@fortawesome/react-fontawesome"
import { faSpinner }                from "@fortawesome/free-solid-svg-icons"
import { useTotalPrice }            from "@/hooks/useTotalPrice"
import { formatPrice } from "@/lib/utils/common"

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({open, setOpen}, ref) => {
        const { lang, translations } = useLang()
        const handleShowPopup        = () => setOpen(true)
        const handleHidePopup        = () => setOpen(false)
        const spinner                = useUnit(getCartItemsFx.pending)
        const currentCartByAuth      = useCartByAuth()
        const { animatedPrice }      = useTotalPrice()



        return (
            <div className="cart-popup" ref={ref}>
                <Link
                    className='header__links__item__btn header__links__item__btn--cart'
                    href='/cart'
                    onMouseEnter={handleShowPopup}
                >
                    {!!currentCartByAuth.length && <span className='not-empty' />}
                </Link>
                <AnimatePresence>
                    {open && (
                        <motion.div 
                            initial = {{ opacity: 0, scale: 0}}
                            animate = {{ opacity: 1, scale: 1}}
                            exit    = {{ opacity: 0, scale: 0}}
                            className="cart-popup__wrapper"
                            onMouseLeave={handleHidePopup}
                        >
                            <span className="cart-popup__arrow" />
                            <button 
                                className="btn-reset cart-popup__close"
                                onClick={handleHidePopup}
                            />
                            <h3 className="cart-popup__title">
                                {translations[lang].breadcrumbs.cart}
                            </h3>


                            {spinner ? (
                                <div className='cart-popup__spinner'>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    color='#fff'
                                    size='3x'
                                />
                                </div>
                                ) : (
                                <ul className='list-reset cart-popup__cart-list'>
                                <AnimatePresence>
                                    {currentCartByAuth.length ? (
                                    currentCartByAuth.map((item) => (
                                        <motion.li
                                        key={item._id || item.clientId}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='cart-list__item'
                                        >
                                        <CartPopupItem item={item} />
                                        </motion.li>
                                    ))
                                    ) : (
                                    <li className='cart-popup__cart-list__empty-cart' />
                                    )}
                                </AnimatePresence>
                                </ul>
                            )}


                            <div className="cart-popup__footer">
                                <div className="cart-popup__footer__inner">
                                    <span>{translations[lang].common.order_price}</span>
                                    <span>{formatPrice(animatedPrice)} ₽</span>
                                </div>
                                <Link href='/order' className="cart-popup__footer__link">
                                    {translations[lang].breadcrumbs.order}
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)
CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)