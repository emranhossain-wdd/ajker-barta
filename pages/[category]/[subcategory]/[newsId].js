import React from "react";
import { useRouter } from "next/router";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, } from "react-share";
import { FaRegBookmark, FaPrint, FaPlay, FaPause, FaStop, FaCopy } from "react-icons/fa";
import { MdFacebook, MdOutlineEditNote } from "react-icons/md";
import Footer from "../../../components/Shared/Footer/Footer";
import Header from "../../../components/Shared/Header/Header";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import NavigationBar from "../../../components/Shared/NavigationBar/NavigationBar";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { AiOutlineTwitter, AiOutlineQrcode } from "react-icons/ai";
import NoteBar from "../../../components/Shared/NoteBar/NoteBar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import QRCode from "qrcode.react";
import Modal from '@mui/material/Modal';

const Newsdetails = ({ englishNews, bengaliNews }) => {
  const { user, toggleLanguage, admin } = useAuth();
  const [speed, setSpeed] = useState(1);


  const [openqr, setOpenqr] = React.useState(false);
  const handleOpenqr = () => setOpenqr(true);
  const handleCloseqr = () => setOpenqr(false);

  //text select state
  const [selectedText, setSelectedText] = useState("");
  const [showTextOption, setShowTextOption] = useState(false);
  const [xValue, setxVlue] = useState(0);
  const [yValue, setyVlue] = useState(0);
  const [isShowNoteBar, setIsShowNoteBar] = useState(false);

  // news modal control 
  const [openSnack, setOpenSnack] = useState(false);
  const handleClose = () => setOpen(false);


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}></Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  //handle selection
  const handleSelection = (e) => {
    setTimeout(() => {
      const text = window.getSelection().toString().trim();
      if (text.length) {
        setSelectedText(text);
        setShowTextOption(true);
        const x = e.pageX;
        const y = e.pageY;
        setxVlue(x);
        setyVlue(y);
      } else {
        setShowTextOption(false);
      }
    }, 0);
  };
  const addToNote = (e) => {
    e.preventDefault();
    setIsShowNoteBar(true);
    setShowTextOption(false);
  };

  //twitter share
  const shareOnTwitter = () => {
    const twitterShareUrl = "https://twitter.com/intent/tweet";
    const text = `${encodeURIComponent(selectedText)}`;
    const currentUrl = encodeURIComponent(window.location.href);
    const hashtags = "HotNews, Recent, Letest";
    const via = "Ajker Barta";
    window.open(
      `${twitterShareUrl}?text="${text}"&url=${currentUrl}&hashtags=${hashtags}&via=${via}`
    );
  };

  //facebook share
  const faceBookShare = () => {
    window.open(`https://www.facebook.com/sharer.php?`);
  };

  ////handle selection end
  const router = useRouter();
  const newsId = router.query.newsId;
  let newses = null;
  if (toggleLanguage) {
    newses = bengaliNews;
  }
  else {
    newses = englishNews;
  }
  const news = newses?.find((news) => news._id === newsId);


  const [likes, setLikes] = useState([])
  useEffect(() => {
    if (news?.likes) {
      setLikes(news?.likes)
    } else {
      setLikes([])
    }
  }, [news?.likes])
  const category = news?.category;
  const remaining = newses.filter(
    (item) => item.category === category && item._id !== news._id
  );
  // const url = window?.location?.href
  const iconClass = "p-3 flex-initial bg-gray-200 rounded-full cursor-pointer";


  // add commnent functionality
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  useEffect(() => {
    if (news?.comments) {
      setComments(news?.comments)
    } else {
      setComments([])
    }
  }, [news])
  const handleComment = (e) => {
    e.preventDefault()
    const commentObj = {
      comment: commentText,
      name: user.displayName,
      img: user.photoURL,
      date: new Date().toLocaleString(),
      email: user.email,
    }
    if (!user.email) {
      Swal.fire({
        title: "You are not signed in",
        text: "You want to comment? please Sign in first",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3ae374",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign in ",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({
            pathname: '/login',
            query: { from: `/${news?.category}/${news?.subCategory}/${news?._id}` }
          })
        }
      });
    } else {
      if (commentText) {
        setComments([commentObj, ...comments])
        fetch(`/api/news/${newsId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentObj),
        })
          .then((res) => res.json())
          .then((data) => {
            setCommentText("");
            e.target.reset();
            if (data.modifiedCount > 0) {
              setCommentText("");
              e.target.reset();
            }
          })
          .catch(err => {
            Swal.fire({
              title: 'Error',
              text: `${err.message}`,
              icon: 'error',
              showCancelButton: true
            })
          })
      }
      else {
        return;
      }
    }

  };
  //like functionality
  const handleLike = (id) => {
    fetch(`/api/news/like?id=${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email: user.email })
    })
      .then(res => res.json())
      .then(result => {
        if (result.modifiedCount > 0) {
          const newLikes = [...likes, user.email]
          setLikes(newLikes)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  //unlike functionality
  const handleUnLike = (id) => {
    fetch(`/api/news/unlike?id=${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email: user.email })
    })
      .then(res => res.json())
      .then(result => {
        if (result.modifiedCount > 0) {
          const newLikes = news?.likes.filter(ele => ele !== user.email)
          setLikes(newLikes)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  // wish list add
  const addToWishList = () => {
    fetch(`/api/users/wishlist?email=${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: news._id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount === 1) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `This news Added to your wish list`,
          })
        }
      })
  }
  // handle audio news

  const playNow = (text) => {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume();
    }
    if (speechSynthesis.speaking) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;

    speechSynthesis.speak(utterance);
  };
  const pause = () => {
    if (speechSynthesis.speaking) speechSynthesis.pause();
  };
  function stop() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
  }
  const url = `https://ajker-barta.vercel.app/${category}/${news?.subCategory}/${news?._id}`;
  const copyUrl = async () => {
    try {
      const toCopy = url || location.href;
      await navigator.clipboard.writeText(toCopy);
      setOpenSnack(true);
      console.log("Text or Page URL copied");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // qr code  
  const generateCode = () => {
    handleOpenqr()
  }
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const qrstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const Actions = () => {
    return (
      <div className="flex items-start gap-3">
        <span>
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
        </span>
        <span>
          <TwitterShareButton url={url}>
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
        </span>
        <span url={url}>
          <LinkedinShareButton url={url}>
            <LinkedinIcon round={true} size={40} />
          </LinkedinShareButton>
        </span>
        <span onClick={addToWishList} className={`${iconClass} bg-orange-500 text-white`}>
          <FaRegBookmark />
        </span>
        <span
          title="Copy Link"
          onClick={copyUrl}
          className={`${iconClass} bg-gray-500 text-white`}
        >
          <FaCopy />
        </span>
        <span title="Show QR Code"
          onClick={generateCode}
          className={iconClass}>
          <AiOutlineQrcode />
        </span>
        <span
          title="Print"
          onClick={() => window.print()}
          className={iconClass}
        >
          <FaPrint />
        </span>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <NavigationBar />
      <div onMouseUp={handleSelection} className="grid md:mx-14 sm:mx-4 md:grid-cols-3 sm:grid-cols-1">
        <div className="col-span-2 mt-6">
          <h3 onClick={() => router.push(`/${category}`)} className="underline-offset-8 capitalize cursor-pointer underline mb-2 text-2xl text-blue-500 py-3" >{news?.category}</h3>

          <h1 className="text-4xl mb-3 font-semibold">{news?.heading}</h1>

          {/* Listening feature  start*/}
          <div className="cursor-pointer border-2 border-gray-200 px-6 py-4 rounded-2xl my-5 max-w-sm">
            <h5 className="text-xl text-gray-800 font-semibold">Listen Now</h5>
            <div className="flex gap-3 mt-2">
              <FaPlay onClick={() => playNow(news?.description?.join())} />{" "}
              <FaPause onClick={pause} /> <FaStop onClick={stop} />{" "}
              <span>Speed {speed}</span>
              <input type="range" name="speed" id="speed" min=".5" max="3" step=".5" onChange={(e) => setSpeed(e.target.value)} defaultValue={speed} />
            </div>
          </div>

          {/* Listening feature  end*/}
          <div className="md:flex items-end justify-between mb-2 ">
            <div>
              <p className="font-bold">{news?.reporter}</p>
              <p>Publish Date: {news?.publishedDate}</p>
            </div>
            <Actions />
          </div>
          <hr />
          <img src={news?.images?.img1} className=" py-3 w-full" alt={news?.title} />

          {news?.description?.slice(0, 5).map((newsP, i) => <p key={i} className="pb-5  w-11/12 mx-auto"> {newsP}</p>)}
          {
            news?.images?.img2 && <img className="w-8/12 mx-auto" src={news?.images?.img2} alt='img2' />
          }
          {news?.description?.slice(6, 10).map((newsP, i) => <p key={i} className="pb-5  w-11/12 mx-auto"> {newsP}</p>)}
          {
            news?.images?.img3 && <img src={news?.images?.img3} alt='img3' />
          }
          {news?.description?.slice(11, 15).map((newsP, i) => <p key={i} className="pb-5  w-11/12 mx-auto"> {newsP}</p>)}
          {
            news?.images?.img4 && <img className="w-8/12 mx-auto" src={news?.images?.img4} alt='img4' />
          }
          {news?.description?.slice(16, 20).map((newsP, i) => <p key={i} className="pb-5  w-11/12 mx-auto"> {newsP}</p>)}
          {
            news?.images?.img5 && <img className="w-8/12 mx-auto" src={news?.images?.img5} alt='img5' />
          }
          {news?.description?.slice(21, 25).map((newsP, i) => <p key={i} className="pb-5  w-11/12 mx-auto"> {newsP}</p>)}
          {
            news?.images?.img6 && <img className="w-8/12 mx-auto" src={news?.images?.img6} alt='img6' />
          }

          <Paper sx={{ padding: 1 }}>
            {user.email && <div className="flex items-center gap-3">
              {
                likes.includes(user.email) ? <div title='Unlike the news'>
                  <ThumbUpIcon onClick={() => handleUnLike(news._id)} sx={{ fontSize: 35, cursor: 'pointer', color: "#1976d2", marginLeft: 1 }} />
                </div> : <div title='Give thumbs up'>
                  <ThumbUpOutlinedIcon onClick={() => handleLike(news._id)} sx={{ fontSize: 35, cursor: 'pointer', marginLeft: 1 }} />
                </div>
              }
              <span className="mt-3 mb-1 font-semibold">{likes.length || 0} likes</span>
            </div>}
            {/* Selection Item */}

            {/* Show after selection */}
            <div className="border-y border-gray-300 flex items-center justify-between">
              <h2 className="text-xl font-semibold py-3 ml-2">Comments</h2>
              <Actions />
            </div>
            <div className="flex justify-between items-center border-y border-gray-300">
              <h2 className="text-xl py-3 ml-2">{comments ? "Al Comments" : "No Comments yet"}</h2>

              <div>
                <span>Sort by: </span>
                <select name="Sort by" id="Sort by">
                  <option value="">Newest</option>
                  <option value="">Oldest</option>
                </select>
              </div>
            </div>
            <div>
              {/* <h1>{success?.map(item=><h1 key={item.comment}>{item.comment}</h1>)}</h1> */}
              <form onSubmit={handleComment}>
                <TextField fullWidth label="Comment here"
                  onChange={(e) => setCommentText(e.target.value)}
                  type="text" variant="outlined"
                />
                <Button type="submit" variant="contained" color="secondary" sx={{ marginTop: 1, paddingX: 5 }}> Comment</Button>
              </form>

              <div style={{ maxHeight: '400px', overflow: 'scroll' }}>
                {comments?.map((item) => (
                  <div
                    key={item.date}
                    className="w-full flex p-3 pl-4 items-center  rounded-lg cursor-pointer border-b-2"
                  >
                    <div className="mr-4">
                      <div className="h-9 w-19 rounded-sm flex items-center justify-center text-3xl">
                        <img
                          className="inline object-cover w-12 h-12 mr-2 rounded-full"
                          src={item.img}
                          alt="Pro"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.name}  <span className="ml-3 text-xs text-gray-500">{item.date}</span></div>
                      <div className="text-base text-gray-500">{item.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Paper>

        </div>

        <div className="col-span-1 sticky">
          <p className="mx-10 my-5 py-3 mb-3 underline text-xl">
            You may also read
          </p>
          {remaining?.slice(0, 6).map((item) => {
            return (
              <div onClick={() => router.push(`/${item?.category}/${item?.subCategory}/${item?._id}`)} className="cursor-pointer" key={item._id}>
                <div className="mx-10 my-5 pb-4 border-b border-gray-300">
                  <h2 className="text-xl font-semibold">{item?.heading}</h2>
                  <div className="flex">
                    <p>{item?.description[0].slice(0, 70)}</p>
                    <img
                      className="w-5/12"
                      src={item?.images?.img1}
                      alt={item.title}
                    />
                  </div>
                  <p>{`${formatDistanceToNow(new Date(news.publishedDate))} ago`}</p>
                </div>
              </div>)
          })}
        </div>
      </div>
      <Footer newses={newses} bengaliNews={bengaliNews} />
      <Modal
        open={openqr}
        onClose={handleCloseqr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={qrstyle}>
          <QRCode
            id="qr-gen"
            value={url}
            size={290}
            level={"H"}
            includeMargin={true}
          />
          <button className="border bg-red-500 rounded block py-3 px-5 text-white" onClick={downloadQRCode}>Download QR Code</button>
        </Box>
      </Modal>
      <div
        style={{ left: xValue - 70 + "px", top: yValue - 60 + "px" }}
        className={
          showTextOption ? "afterSelectBtn showOption" : "afterSelectBtn"
        }
      >
        <button onClick={addToNote}>
          <MdOutlineEditNote className="pointer-events-none" />
        </button>
        <button onClick={shareOnTwitter}>
          <AiOutlineTwitter className="pointer-events-none" />
        </button>
        <button onClick={faceBookShare}>
          <MdFacebook className="pointer-events-none" />
        </button>
      </div>
      <NoteBar
        isShowNoteBar={isShowNoteBar}
        setIsShowNoteBar={setIsShowNoteBar}
        selectedText={selectedText}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        action={action}
      >
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: "100%" }}>
          News Link Copied!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Newsdetails;

export const getStaticProps = async () => {
  const res = await axios.get(`https://ajker-barta.vercel.app/api/news/`);
  const bengali = await axios.get(`https://ajker-barta.vercel.app/api/bnnews`);
  return {
    props: {
      englishNews: res.data,
      bengaliNews: bengali.data,
    },
    revalidate: 10,
  };
};
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}