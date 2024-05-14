import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import '../Review/Sub.css'
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaStar } from "react-icons/fa6";
const Review = () => {
    const { user } = useContext(AuthContext)
    const [revs, setRev] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`http://localhost:5000/allreview`)
            setRev(data)
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
        <div className="max-w-6xl mx-auto">
            <section className="">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                        What our <span className="text-blue-500">clients</span> say
                    </h1>

                    <p className="max-w-2xl mx-auto mt-6 text-center ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error
                        alias, adipisci rem similique, at omnis eligendi optio eos harum.
                    </p>
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

                        <div className='grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
                            {
                                revs.map(rev => <SwiperSlide className='py-10 px-5 md:px-0' key={rev._id}>

                                    <div className="pl-4 rounded-lg ">
                                        <div className="flex items-center gap-3 my-2 -mx-2">
                                            <div className="w-[45px] cursor-pointer rounded-full ring ring-[#b70050] ring-offset-base-100 ring-offset-2">
                                                <img className="w-full rounded-full" src={rev.images || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                            </div>
                                            <div className="mx-2">
                                                <div className="flex gap-10">
                                                    <h1 className="font-semibold ">{rev.name}  </h1>
                                                    <p>{new Date(rev.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    {Array.from({ length: rev.ratings }, (_, index) => (
                                                        <FaStar key={index} className="text-yellow-500" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute top-0 left-0 w-8 h-8 dark:text-gray-300">
                                            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                        </svg>
                                        <p className=" text-center py-1 text-lg italic">{rev.comment}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-300">
                                            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                        </svg>


                                    </div>
                                </SwiperSlide>)
                            }
                        </div>
                    </Swiper>

                </div>
            </section>
        </div>
    );
};

export default Review;