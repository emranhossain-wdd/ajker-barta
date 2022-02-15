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
import axios from 'axios'
export default function Home({newses}) {
      return (
            <div>
                  <Header />
                  <NavigationBar />
                  <Hero />
                  <Coronavirus />
                  <Bangladesh />
                  <International />
                  <ImageGallary />
                  <ScienceTechnology />
                  <Exclusive />
                  <Business />
                  <Opinion />
                  <Sports />
                  <Footer />
            </div>
      )
}

export const getServerSideProps = async () => {
      const res = await axios.get(`https://ajker-barta.vercel.app/api/news/`);
      return {
        props: {
          newses: res.data,
        },
      };
    };
