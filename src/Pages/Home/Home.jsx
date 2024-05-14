import { useEffect, useState } from "react";
import Banner from "../../Component/Banner/Banner";
import FeaturedRoom from "../../Component/FeaturedRoom/FeaturedRoom";
import Map from "../../Component/Map/Map";
import NewsLetter from "../../Component/NewsLetter/NewsLetter";
import Review from "../../Component/Review/Review";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 2000);
        return () => clearTimeout(timer); 
    }, []); 

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div >
            <Banner></Banner>
            <Map></Map>
            {showModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
                        <div className="text-center">
                            <h3 className="text-lg py-4 font-semibold leading-6 text-gray-900">Reservations Date</h3>
                  
                        </div>
                         <div>
                            <button onClick={closeModal}>Close</button>
                         </div>
                    </div>
                </div>
            )}
            <NewsLetter></NewsLetter>
            <FeaturedRoom></FeaturedRoom>
            <Review></Review>
        </div>
    );
};

export default Home;