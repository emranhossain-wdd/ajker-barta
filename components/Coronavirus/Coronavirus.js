import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Corona from './Corona';

const Coronavirus = ({coronanews}) => {

  // const [data, setData] = useState([])
  const router = useRouter()
  // useEffect(() => {

  //   fetch('/ass/fakeapi.JSON')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)

  //     })
  // }, [])
  const latestNews = coronanews.reverse().slice(0,4)
  return (
    <div className="container xl mx-auto">
      <div onClick={() => router.push('/coronavirus')} className="mt-5 uppercase font-bold text-xl mb-2 cursor-pointer">Coronavirus <span className='text-red-500'>Worldwide</span> </div>
      <div className="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">

        {


latestNews.map(news => <Corona
            key={news._id}
            news={news}
          ></Corona>)


        }

      </div>

    </div>


  );
};

export default Coronavirus;