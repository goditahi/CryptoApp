/* eslint-disable react/prop-types */
import Navbar from './Navbar'


const Layout = ({children}) => {
  return (
    <>
    <Navbar/>
    <main>
        {children}
    </main>
    </>
  )
}

export default Layout