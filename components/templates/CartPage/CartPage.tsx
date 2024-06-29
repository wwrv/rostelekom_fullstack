'use client'
import HeadingWithCount              from '@/components/elements/HeadingWithCount/HeadingWithCount'
import Breadcrumbs                   from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs }            from '@/hooks/useBreadcrumbs'
import { useCartByAuth }             from '@/hooks/useCartByAuth'
import { useLang }                   from '@/hooks/useLang'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import styles                        from '@/styles/cart-page/index.module.scss'



const CartPage = () => {
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
            </div>
        </section>
    </main>
  )
}

export default CartPage