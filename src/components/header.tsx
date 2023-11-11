import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <div className="flex justify-center px-5 py-5">
        <div className="overflow-hidden rounded-lg w-full p-3 max-w-7xl">
          <div className="flex flex-col md:flex-row max-w-5xl mx-auto"> 
            <div className="flex-1 flex flex-col justify-center py-2 w-full px-2 rounded-lg"> {/* Added text-center and w-full */}
              <div className="text-lg md:text-3xl font-bold py-3">Welcome to Nishida Chiropractic Care</div>
              <div className="text-lg md:text-2xl">Welcome to our website!</div>
              <div className="py-7">
                At Nishia Chiropractice Care, we are dedicated to providing personalized and effective chiropractic 
                solutions to help you achieve optimal health. Our experienced team, led by Dr. Paul Nishida, is 
                committed to guiding you on a journey to wellness. Experience a new level of care and let us 
                help you unlock your body's true potential. Start your journey towards a pain-free and healthier 
                life with us today.
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={'/assets/images/placeholder.jpg'}
                alt="Placeholder Image"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='text-center items-center'>
        <div className='py-24 text-4xl bg-teal-100'>Call 000-000-0000 to schedule an appointment today!</div>
      </div>
    </div>
  );
}