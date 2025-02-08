import { Outlet } from "react-router"

const Layout = () => {
    return (
        <main style={{padding: "1rem 0"}}>
          <Outlet/>
        </main>
    )
};

export default Layout;