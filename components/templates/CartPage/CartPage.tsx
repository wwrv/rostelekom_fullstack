'use client'
import { getCartItemsFx } from '@/api/cart'
import HeadingWithCount              from '@/components/elements/HeadingWithCount/HeadingWithCount'
import Breadcrumbs                   from '@/components/modules/Breadcrumbs/Breadcrumbs'
import CartList from '@/components/modules/CartPage/CartList'
import { basePropsForMotion } from '@/constants/motion'
import { useBreadcrumbs }            from '@/hooks/useBreadcrumbs'
import { useCartByAuth }             from '@/hooks/useCartByAuth'
import { useLang }                   from '@/hooks/useLang'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { isUserAuth } from '@/lib/utils/common'
import styles                        from '@/styles/cart-page/index.module.scss'
import cartSkeletonStyles            from '@/styles/cart-skeleton/index.module.scss'
import { useUnit }                   from 'effector-react'
import { motion } from 'framer-motion'



const CartPage = () => {
  const cartSpinner                                   = useUnit(getCartItemsFx.pending)
  const currentCartByAuth                             = useCartByAuth()
  const { lang, translations }                        = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('cart')


  return (
    <main>
        <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
        />
        <section className={styles.cart}>
            <div className="container"> 
              <HeadingWithCount 
                count={countWholeCartItemsAmount(currentCartByAuth)}
                title={translations[lang].breadcrumbs.cart}
              />
              <div className={styles.cart__inner}>
                <div className={styles.cart__left}>
                  {cartSpinner && (
                    <motion.ul
                      {...basePropsForMotion}
                      className = {cartSkeletonStyles.sleleton}
                    >
                      {Array.from(new Array(3)).map((_, i) => (
                        <li
                          key={i}
                          className={cartSkeletonStyles.skeleton__item}
                        >
                          <div 
                            className={cartSkeletonStyles.skeleton__item__light}
                          />
                        </li>
                      ))}
                    </motion.ul>
                  )}
                  {!cartSpinner && (
                    <motion.ul
                      {...basePropsForMotion}
                      className={`list-reset ${styles.cart__list}`}
                    >
                      <CartList />
                    </motion.ul>
                  )}
                </div>
                <div className={styles.cart__right}>

                </div>
              </div>
            </div>
        </section>
    </main>
  )
}

export default CartPage