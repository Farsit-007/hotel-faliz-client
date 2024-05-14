
import { Link } from 'react-router-dom';
import backgroundVideo from '../../assets/bv.mp4';

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
                <div className=' lg:w-[65%] mx-auto'>
                    <h1 className='text-2xl md:text-4xl font-bold mb-4'>
                    Choose from a diverse range of hotels, each celebrated for its distinct character and aesthetic allure.
                    </h1>
                    <Link to='/rooms' className='border mt-5 bg-transparent animate__animated  animate__fadeInLeft border-white py-2 px-4 font-bold text-white  hover:bg-[#cfaf45] transition-all duration-1000'>
                        View All Items
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
