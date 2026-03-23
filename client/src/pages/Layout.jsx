/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function Layout({email}) {
    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <Navbar email={email}/>
            </header>

            <section className="flex-1 w-full pt-[72px] md:pt-[64px]">
                <Outlet />
            </section>

            <footer className='h-20 bg-teal-800 flex flex-col justify-center'>
                <h2 className='text-lg text-center text-white font-semibold'>studmatea@gmail.com</h2>
                <p className="text-center text-white text-xs">copyright all rights reserved ©</p>
            </footer>
        </div>
    )
}

export default Layout