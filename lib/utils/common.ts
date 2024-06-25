import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth';
import { setCurrentProduct } from '@/context/goods';
import { closeSearchModal, closeSizeTable, showQuickViewModal, showSizeTable } from '@/context/modals'
import { setSizeTableSizes } from '@/context/sizeTable';
import { loginCheck } from '@/context/user';
import { ICartItem } from '@/types/cart';
import { IProduct } from '@/types/common';
import { EventCallable } from 'effector';
import toast from 'react-hot-toast';

export const removeOverFlowHiddenFromBody = () => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.remove('overflow-hidden')
};

export const addOverFlowHiddenFromBody = ( paddingRight = '') => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.add('overflow-hidden')
    paddingRight && (body.style.paddingRight = paddingRight)
}
export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}

export const getWindowWidth = () => {
  const { innerWidth:windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }
  
   return { windowWidth }
}
export const handleCloseSearchModal = () => {
  closeSearchModal()
  removeOverFlowHiddenFromBody()
}

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const formatPrice = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export const closeSizeTableByCheck = (showQuickViewModal: boolean) => {
  if(!showQuickViewModal) {
    removeOverFlowHiddenFromBody()
  }
  closeSizeTable()
}

export const handleOpenAuthPopup = () => {
  addOverFlowHiddenFromBody()
  openAuthPopup()
}

export const handleCloseAuthPopup = () => {
  removeOverFlowHiddenFromBody()
  closeAuthPopup()
}


export const closeAuthPopupWhenSomeModalOpened = (
  showQuickViewModal: boolean,
  showSizeTable: boolean
  ) => {
    if (showQuickViewModal || showSizeTable) {
      closeAuthPopup()
      return
      }
      
      handleCloseAuthPopup()
    }
    

export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)
  if(!auth?.accessToken) {
    setIsAuth(false)
    return false
  }
  return true
}

export const triggerLoginCheck = () => {
  if(!isUserAuth()) {
    return
  }
  const auth = JSON.parse(localStorage.getItem('auth') as string)
  loginCheck({ jwt: auth.accessToken })
}

export const isItemInList = (array: ICartItem[], productId: string) =>
  array.some((item) => item.productId === productId)


export const handleShowSizeTable = (product: IProduct) => {
  setCurrentProduct(product)
  setSizeTableSizes({ sizes: product.sizes, type: product.type })
  addOverflowHiddenToBody()
  showSizeTable()
}

export const getCartItemCountBySize = (
  cartItems: ICartItem[],
  currentSize: string
) => 
  cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())
  ?.count || 0

  
export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  event: EventCallable<T>,
  message: string,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string);

  if (!items) {
    items = []
  }
  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )
  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)
}