
import { Link } from 'react-router-dom';
import backgroundVideo from '../../assets/bv.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const Banner = () => {
    return (
        <div className='w-full font-Cormorant flex justify-start items-center min-h-screen'>
            <video
                autoPlay
                loop
                muted
                className='absolute top-0 left-0 w-full h-full object-cover'
            >
                <source src={backgroundVideo} type='video/mp4' />
            </video>
            <div className='w-11/12 md:w-4/5 mx-auto z-10 flex flex-col-reverse md:flex-row gap-12 items-center text-center text-white'>
                <div data-aos="fade-up"
                data-aos-duration="1000"  className=' lg:w-[75%] mx-auto'>
                    <h1 className='text-2xl md:text-5xl text-center font-bold mb-8'>
                    Discover a captivating selection of hotels, each celebrated for its unique character and aesthetic allure. 
                    </h1>
                    <Link to='/rooms' className='border bg-transparent  border-[#cfaf45] py-3 px-5 font-bold text-white  text-2xl hover:bg-[#cfaf45] transition-all duration-1000'>
                        View Rooms
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
