import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import { MdEdit } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import ImgLoader from "../components/ImgLoader";
import { userLoginInfo } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserData = useSelector((state) => state.user.userInfo);
  const [coverImg, setCoverImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = function () {
    localStorage.removeItem("userLoginInfo");
    dispatch(userLoginInfo(null));
    navigate("/login");
  };

  useEffect(() => {
    setIsLoading(true);
    onValue(ref(db, "users/" + currentUserData.uid), (snapshot) => {
      setCoverImg(snapshot.val().coverImg);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-dark-300">
        <MainContainer>
          <div className="aspect-[2.5] overflow-hidden rounded-bl-xl rounded-br-xl bg-dark-200">
            {isLoading ? (
              <ImgLoader />
            ) : (
              <picture>
                <img className="w-full" src={coverImg} alt="" />
              </picture>
            )}
          </div>
          <div className="mx-4 gap-x-8 md:mx-16 md:flex">
            <div className="mb-[-2.75rem] flex -translate-y-[calc(50%-1rem)] justify-center">
              <picture>
                <img
                  className="aspect-square w-[125px] rounded-full border-4 border-dark-300 bg-yellow-300 md:w-[175px]"
                  src={currentUserData.photoURL}
                  alt="profile-img"
                />
              </picture>
            </div>
            <div className="mb-8 flex flex-col gap-y-6 text-center md:hidden">
              <div>
                <h2 className="text-2xl text-white">
                  {currentUserData.displayName}
                </h2>
                <p className="text-slate-200">500 friends</p>
              </div>
              <div className="mb-4 flex gap-x-2 self-center">
                <button className="flex items-center gap-x-1 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white duration-150 hover:bg-green-700" onClick={()=>navigate("/editprofile")}>
                  <MdEdit />
                  Edit profile
                </button>
                <button
                  className="flex items-center gap-x-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white duration-150 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  <FaPowerOff />
                  Log Out
                </button>
              </div>
            </div>
            <div className="mt-3 hidden w-full justify-between md:flex">
              <div>
                <h2 className="text-5xl text-white">
                  {currentUserData.displayName}
                </h2>
                <p className="text-lg text-slate-200">500 friends</p>
              </div>
              <div className="mb-4 flex gap-x-4 self-center">
                <button className="flex items-center gap-x-1 rounded-lg bg-green-600 px-4 py-2 text-lg font-semibold text-white duration-150 hover:bg-green-700" onClick={()=>navigate("/editprofile")}>
                  <MdEdit />
                  Edit profile
                </button>
                <button
                  className="flex items-center gap-x-1 rounded-lg bg-red-600 px-4 py-2 text-lg font-semibold text-white duration-150 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  <FaPowerOff />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
    </>
  );
}

export default Profile;
