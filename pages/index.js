import Bangladesh from "../components/Home/Bangladesh/Bangladesh";
import International from "../components/Home/International/International";
import Hero from "../components/Hero";
import ImageGallary from "../components/imageGallary/imageGallary";
import Coronavirus from "../components/Coronavirus/Coronavirus";
import Opinion from "../components/Opinion/Opinion";
import Exclusive from "../components/Exclusive";
import ScienceTechnology from "../components/ScienceTechnology";
import Business from "../components/Business";
import Header from "../components/Shared/Header/Header";
import NavigationBar from "../components/Shared/NavigationBar/NavigationBar";
import Footer from "../components/Shared/Footer/Footer";
import Global from "../components/CovidUpdate/Global";
import CovidBtn from "../components/CovidUpdate/CovidBtn";
import axios from 'axios'
import Sports from "../components/Home/Sports/Sports";
import Entertainment from "../components/Home/Entertainment/Entertainment";
import OpinionSubItem from "../components/OpinionSubItem/OpinionSubItem";
export default function Home({ newses }) {
  const coronanews = newses.filter((news) => news.category === "coronavirus");
  const bdnews = newses.filter((news) => news.category === "bangladesh");
  const international = newses.filter((news) => news.category === "international");
  const entertainment = newses.filter((news) => news.category === "entertainment");
  const science = newses.filter((news) => news.category === "sciencetechnology");
  const business = newses.filter((news) => news.category === "business");
  const sports = newses.filter((news) => news.category === "sports");
  return (
    <div>
      <Header />
      <NavigationBar />
      <Hero newses={newses} />
      <Coronavirus coronanews={coronanews} />
      <Global />
      <CovidBtn />
      <Bangladesh bdnews={bdnews} />
      <International international={international} />
      <ScienceTechnology science={science} />
      <Exclusive newses={newses} />
      <Business business={business} />
      <Entertainment entertainment={entertainment} />
      <ImageGallary />
      <Opinion />
      <OpinionSubItem />
      <Sports sports={sports} />
      <Footer newses={newses} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(`https://ajker-barta.vercel.app/api/news/`);
  return {
    props: {
      newses: res.data,
    },
    revalidate: 10
  };
};
