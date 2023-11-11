import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh]">
      <Image
        src="/assets/images/stockImage.jpg" // Replace with the path to your image
        fill={true}
        style={{objectFit: "cover"}}
        alt="Hero Image"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white text-4xl font-bold">Nishida Chiropractic</h1>
        <p className="text-white font-bold mt-4">Fixing Your Body ONE Crack at a Time</p>
      </div>
    </div>
  );
}