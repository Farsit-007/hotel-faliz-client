import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdReviews } from "react-icons/md";
import { Link, ScrollRestoration } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async (minPrice, maxPrice) => {
        try {
            let url = 'https://assignment-11-server-gamma-ivory.vercel.app/featured-room';
            if (minPrice && maxPrice) {
                url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
            } else if (minPrice) {
                url += `?minPrice=${minPrice}`;
            } else if (maxPrice) {
                url += `?maxPrice=${maxPrice}`;
            }

            const { data } = await axios.get(url);
            setRooms(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        const minPrice = e.target.minPrice.value;
        const maxPrice = e.target.maxPrice.value;
        getData(minPrice, maxPrice);
    };

    const handleReset = () => {
        getData();
    };

    return (
        <div className="bg-[#18181b]">
            <Helmet>
                <title>HoTel FaLiz | Rooms</title>
            </Helmet>
            <>
                {rooms.length === 0 && (
                    <style>
                        {`
                                .section-no-cards {
                                    margin-bottom: 70px;
                                }
                            `}
                    </style>
                )}
                <section className="bg-cover max-h-[300px] bg-slate-50" style={{ backgroundImage: `url(https://i.postimg.cc/50T5LpKq/view-romantic-castle-bedroom.webp)` }}>
                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                        <h1 className="text-4xl mt-8 md:mt-0 font-bold leading-none sm:text-7xl xl:max-w-3xl text-white playfair">Rooms</h1>
                    </div>
                </section>


                <div className="flex justify-center my-10 section-no-cards">
                    <form onSubmit={handleFilter} className="mb-4">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input type="text" name="minPrice" placeholder="Min Price" className=" p-2 " />
                                <input type="text" name="maxPrice" placeholder="Max Price" className=" p-2 " />
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <button type="submit" className="bg-transparent  text-lg font-bold border border-[#cfaf45] text-[#cfaf45]  p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] px-4 transition-all duration-1000 ">Filter</button>
                                <button type="button" onClick={handleReset} className="bg-transparent  text-lg font-bold border border-[#cfaf45] text-[#cfaf45]  p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] px-4 transition-all duration-1000 ">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>




                {loading ? (
                    <div className="flex flex-col justify-start items-center ">
                        <span className="loading loading-spinner loading-lg"></span>
                        <div className="spinner-border text-[#b70050]"></div>
                    </div>
                ) : (
                    <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                        {rooms.filter(room1 => room1.availability === 'Available').map(room => (
                            <div className="relative" key={room._id}>
                                <Link to={`/roomsdetails/${room._id}`}>
                                    <div data-aos="fade-up"
                                        data-aos-duration="1000" className="card text-center flex flex-col gap-2 card-compact p-2 ">
                                        <div className="relative">
                                            <figure className="" style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                                                <img
                                                    src={room.images}
                                                    alt={room.name}
                                                    className="block object-cover h-full w-full transition-opacity duration-500 hover:opacity-75"
                                                />
                                                <div className="absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100">
                                                    <div className="text-white text-center p-4">
                                                        <p className="text-2xl font-bold">{room.name}</p>
                                                    </div>
                                                </div>
                                            </figure>

                                            <div className="absolute bottom-3 left-3">
                                                <div className=" flex gap-1 items-center border-none  text-[#cfaf45] text-3xl font-bold">
                                                    $ {room.price_per_night} || Night
                                                </div>
                                            </div>
                                            <div className="absolute bottom-3 right-3">
                                                <div className="badge p-4 flex gap-2 items-center badge-ghost bg-[#cfaf4594] border-none font-semibold text-white text-2xl">
                                                    <MdReviews size={25} />  {room.Review_Count}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}


            </>
            <ScrollRestoration />
        </div>
    );
};

export default Rooms;
