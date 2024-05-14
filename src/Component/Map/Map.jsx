
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IoLocationOutline } from 'react-icons/io5';
import 'leaflet/dist/leaflet.css';
import { FaMapSigns } from "react-icons/fa";
const Map = () => {
    const bangladeshCoordinates = { lat: 23.685, lng: 90.3563 };

    return (
        <section className="">
            <div className='text-center py-10'>
                <h1 className='text-5xl text-[#cfaf45]'>About Our Hotel Locations </h1>
            </div>
            <div className='flex flex-col lg:flex-row max-w-6xl items-center mx-auto'>
                <div className=' lg:w-[35%] text-slate-300 flex flex-col gap-3  '>
                    <h1 className='text-3xl font-bold'>Discover Our Diverse Hotel </h1>
                    <p className='flex  gap-2'> <FaMapSigns className='text-[#cfaf45]' />Hotels centrally located for easy access to attractions and dining</p>
                    <p  className='flex  gap-2'><FaMapSigns className='text-[#cfaf45]'/> Peaceful hotels surrounded by scenic landscapes for nature lovers</p>
                </div>
                <div className='w-full lg:w-[65%]'>
                    <div className="p-6 mt-8 ">
                        <div className="z-20 p-6">
                            <div style={{ height: '400px', width: '100%' }}>
                                <MapContainer className='z-10'
                                    center={[bangladeshCoordinates.lat, bangladeshCoordinates.lng]}
                                    zoom={7}
                                    scrollWheelZoom={true} // Enable scroll wheel zoom
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution=""
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[bangladeshCoordinates.lat, bangladeshCoordinates.lng]}>
                                        <Popup>
                                            <div className="flex gap-2 items-center ">
                                                <IoLocationOutline size={30} />
                                                <p>Bangladesh</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </section>

    );
};

export default Map;
