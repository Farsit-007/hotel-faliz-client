import { CiLogin, CiLogout } from "react-icons/ci";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaCaretRight, FaDumbbell, FaWifi } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { useContext, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { MdFreeBreakfast, MdOutlineBedroomParent, MdPool, MdReviews } from "react-icons/md";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet-async";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const RoomDetails = () => {
    const reviewSectionRef = useRef(null);
    const rooms = useLoaderData()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const [bookingCompleted, setBookingCompleted] = useState(false);
    const { _id, description, price_per_night, size, special_offers, images, name, availability, Review_Count } = rooms;
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState({})
    useEffect(() => {
        const storedBookingCompleted = localStorage.getItem('bookingCompleted');
        if (storedBookingCompleted) {
            setBookingCompleted(JSON.parse(storedBookingCompleted));
        }
    }, []);
    const handlebook = async (e) => {
        e.preventDefault();
        if (!user || !user?.email) {
            navigate('/login')
            return
        }
        const form = e.target;
        const reDate = startDate;
        const roomId = _id;
        const room = form.room.value;
        const email = user?.email;
        const price = price_per_night;
        const bookDetails = {
            images: images,
            name: name,
            reDate,
            roomId,
            email,
            room,
            price
        }
        try {
            const { data } = await axios.post(`https://server-navy-two-99.vercel.app/booking`, bookDetails)
            const { data2 } = await axios.patch(`https://server-navy-two-99.vercel.app/booking/${_id}`, { availability: 'Unavailable' })
            setShowModal(true);
            setBookingCompleted(true)
            localStorage.setItem('bookingCompleted', JSON.stringify(true));
        } catch (err) {
            toast.error(err.response.data);
        }

    }
    const closeModal = () => {
        setShowModal(false);
        setBookingCompleted(true)
        reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const ratingChanged = (newRating) => {
        console.log(newRating);
        setRating(newRating)
    };

    const handleReview = async (e) => {
        e.preventDefault()
        if (!bookingCompleted) {
            toast.error("Please complete your booking first.");
            return;
        }
        const form = e.target;
        const name = form.name.value;
        const comment = form.comment.value;
        const ratings = rating;
        const roomId = _id;
        const email = user?.email;
        const review = { name, comment, ratings, roomId, email, images: user?.photoURL }
        try {
            const { data } = await axios.post(`https://server-navy-two-99.vercel.app/review`, review)
            toast.success("Thanks for your feedback");
            form.reset()
            navigate('/mybooking')
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    return (
        <div className="bg-[#18181b]">
            <Helmet>
                <title>HoTel FaLiz | Room Details</title>
            </Helmet>
            <section className="">
                <div className=" bg-cover max-h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/QMDpqHqw/interior-design-neoclassical-style-with-furnishings-decor.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-7xl xl:max-w-3xl text-white playfair ">Rooms Details</h1>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
                <div className="col-span-3 lg:col-span-2">
                    <div data-aos="fade-up"
                data-aos-duration="1000">
                        <figure className="" style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
                            <img
                                src={images}
                                className="block object-cover h-full w-full  "
                            />
                        </figure>
                    </div>
                    <div data-aos="fade-up"
                data-aos-duration="1000" className="pt-5">
                        <h1 className="text-xl font-semibold text-[#cfaf45]">LUXURY ROOM</h1>
                    </div>
                    <div data-aos="fade-up"
                data-aos-duration="1000" className="py-8">
                        <h1 className="text-3xl py-2 text-white font-bold">{name}</h1>
                        <p className="font-medium text-slate-300 text-xl">{description}</p>
                    </div>
                    <div data-aos="fade-up"
                data-aos-duration="1000" className="py-8">
                        <div className="overflow-x-auto">
                            <table className="table text-xl text-white">
                                <tbody >

                                    <tr className='border-[#cfaf45]'>

                                        <th>Price per Night </th>
                                        <td>:</td>
                                        <td> $ {price_per_night}</td>

                                    </tr >

                                    <tr className='border-[#cfaf45]'>

                                        <th>Room Size</th>
                                        <td>:</td>
                                        <td className="">{size}</td>

                                    </tr>

                                    <tr className='border-[#cfaf45]'>

                                        <th>Availability</th>
                                        <td>:</td>
                                        <td>{bookingCompleted ? 'Unavailable' : `${availability}`}</td>


                                    </tr>
                                    <tr className='border-[#cfaf45]'>
                                        <th>Special Offers</th>
                                        <td>:</td>
                                        <td>{special_offers}</td>
                                    </tr>
                                    <tr className='border-[#cfaf45]'>

                                        <th>Review</th>
                                        <td>:</td>
                                        <td><p className="flex items-center gap-2"><MdReviews size={25}/> {Review_Count}</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div data-aos="fade-up"
                data-aos-duration="1000" className="flex flex-col py-8 md:flex-row md:items-center gap-5 md:gap-28">
                        <div>
                            <div className="pt-5 flex gap-4 items-center text-4xl  text-[#cfaf45]">
                                <CiLogin />
                                <h1 className="text-5xl font-bold">Check In</h1>
                            </div>
                            <div className="py-5 text-xl">
                                <p className="flex gap-2 items-center text-slate-300"><FaCaretRight className="text-[#cfaf45]"/> Check-in from 9:00 AM - anytime</p>
                                <p className="flex gap-2 items-center text-slate-300"><FaCaretRight className="text-[#cfaf45]"/> Early check-in subject to availability</p>
                            </div>
                        </div>
                        <div>
                            <div className="pt-5 flex gap-4 items-center text-4xl  text-[#cfaf45]">
                                <CiLogout />
                                <h1 className=" font-bold text-5xl  ">Check Out</h1>
                            </div>
                            <div className="py-5 text-xl">
                                <p className="flex gap-2 items-center text-slate-300"><FaCaretRight className="text-[#cfaf45]"/> Check-out before noon</p>
                                <p className="flex gap-2 items-center text-slate-300"><FaCaretRight className="text-[#cfaf45]"/> Check-out from 9:00 AM - anytime</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-3 lg:col-span-1 bg-[#26262b]">
                    <div>
                        <div data-aos="fade-up"
                data-aos-duration="1000" className="p-5">
                            <h1 className="text-4xl font-bold text-[#cfaf45]">Your Reservation </h1>
                            <div className="mt-4">
                                <form onSubmit={handlebook}>
                                    <div className='flex flex-col text-lg gap-2 '>
                                        <label className='text-slate-300'>Reserve Date</label>

                                        <DatePicker className="border p-2 w-full " selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                    <div className='flex flex-col text-lg gap-2 '>
                                        <label className='text-slate-300 ' htmlFor='room'>
                                            Rooms
                                        </label>
                                        <select
                                            name='room'
                                            id='room'
                                            className='border p-2 '
                                        >
                                            <option value='1 Room'>1 Room</option>
                                            <option value='2 Room'>2 Room</option>
                                            <option value='3 Room'>3 Room</option>
                                            <option value='4 Room'>4 Room</option>
                                        </select>
                                    </div>
                                    <div className='mt-6'>
                                        <button className='bg-transparent w-full  text-lg font-bold border border-[#cfaf45] text-[#cfaf45] justify-center p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] transition-all duration-1000'>
                                            Book Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {showModal && (
                                <div className="fixed  inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                    <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-[#18181b] border rounded-sm">
                                        <div className="text-center">
                                            <h3 className="text-3xl font-bold text-[#cfaf45]  leading-6 ">Reservations Details</h3>
                                            <div className="overflow-x-auto ">
                                                <table className="table">
                                                    <tbody className="text-slate-300">
                                                        {/* row 1 */}
                                                        <tr className='border-[#cfaf45]'>
                                                            <th>Customer Name </th>
                                                            <th>:</th>
                                                            <td>{user?.displayName}</td>
                                                        </tr>
                                                        <tr className='border-[#cfaf45]'>
                                                            <th>Price  </th>
                                                            <th>:</th>
                                                            <td>$ {price_per_night}</td>
                                                        </tr>
                                                        <tr className='border-[#cfaf45]'>
                                                            <th>Reservation Date</th>
                                                            <th>:</th>
                                                            <td>{startDate.toLocaleDateString()}</td>
                                                        </tr>
                                                        <tr className='border-[#cfaf45]'>
                                                            <th>Description</th>
                                                            <th>:</th>
                                                            <td>{description}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <button
                                                onClick={closeModal}
                                                className="bg-transparent w-full justify-center text-lg font-bold border border-[#cfaf45] text-[#cfaf45]  p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] px-4 transition-all duration-1000 rounded"
                                            >
                                                Confirmed Booking
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div data-aos="fade-up"
                data-aos-duration="1000" className="my-5">
                                <h1 className="text-4xl text-[#cfaf45]">
                                    Amenities
                                </h1>
                                <div className="space-y-4 pt-4 text-lg text-white">
                                    <p className="flex items-center gap-3 border-b border-[#cfaf45] pb-2"> <IoPeopleCircleOutline />2 - 5 Persons</p>
                                    <p className="flex items-center gap-3 border-b border-[#cfaf45] pb-2"><FaWifi />Free WiFi Available</p>
                                    <p className="flex items-center gap-3 border-b border-[#cfaf45] pb-2"><MdPool />Swimming Pools</p>
                                    <p className="flex items-center gap-3 border-[#cfaf45] border-b pb-2"><MdFreeBreakfast />Breakfast</p>
                                    <p className="flex items-center gap-3 border-[#cfaf45] border-b pb-2"><MdOutlineBedroomParent />250 SQFT Rooms</p>
                                    <p ref={reviewSectionRef} className="flex border-[#cfaf45] items-center gap-3 border-b pb-2"><FaDumbbell />Gym facilities</p>
                                </div>
                            </div>
                            <div>

                                <div  data-aos="fade-up"
                data-aos-duration="1000" className="flex flex-col max-w-xl p-8  rounded-xl lg:p-12 ">
                                    <div className="flex flex-col items-center w-full">
                                        <h2 className="text-3xl font-semibold text-[#cfaf45] text-center">Leave a feedback</h2>
                                        <div className="flex flex-col items-center space-y-3">

                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={40}
                                                activeColor="#ffd700"
                                            />,
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <form onSubmit={handleReview}>
                                                <div className="text-lg">
                                                    <label className='text-white ' htmlFor='name'>
                                                        Name
                                                    </label>
                                                    <input
                                                        id='name'
                                                        type='text'
                                                        name='name'
                                                        disabled
                                                        defaultValue={user?.displayName}
                                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200  focus:ring-opacity-40  focus:outline-none focus:ring'
                                                    />
                                                </div>
                                                <div className="pt-2">
                                                    <label className='text-white ' htmlFor='comment'>
                                                        Comment
                                                    </label>
                                                    <input
                                                        id='comment'
                                                        name='comment'
                                                        type='text'
                                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200   focus:ring-opacity-40  focus:outline-none focus:ring'
                                                    />
                                                </div>

                                                <button className="bg-transparent mt-5 w-full justify-center text-lg font-bold border border-[#cfaf45] text-[#cfaf45]  p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] px-4 transition-all duration-1000 ">Leave feedback</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;