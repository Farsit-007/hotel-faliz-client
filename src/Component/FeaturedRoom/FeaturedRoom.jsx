import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import '../FeaturedRoom/Sub.css'
import { Link } from 'react-router-dom';
import { MdOutlineSell } from 'react-icons/md';

const FeaturedRoom = () => {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`https://server-navy-two-99.vercel.app/featured-room`)
            setRooms(data)
        }
        getData()
    }, [])


    const breakpoints = {

        320: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        1024: {
            slidesPerView: 3,
        },
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div className='max-w-6xl mx-auto'>
            <div className="text-center my-10">
                <h1 className="text-3xl text-[#cfaf45] md:text-5xl">Featured Rooms</h1>
            </div>

            <Swiper

                breakpoints={breakpoints}
                spaceBetween={30}
                loop={true}
                pagination={pagination}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }} modules={[Pagination, Autoplay]}
                className="mySwiper"
            >

                <div className='grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                    {
                        rooms.filter(room1 => room1.availability === 'Available').map(room => <SwiperSlide className='py-10 px-5 md:px-0' key={room._id}>
                            <div className="relative">
                                <div className=" text-center border flex flex-col gap-2  p-2 ">
                                    <div className="relative">
                                        <figure className="" style={{ height: '250px', width: '100%', overflow: 'hidden' }}>

                                            <img
                                                src={room.images}
                                                alt={room.name}
                                                className="block object-cover h-full w-full  transition-opacity duration-500 hover:opacity-75"
                                            />
                                            <div className="absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100">
                                                <div className="text-white text-center p-4">
                                                    <p className="text-lg font-bold">{room.name}</p>
                                                </div>
                                            </div>

                                        </figure>
                                        <div className="absolute top-3 left-3">
                                            <div className="badge badge-ghost bg-[#cfaf45] border-none font-semibold text-white text-md "><MdOutlineSell /> {room.price_per_night}  || Night</div>
                                        </div>
                                    </div>

                                    <div className=" text-center">

                                        <div className=" p-2 text-slate-300">
                                            <p>{room.description}</p>
                                        </div>
                                    </div>

                                    <div className="card-actions justify-center w-full my-2 items-end mr-3">
                                        <Link  to={`/roomsdetails/${room._id}`}>
                                            <button className="bg-transparent  text-lg font-bold border border-[#cfaf45] text-[#cfaf45]  p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] transition-all duration-1000">
                                                Book Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>)
                    }
                </div>

            </Swiper>
        </div>
    );
};

export default FeaturedRoom;