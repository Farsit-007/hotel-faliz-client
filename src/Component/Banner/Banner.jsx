
import backgroundVideo from '../../assets/bv.mp4';

const Banner = () => {
    return (
        <div className='w-full flex justify-start items-center min-h-screen'>
            <video
                autoPlay
                loop
                muted
                className='absolute top-0 left-0 w-full h-full object-cover'
            >
                <source src={backgroundVideo} type='video/mp4' />
            </video>
            <div className='w-11/12 md:w-4/5 mx-auto z-10 flex flex-col-reverse md:flex-row gap-12 items-center text-center text-white'>
                <div>
                    <h1 className='text-2xl md:text-4xl font-bold mb-4'>
                        Let Your Creativity Flourish with Our Extensive Selection of Artistic Treasures.
                    </h1>
                    <button className='bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300'>
                        View All Items
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
