import Image from "next/image";
import bg from "../app/assets/bg.webp";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-[88vh] p-6">
        <div className="w-1/2 mr-4">
          <Image
            src={bg}
            alt="techarpe"
            className="w-full h-full object-cover rounded-3xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,50vw"
          />
        </div>
        <div className="w-1/2 justify-center flex">
          <p className="my-4 text-base  font-medium text-gray-700 leading-relaxed tracking-wide flex flex-col justify-center px-4 py-2 bg-white ">
            Welcome to our revolutionary platform, where we are dedicated to
            redefining the e-commerce landscape by empowering businesses and
            entrepreneurs with state-of-the-art web solutions. At the heart of
            our service is the powerful synergy of Next.js and TailwindCSS,
            technologies known for their speed, efficiency, and flexibility. We
            harness these tools to create not just websites but seamless,
            high-speed online experiences that keep your customers coming back.
            Our expertise in Next.js allows us to offer the latest in web
            technology, including server-side rendering, static site generation,
            and dynamic routing, ensuring your e-commerce site is not only fast
            but also highly scalable and SEO-friendly. With TailwindCSS, we
            bring a level of customization and responsiveness that makes your
            website not just functionally robust but also aesthetically
            compelling, adapting flawlessly to any device or screen size.
          </p>
        </div>
      </div>
    </>
  );
}
