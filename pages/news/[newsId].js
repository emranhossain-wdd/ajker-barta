import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaShare,
  FaRegBookmark,
  FaPrint,
} from "react-icons/fa";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";
import axios from 'axios'
import NavigationBar from "../../components/Shared/NavigationBar/NavigationBar";
const Newsdetails = ({newses}) => {
  
  const router = useRouter();
  const newsId = router.query.newsId;
  const news = newses.find(news => news._id === newsId)
  const category = news.category;
  const remaining = newses.filter(item => item.category === category && item._id !== news._id)
  const iconClass = "p-2 flex-initial bg-gray-200 rounded-full cursor-pointer";
  const Actions = () => {
    return (
      <div className="flex items-start gap-3">
        <span className={iconClass}>
          <FaFacebookF />
        </span>
        <span className={iconClass}>
          <FaTwitter />
        </span>
        <span className={iconClass}>
          <FaShare />
        </span>
        <span className={iconClass}>
          <FaRegBookmark />
        </span>
        <span onClick={() => window.print()} className={iconClass}>
          <FaPrint />
        </span>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <NavigationBar />
      <div className="grid mx-14 md:grid-cols-3 sm:grid-cols-1">
        <div className="col-span-2 mt-20">
          <h3 className="cursor-pointer underline mb-2 text-2xl text-blue-500 py-3">
            {news?.category}
          </h3>
          <h1 className="text-4xl mb-3 font-semibold">{news?.heading}</h1>
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="font-bold">{news?.reporter}</p>
              <p>Publish Date: {news?.publishedDate}</p>
            </div>
            <Actions />
          </div>
          <hr />
          <img src={news?.images?.img1} className=" py-3 w-full" alt={news?.title} />

          <p className="py-3 text-lg">{news?.description.join()}</p>

          <div className="border-y border-gray-300 flex items-center justify-between">
            <h2 className="text-xl font-semibold py-3">Comments</h2>
            <Actions />
          </div>
          <div className="flex justify-between items-center border-y border-gray-300">
            <h2 className="text-xl py-3">No Comments yet</h2>

            <div>
              <span>Sort by: </span>
              <select name="Sort by" id="Sort by">
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </div>
          </div>
          <div>
            <form action="">
              <input placeholder="Write your comment here" type="text" className="border-2 rounded block w-full my-2 p-2" />
              <input className="bg-orange-500 text-white px-4 py-2 cursor-pointer rounded" type="submit" value="Post" />
            </form>
          </div>
        </div>
        <div className="col-span-1">
          <p className="mx-10 my-5 py-3 mb-3 underline text-xl">
            You may also read
          </p>

          {remaining.slice(0,10).map((item) => {
            return (
              <div key={item._id}>
                <div className="mx-10 my-5 pb-4 border-b border-gray-300">
                  <h2 className="text-xl font-semibold">{item?.heading}</h2>
                  <div className="flex">
                    <p>{item?.description[0].slice(0, 70)}</p>
                    <img className="w-5/12" src={item?.images?.img1} alt={item.title} />
                  </div>
                  <p>{item.publishedDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Newsdetails;
export const getServerSideProps = async () => {
      const res = await axios.get(`https://ajker-barta.vercel.app/api/news/`);
      return {
        props: {
          newses: res.data,
        },
      };
    };