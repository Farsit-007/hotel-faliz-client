import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [booking, setBooking] = useState([])
    const [Id, setId] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const getData = async () => {
        const { data } = await axios(`http://localhost:5000/booking/${user?.email}`,{withCredentials : true})
        setBooking(data)
    }
    useEffect(() => {
        getData()
    }, [user])

    const handleDelete = async (id,id2) => {
        try {
            const updateAvail = await axios.patch(`http://localhost:5000/bookingupdate/${id2}`,{availability : 'Available'})
            console.log(updateAvail);
            const { data } = await axios.delete(`http://localhost:5000/bookingDelete/${id}`)
           
            if (data.deletedCount > 0) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, cancel it!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your reservation has been Cancelled!.",
                            icon: "success"
                        });
                        getData()
                    }
                });
            }

        } catch (err) {
            toast.error(err.response.data);
        }
    }

    const handleUpdate = (id) => {
        setId(id)
        setShowModal(true);
    }
    const handleConfirm = async (e) => {
        e.preventDefault()
        const reDate = startDate.toLocaleDateString();
        const update = { reDate };
        try {
            const { data2 } = await axios.patch(`http://localhost:5000/updatebooking/${Id}`, update)
            getData();
            toast.success("Booking date updated successfully");
        } catch (err) {
            toast.error(err.response.data);
        }
        setShowModal(false);
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

            <div className="max-w-6xl mx-auto my-8">

                <div className="overflow-x-auto">
                    <table className="table section-no-cards">
                        <thead className="">
                            <tr className="font-extrabold text-lg">
                                <th>Image</th>
                                <th>Room</th>
                                <th>Date</th>
                                <th>Review</th>
                                <th>Update</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        {<tbody className="">
                            {booking.map((item) => (
                                <tr key={item.id}>
                                    <td className="w-36 lg:w-52">
                                        <div className="w-36 lg:w-48">
                                            <figure className="rounded-xl" style={{ height: '110px', width: '100%', overflow: 'hidden' }}>
                                                <img width="160px" src={item.images} alt="Item" className="object-cover h-full w-full" />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className="w-36 lg:w-52"> {item.room}</td>
                                    <td> {new Date(item.reDate).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/roomsdetails/${item.roomId}`}>
                                            <button>Review</button>
                                        </Link>
                                    </td>
                                    <td className="">
                                        <button onClick={() => handleUpdate(item._id)}>Update Date</button>
                                    </td>
                                    <td className="">
                                        <button onClick={() => handleDelete(item._id,item.roomId)}>Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>








                    {showModal && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                            <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
                                <div className="text-center">
                                    <h3 className="text-lg py-4 font-semibold leading-6 text-gray-900">Reservations Date</h3>
                                    <form onSubmit={handleConfirm}>
                                        <div className='flex flex-col gap-2 '>
                                            <DatePicker className="border p-2 w-full " selected={startDate} onChange={(date) => setStartDate(date)} />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <button
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                                            >
                                                Update Reservation
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default MyBooking;