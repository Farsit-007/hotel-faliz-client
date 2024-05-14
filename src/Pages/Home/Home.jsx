import { useEffect, useState } from "react";
import Banner from "../../Component/Banner/Banner";
import FeaturedRoom from "../../Component/FeaturedRoom/FeaturedRoom";
import Map from "../../Component/Map/Map";
import NewsLetter from "../../Component/NewsLetter/NewsLetter";
import Review from "../../Component/Review/Review";
import popup from '../../assets/Brown Simple Minimalist Hotel Promo Instagram Post.png'
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
        <div className="bg-[#18181b]">
            <Banner></Banner>
            <FeaturedRoom></FeaturedRoom>
            <Map></Map>
            {showModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-md my-8 mx-auto rounded-xl" >
                        <img className="rounded-xl mx-auto w-[80%] md:w-[100%]" src={popup} alt="" />
                        <div className="absolute top-0 right-12 md:top-2 md:right-2">
                            <button onClick={closeModal} className="text-white font-extrabold">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <NewsLetter></NewsLetter>

            <Review></Review>
        </div>
    );
};

export default Home;