import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineSell, MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    const getData = async (minPrice, maxPrice) => {
        try {
            let url = 'http://localhost:5000/featured-room';
            if (minPrice && maxPrice) {
                url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
            } else if (minPrice) {
                url += `?minPrice=${minPrice}`;
            } else if (maxPrice) {
                url += `?maxPrice=${maxPrice}`;
            }

            const { data } = await axios.get(url);
            setRooms(data);
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
        <div>
            
            <section className="bg-cover max-h-[300px] bg-slate-50" style={{ backgroundImage: `url(https://i.postimg.cc/HnPhy6QT/frame-from-plants-drawing-suplies.webp)` }}>
                <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                    <h1 className="text-4xl mt-8 md:mt-0 font-bold leading-none sm:text-7xl xl:max-w-3xl text-white playfair">Add Your Craft Items</h1>
                </div>
            </section>

           
            <div>
                <form onSubmit={handleFilter} className="mb-4">
                    <input type="text" name="minPrice" placeholder="Min Price" className="mr-2" />
                    <input type="text" name="maxPrice" placeholder="Max Price" className="mr-2" />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Filter</button>
                    <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Reset</button>
                </form>
            </div>

      
            <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {rooms.filter(room1 => room1.availability === 'Available').map(room => (
                    <div className="relative" key={room._id}>
                        <Link to={`/roomsdetails/${room._id}`}>
                            <div className="card text-center flex flex-col gap-2 card-compact p-2 bg-base-100 shadow-xl">
                                <div className="relative">
                                    <figure className="rounded-xl" style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                                        <img
                                            src={room.images}
                                            alt={room.name}
                                            className="block object-cover h-full w-full transition-opacity duration-500 hover:opacity-75"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100">
                                            <div className="text-white text-center p-4">
                                                <p className="text-lg font-bold">{room.name}</p>
                                            </div>
                                        </div>
                                    </figure>
                                    <div className="absolute top-3 left-3">
                                        <div className="badge badge-ghost bg-[#b70050] border-none font-semibold text-white text-md">
                                            <MdOutlineSell /> {room.price_per_night} || Night
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <div className="badge badge-ghost bg-[#b70050] border-none font-semibold text-white text-md">
                                        <MdReviews />  {room.Review_Count}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
