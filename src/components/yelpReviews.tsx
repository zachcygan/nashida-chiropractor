import { StarIcon } from '@heroicons/react/20/solid'
const reviews = [
  {
    id: 1,
    rating: 5,
    content: 'Dr Nishida is amazing. He has corrected all the issues and injuries I have had in the last 15 years! He is awesome.',
    date: 'Aug 15, 2020',
    author: 'Haleh K.',
    avatarSrc: '/assets/images/yelpDEFAULT.png',
  },
  {
    id: 2,
    rating: 5,
    content: 'Dr. Paul is a miracle worker! I am an avid runner and he has helped me through several over-use injuries. He is accommodating when it is urgent. I have been going for treatment here for about 20 years. Why go anywhere else?',
    date: 'Mar 8, 2019',
    author: 'Sue K.',
    avatarSrc:
      '/assets/images/yelp2.jpg',
  },
  {
    id: 3,
    rating: 5,
    content: `Dr. Paul, is always there when you need him, so nice, very professional, and always makes you feel comfortable. I hated going to the chiropractor before, but he is different and came highly recommended, and I couldn't be happier with him. He is the best. If you are broke, he can fix you.`,
    date: 'Jan 17, 2021',
    author: 'Crissy B.',
    avatarSrc: '/assets/images/yelpDEFAULT.png',
  },
  {
    id: 4,
    rating: 5,
    content: `Dr. Paul, is always there when you need him, so nice, very professional, and always makes you feel comfortable. I hated going to the chiropractor before, but he is different and came highly recommended, and I couldn't be happier with him. He is the best. If you are broke, he can fix you.`,
    date: 'Fed 2, 2020',
    author: 'Kialye W.',
    avatarSrc: '/assets/images/yelpDEFAULT.png',
  },
  {
    id: 5,
    rating: 5,
    content: `Dr Paul is a miracle worker. My kids were soccer players when they were young and Dr Paul helped them quite a bit. I was somewhat skeptical that he could solve my recurring back strains, but I gave him a try about 10 years ago. Again, he's a miracle worker; a few treatments and my lower back pain would subside. I could walk upright again and life was good. I seem to throw out my back every two years, and Dr Paul always sets it straight. Thanks bud.`,
    date: `Feb 2, 2018`,
    author: 'Chris D.',
    avatarSrc: '/assets/images/yelp5.jpg',
  },
  {
    id: 6,
    rating: 5,
    content: `My family loves Dr. Nishida! We have gone to him for multiple sports injuries over the years. From neck, back, hamstrings, arms and he has always given us top notch treatment. He always finds a way to fit us in, even at the last minute. We highly recommend him!`,
    date: 'Oct 25, 2017',
    author: 'Cari S.',
    avatarSrc: '/assets/images/yelpDEFAULT.png',
  },
  {
    id: 7,
    rating: 5,
    content: `Awesome group of Doctors. Dr. Nishida has helped me over many years. Love he is not a commitment required chiropractor. Hands on, attentive and very knowledgeable. Very greatful for this doctor`,
    date: 'Oct 19, 2011',
    author: 'Danielle A.',
    avatarSrc:
      '/assets/images/yelp7.jpg',
  },
  // More reviews...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function YelpReviews() {
  return (
    <div className='max-w-4xl mx-auto ring'>
      <h2 className="sr-only">Yelp Reviews</h2>
      <div>
        {reviews.map((review, reviewIdx) => (
          <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
            <div className="flex-none py-10">
              <img src={review.avatarSrc} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
            </div>
            <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'flex-1 py-10')}>
              <h3 className="font-medium text-gray-900">{review.author}</h3>
              <p>
                <div>{review.date}</div>
              </p>
              <div className="mt-4 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{review.rating} out of 5 stars</p>
              <div className='prose prose-sm mt-4 max-w-none text-gray-500'>
                {review.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}