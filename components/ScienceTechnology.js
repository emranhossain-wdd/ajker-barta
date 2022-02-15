import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io'

const ScienceTechnology = () => {
  const [newses, setNewses] = useState([])
  const router = useRouter()
  useEffect(() => {
    fetch('./news.json')
      .then(res => res.json())
      .then(data => setNewses(data))
  }, [])
  return (
    <div className='my-8'>
      <div className="container">
        <div onClick={() => router.push('/sciencetechnology')} className='flex mb-4 items-center'>
          <h1 className='ml-2 text-xl cursor-pointer font-medium text-blue-900'>Science & Technology </h1><IoIosArrowForward className='text-red-600 mt-2' />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            newses?.slice(0, 4).map(news => <div key={news.id} className=''>
              <img className='w-full h-52 object-cover' src={news?.img} alt="" />
              <h1 className='text-lg leading-6 my-1 font-semibold hover:text-red-600 transition-colors duration-300 cursor-pointer' >{news.title}</h1>
              <p className='text-sm'>{news.description?.slice(0, 120)}...</p>
              <p className='text-md italic text-blue-600'>{news?.date}</p>
            </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default ScienceTechnology;