import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function LayoutShell({children}){
    return(
        <>
        <div className="layout">
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="maincontent">
                <header>
                    <NavBar />
                </header>
                <main className="main">{children}</main>
            </div>
        </div>
        <footer>
                <Footer />
        </footer>
        </>
    )
}