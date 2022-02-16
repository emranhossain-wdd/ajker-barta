import Bangladesh from "../components/categories/Bangladesh";
import International from "../components/Home/International/International";
import Hero from "../components/Hero";
import ImageGallary from "../components/imageGallary/imageGallary";
import Coronavirus from "../components/Coronavirus/Coronavirus";
import Opinion from "../components/Opinion/Opinion";
import Exclusive from "../components/Exclusive";
import ScienceTechnology from "../components/ScienceTechnology";
import Business from "../components/Business";
import Sports from "../components/Home/Sports/Sports";
import Header from "../components/Shared/Header/Header";
import NavigationBar from "../components/Shared/NavigationBar/NavigationBar";
import Footer from "../components/Shared/Footer/Footer";
import axios from "axios";
import Global from "../components/CovidUpdate/Global";
import CovidBtn from "../components/CovidUpdate/CovidBtn";
export default function Home({ newses }) {
  const coronanews = newses.filter((news) => news.category === "coronavirus");
  const bdnews = newses.filter((news) => news.category === "bangladesh");
  const international = newses.filter(
    (news) => news.category === "international"
  );
  const science = newses.filter(
    (news) => news.category === "sciencetechnology"
  );
  const business = newses.filter((news) => news.category === "business");
  const sports = newses.filter((news) => news.category === "sports");

  return (
    <div>
      <Header />
      <NavigationBar />
      <Hero newses={newses} />
      <Coronavirus coronanews={coronanews} />
      <Bangladesh bdnews={bdnews} />
      <International international={international} />
      <ScienceTechnology science={science} />
      <Exclusive newses={newses} />
      <Business business={business} />
      <Hero />
      <Coronavirus />
      <Global />
      <CovidBtn />
      <Bangladesh />
      <International />
      <ImageGallary />
      <Opinion />
      <Sports sports={sports} />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`https://ajker-barta.vercel.app/api/news/`);
  return {
    props: {
      newses: res.data,
    },
  };
};
