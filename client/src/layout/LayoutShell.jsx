import NavBar from "../components/Navbar";

export default function LayoutShell({children}){
    return(
        <div className="layout">
            <header>
                <NavBar />
            </header>
            <main className="main">{children}</main>
            <footer className="footer">Footer</footer>
        </div>
    )
}