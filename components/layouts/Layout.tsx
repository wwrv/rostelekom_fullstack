import Header from '../modules/Header/Header'

const Layout = ({ children }: {
    children: React.ReactNode
}) => {
  return (
    <>
      <Header />
      {children}
      <div className=''></div>
    </>
  )
}

export default Layout
