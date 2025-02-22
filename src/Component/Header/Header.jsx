import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../Header/Header.css'
import { Tooltip } from 'react-tooltip'
import { AuthContext } from "../AuthProvider/AuthProvider";
import f1 from '../../assets/fav.png'
const Header = () => {
    const [active, setActive] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    window.addEventListener("scroll", function () {
        if (this.window.scrollY > 100) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    })
    const Links = < >
        <li className="text-lg mr-2 font-bold"><NavLink to='/' className={({ isActive }) => isActive ? 'text-[#cfaf45]  focus:text-[#cfaf45] nav-link  font-bold ' : 'nav-link '}>Home</NavLink></li>
        <li className="text-lg mr-2  font-bold"><NavLink to='/rooms' className={({ isActive }) => isActive ? 'text-[#cfaf45]  focus:text-[#cfaf45] nav-link  font-bold ' : 'nav-link '}>Rooms</NavLink></li>
        {
            user &&
            <>
                <li className="text-lg mr-2  font-bold"><NavLink to='/mybooking'  className={({ isActive }) => isActive ? 'text-[#cfaf45]  focus:text-[#cfaf45] nav-link  font-bold ' : 'nav-link '}>My Bookings</NavLink></li>
            </>
        }
        <li className="text-lg mr-2  font-bold"><NavLink to='/aboutus'  className={({ isActive }) => isActive ? 'text-[#cfaf45]  focus:text-[#cfaf45] nav-link  font-bold ' : 'nav-link '}>About Us</NavLink></li>
        <li className="text-lg mr-2  font-bold"><NavLink to='/contact'   className={({ isActive }) => isActive ? 'text-[#cfaf45]  focus:text-[#cfaf45] nav-link  font-bold ' : 'nav-link '}>Contact Us</NavLink></li>        
        
    </>
    const handleLogout = () => {
        logOut()
    }
    return (
        <div className="">
            <div className={` navbar py-5 lg:px-24 transition-all duration-1000 text-white z-50 fixed top-0 left-0 right-0 bg-transparent ${active ? "activecls" : ""}`}>
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#05030a] rounded-box w-52 ">
                            {Links}
                        </ul>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]">
                            <img src={f1} alt="" />
                        </div>
                        <Link to='/' className="text-xl md:text-4xl text-[#cfaf45] font-extrabold ">H<span className="text-white" >o</span>T<span className="text-white" >e</span>l F<span className="text-white" >a</span>L<span className="text-white" >i</span>z</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {Links}
                    </ul>
                </div>
                {
                user ? <div className="navbar-end pr-4 "><a id="clickable"><div className="w-[45px] cursor-pointer rounded-full ring ring-[#cfaf45] ring-offset-base-100 ring-offset-2">
                    <img className="w-full rounded-full" src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                </div></a>
                    <Tooltip className="bg-[#cfaf45] rounded-xl p-2 space-y-3" anchorSelect="#clickable" clickable>
                        <p className="text-white font-semibold" >{user?.displayName || "User Name"}</p>
                        <button className="bg-transparent text-lg font-bold  border border-[#cfaf45] text-[#cfaf45] rounded-md p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] transition-all duration-1000 w-full btn" ><Link to='/login' onClick={handleLogout} className="w-full text-white text-[16px] font-bold">Logout</Link></button>

                    </Tooltip> </div> :
                    <div className="navbar-end gap-2 md:pl-8"><Link to='/login' className=" text-[12px] p-2 md:px-6 md:text-lg font-bold bg-transparent border border-[#cfaf45] text-[#cfaf45]  flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] transition-all duration-1000">Login</Link>
                        <Link to='/register' className="text-[12px] p-2 md:px-6 md:text-lg font-bold bg-transparent border border-[#cfaf45] text-[#cfaf45]  flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] transition-all duration-1000">Register</Link></div>

                }
                

            </div>

        </div>
    );
};

export default Header;