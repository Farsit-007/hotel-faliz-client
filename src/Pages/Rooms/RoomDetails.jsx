import { CiLogin, CiLogout } from "react-icons/ci";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaCaretRight, FaDumbbell, FaWifi } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { MdFreeBreakfast, MdOutlineBedroomParent, MdPool } from "react-icons/md";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import toast from 'react-hot-toast';
const RoomDetails = () => {
    const rooms = useLoaderData()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const [bookingCompleted, setBookingCompleted] = useState(false);
    const { _id, description, price_per_night, size, special_offers, images, name, availability, Review_Count } = rooms;
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState({})
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
        const bookDetails = {
            images: images,
            name: name,
            reDate,
            roomId,
            email,
            room,
        }
        try {
            const { data } = await axios.post(`http://localhost:5000/booking`, bookDetails)
            const { data2 } = await axios.patch(`http://localhost:5000/booking/${_id}`, { availability: 'Unavailable' })
            setShowModal(true);
            setBookingCompleted(true)
        } catch (err) {
            toast.error(err.response.data);
        }

    }
    const closeModal = () => {
        setShowModal(false);
        setBookingCompleted(true)
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
            const { data } = await axios.post(`http://localhost:5000/review`, review)
            toast.success("Booking date updated successfully");
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    return (
        <div>
            <section className="">
                <div className=" bg-cover max-h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/HnPhy6QT/frame-from-plants-drawing-suplies.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-7xl xl:max-w-3xl text-white playfair ">Add Your Craft Items</h1>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto my-10">
                <div className="col-span-3 lg:col-span-2">
                    <div>
                        <figure className="" style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
                            <img
                                src={images}
                                className="block object-cover h-full w-full  "
                            />
                        </figure>
                    </div>
                    <div className="pt-5">
                        <h1 className="">LUXURY ROOM</h1>
                    </div>
                    <div className="">
                        <h1 className="text-3xl py-2 font-bold">{name}</h1>
                        <p className="font-medium text-[16px]">{description}</p>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table ">
                                <tbody >

                                    <tr className=''>

                                        <th>Price per Night </th>
                                        <td>:</td>
                                        <td> $ {price_per_night}</td>

                                    </tr >

                                    <tr className=''>

                                        <th>Room Size</th>
                                        <td>:</td>
                                        <td className="">{size}</td>

                                    </tr>

                                    <tr className=''>

                                        <th>Availability</th>
                                        <td>:</td>
                                        <td>{bookingCompleted ? 'Unavailable' : `${availability}`}</td>


                                    </tr>
                                    <tr className=''>
                                        <th>Special Offers</th>
                                        <td>:</td>
                                        <td>{special_offers}</td>
                                    </tr>
                                    <tr className=''>

                                        <th>Review</th>
                                        <td>:</td>
                                        <td>{Review_Count}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-28">
                        <div>
                            <div className="pt-5 flex gap-4 items-center">
                                <CiLogin />
                                <h1 className="text-2xl font-bold">Check In</h1>
                            </div>
                            <div className="py-3">
                                <p className="flex gap-2 items-center"><FaCaretRight /> Check-in from 9:00 AM - anytime</p>
                                <p className="flex gap-2 items-center"><FaCaretRight /> Early check-in subject to availability</p>
                            </div>
                        </div>
                        <div>
                            <div className="pt-5 flex gap-4 items-center">
                                <CiLogout />
                                <h1 className="text-2xl font-bold">Check Out</h1>
                            </div>
                            <div className="py-3">
                                <p className="flex gap-2 items-center"><FaCaretRight /> Check-out before noon</p>
                                <p className="flex gap-2 items-center"><FaCaretRight /> Check-out from 9:00 AM - anytime</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-3 lg:col-span-1">
                    <div>
                        <div className="p-5">
                            <h1 className="">Your Reservation </h1>
                            <div className="mt-4">
                                <form onSubmit={handlebook}>
                                    <div className='flex flex-col gap-2 '>
                                        <label className='text-gray-700'>Reserve Date</label>

                                        <DatePicker className="border p-2 w-full " selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                    <div className='flex flex-col gap-2 '>
                                        <label className='text-gray-700 ' htmlFor='room'>
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
                                        <button className='px-8 py-2.5 leading-5 w-full text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                                            Book Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {showModal && (
                                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                    <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold leading-6 text-gray-900">Reservations Details</h3>
                                            <div className="overflow-x-auto">
                                                <table className="table">
                                                    <tbody>
                                                        {/* row 1 */}
                                                        <tr>
                                                            <th>Customer Name </th>
                                                            <th>:</th>
                                                            <td>{user?.displayName}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Price  </th>
                                                            <th>:</th>
                                                            <td>{price_per_night}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Reservation Date</th>
                                                            <th>:</th>
                                                            <td>{startDate.toLocaleDateString()}</td>
                                                        </tr>
                                                        <tr>
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
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                                            >
                                                Confirmed Booking
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="my-5">
                                <h1 className="text-2xl">
                                    Amenities
                                </h1>
                                <div className="space-y-4 pt-4">
                                    <p className="flex items-center gap-3 border-b pb-2"> <IoPeopleCircleOutline />2 - 5 Persons</p>
                                    <p className="flex items-center gap-3 border-b pb-2"><FaWifi />Free WiFi Available</p>
                                    <p className="flex items-center gap-3 border-b pb-2"><MdPool />Swimming Pools</p>
                                    <p className="flex items-center gap-3 border-b pb-2"><MdFreeBreakfast />Breakfast</p>
                                    <p className="flex items-center gap-3 border-b pb-2"><MdOutlineBedroomParent />250 SQFT Rooms</p>
                                    <p className="flex items-center gap-3 border-b pb-2"><FaDumbbell />Gym facilities</p>
                                </div>
                            </div>
                            <div>

                                <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
                                    <div className="flex flex-col items-center w-full">
                                        <h2 className="text-3xl font-semibold text-center">Your opinion</h2>
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
                                                <div>
                                                    <label className='text-gray-700 ' htmlFor='name'>
                                                        Name
                                                    </label>
                                                    <input
                                                        id='name'
                                                        type='text'
                                                        name='name'
                                                        disabled
                                                        defaultValue={user?.displayName}
                                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                                    />
                                                </div>
                                                <div className="pt-2">
                                                    <label className='text-gray-700 ' htmlFor='comment'>
                                                        Comment
                                                    </label>
                                                    <input
                                                        id='comment'
                                                        name='comment'
                                                        type='text'
                                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                                    />
                                                </div>

                                                <button className="py-4 my-8 w-full font-semibold rounded-md dark:text-gray-50 dark:bg-violet-600">Leave feedback</button>
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