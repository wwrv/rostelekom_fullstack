export const removeOverFlowHiddenFromBody = () => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.remove('overflow-hidden')
};

export const addOverFlowHiddenFromBody = () => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.add('overflow-hidden')
}

export const getWindowWidth = () => {
    const { innerWidth:windowWidth } =
      typeof window !== 'undefined' ? window : { innerWidth: 0 }
  
    return { windowWidth }
  }