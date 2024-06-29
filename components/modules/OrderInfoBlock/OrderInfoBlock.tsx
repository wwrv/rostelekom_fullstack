import Link                              from 'next/link'
import { useLang }                       from '@/hooks/useLang'
import { IOrderInfoBlockProps }          from '@/types/modules'
import { useCartByAuth }                 from '@/hooks/useCartByAuth'
import { useTotalPrice }                 from '@/hooks/useTotalPrice'
import { formatPrice, showCountMessage } from '@/lib/utils/common'
import { countWholeCartItemsAmount }     from '@/lib/utils/cart'
import styles                            from '@/styles/order-block/index.module.scss'
import { 
    MutableRefObject, 
    useRef, 
    useState }                           from 'react'

const OrderInfoBlock = ({
    isCorrectPromotionalCode,
    isOrderPage,
}: IOrderInfoBlockProps) => {
    const { lang, translations }        = useLang()
    const currentCartByAuth             = useCartByAuth()
    const [isUserAgree, setIsUserAgree] = useState(false)
    const { animatedPrice }             = useTotalPrice()
    const checkboxRef                   = useRef() as MutableRefObject<HTMLInputElement>

    const priceWithDiscount             = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)

    const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

    const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (e.key == ' ' || e.code == 'Space') {
          e.preventDefault()
          setIsUserAgree(!checkboxRef.current.checked)
          checkboxRef.current.checked = !checkboxRef.current.checked
        }
    }
  return (
    <div className={styles.order_block}>
        <div className={styles.order_block__inner}>
            <p className={styles.order_block__info}>
            {countWholeCartItemsAmount(currentCartByAuth)}{' '}
            {showCountMessage(
                `${countWholeCartItemsAmount(currentCartByAuth)}`,
                lang
            )}{' '}
            {translations[lang].order.worth}{' '}
            <span className={styles.order_block__info__text}>
                {formatPrice(animatedPrice)} ₽
            </span>
            </p>
            <p className={styles.order_block__info}>
                {translations[lang].order.amount_with_discounts}:{' '}
                <span className={styles.order_block__info__text}>
                    {priceWithDiscount} ₽
                </span>
            </p>
            {isOrderPage && <></>}
            <p className={styles.order_block__total}>
            <span>{translations[lang].order.total}:</span>
            <span className={styles.order_block__total__price}>
                {priceWithDiscount} ₽
            </span>
            </p>
            {isOrderPage ? (
                <button>
                </button>
            ): (
                <Link
                    href='/order'
                    className={`${styles.order_block__btn} ${
                    !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
                    }`}
                >
                    {translations[lang].order.make_order}
                </Link>
            )}
             <label className={styles.order_block__agreement}>
            <input
                className={styles.order_block__agreement__input}
                type='checkbox'
                tabIndex={-1}
                ref={checkboxRef}
                onChange={handleAgreementChange}
                checked={isUserAgree}
            />
            <span className={styles.order_block__agreement__mark} />
            <span
                className={styles.order_block__agreement__checkbox}
                tabIndex={0}
                onKeyDown={handleTabCheckbox}
            />
            <span className={styles.order_block__agreement__text}>
                {translations[lang].order.agreement_text}{' '}
                <Link
                href='/privacy'
                className={styles.order_block__agreement__link}
                >
                {translations[lang].order.agreement_link}
                </Link>
            </span>
            </label>
        </div>
    </div>
  )
}

export default OrderInfoBlock


