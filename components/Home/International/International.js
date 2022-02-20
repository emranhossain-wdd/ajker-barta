
import styles from "./International.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Link from "next/link";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";

const International = ({ international }) => {
  const newsData = international.reverse();
  const singleData = newsData.slice(0, 1);
  const multiData = newsData.slice(1, 4);
  const router = useRouter()
  return (
    <div className="container mx-auto lg:pb-5 lg:border-b  border-gray-200">
      <h2 className="text-2xl pt-24 lg:pt-5 pb-5 text-red-500 font-bold">
        <span className="text-black">
          {" "}
          <Link href="/international">International</Link>{" "}
        </span>
        <ChevronRightIcon />
      </h2>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 mb-3 lg:mb-0">
          <div>
            {singleData.map((single) => (
              <div
                onClick={() => router.push(`/${single.category}/${single.subCategory}/${single?._id}`)}
                key={single?._id}
                className=" lg:border-none border lg:border cursor-pointer lg:border-r border-gray-200 lg:mr-3 lg:pr-3"
              >
                <div className="">
                  <img src={single?.images?.img1} alt="" className="" />
                </div>
                <div className="p-3">
                  <h2 className="text-2xl font-bold">{single?.heading}</h2>
                  <p className="">{single?.description[0].slice(0, 100)}</p>
                  <p>
                    <small className="text-gray-500">
                      {`${formatDistanceToNow(new Date(single?.publishedDate))} ago`}
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="">
            {multiData.map((multi) => (
              <div key={multi?._id} onClick={() => router.push(`/news/${multi?._id}`)} className="col-span-12 lg:col-span-4 mb-2 cursor-pointer">
                <div className="grid grid-cols-12 border border-gray-200 rounded-md">
                  <div className="col-span-8 p-2">
                    <h2 className="text-1xl  font-bold">
                      {multi?.heading}
                    </h2>
                    <p>{multi?.description[0].slice(0, 100)}</p>
                    <p>
                      <small className="text-gray-500">
                        {`${formatDistanceToNow(new Date(multi?.publishedDate))} ago`}
                      </small>
                    </p>
                  </div>
                  <div className="col-span-4">
                    <img src={multi?.images?.img1} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default International;
