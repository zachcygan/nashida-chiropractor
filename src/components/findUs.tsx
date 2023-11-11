import Image from 'next/image'
import Link from 'next/link'

const ourLinks = [
  {
    name: 'Yelp',
    url: 'https://www.yelp.com/biz/nishida-g-paul-dc-newport-beach',
    icon: '/assets/images/yelpLogo.png'
  },
  {
    name: 'Google',
    url: 'https://www.google.com/maps/place/Gregory+P.+Nishida,+DC/@33.659356,-117.87755,15z/data=!4m2!3m1!1s0x0:0xb055d29cce9f800f?sa=X&ved=2ahUKEwjpk5ek-7yCAxWtm2oFHSEADr0Q_BJ6BAg_EAA',
    icon: '/assets/images/googleLogo.png'
  },
]

export default function FindUs() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className='text-center text-4xl font-bold pb-5'>Find Us On</h2>
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl">
          {ourLinks.map((link, index) => (
            <div className="bg-gray-800/20 p-8 sm:p-10" key={index}>
              <Link href={link.url} target='_'>
                <Image
                  className="max-h-12 w-full object-contain"
                  src={link.icon}
                  alt={link.name}
                  width={158}
                  height={48}
                />
              </Link>
              <div className='text-center pt-5'>test</div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}