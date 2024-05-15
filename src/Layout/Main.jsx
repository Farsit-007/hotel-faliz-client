import { Outlet } from "react-router-dom";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

const Main = () => {
    return (
        <div className="font-Cormorant">
            <Header></Header>
            <div >
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;