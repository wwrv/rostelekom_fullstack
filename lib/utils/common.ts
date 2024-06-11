import { closeAuthPopup, openAuthPopup } from '@/context/auth';
import { closeSearchModal, closeSizeTable, showQuickViewModal } from '@/context/modals'

export const removeOverFlowHiddenFromBody = () => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.remove('overflow-hidden')
};

export const addOverFlowHiddenFromBody = ( paddingRight = '') => {
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

export const handleCloseAuthPopup = () => {
  removeOverFlowHiddenFromBody()
  closeAuthPopup()
}
export const handleOpenAuthPopup = () => {
  addOverFlowHiddenFromBody()
  openAuthPopup()
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