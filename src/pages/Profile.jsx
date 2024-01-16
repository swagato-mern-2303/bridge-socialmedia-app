import { useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import { MdEdit } from "react-icons/md";
import Navbar from "../components/Navbar";

function Profile() {
  const currentUserData = useSelector((state) => state.user.userInfo);

  return (
    <>
      <Navbar />
      <div className="bg-dark-300">
        <MainContainer>
          <div>
            <picture>
              <img
                className="w-full rounded-bl-xl rounded-br-xl"
                src="https://placehold.co/851x315?text=placeholder"
                alt=""
              />
            </picture>
          </div>
          <div className="mx-16 flex gap-x-8">
            <div className="-translate-y-[calc(50%-1rem)]">
              <picture>
                <img
                  className="border-dark-300 aspect-square w-[160px] rounded-full border-4 bg-yellow-300"
                  src={currentUserData.photoUrl}
                  alt="profile-img"
                />
              </picture>
            </div>
            <div className="mt-3 flex w-full justify-between">
              <div>
                <h2 className="text-5xl text-white">Name name</h2>
                <p className="text-lg text-slate-200">500 friends</p>
              </div>
              <div className="mb-4 self-center">
                <button className="bg-dark-200 hover:bg-dark-100 flex items-center gap-x-1 rounded-lg px-4 py-2 text-lg font-semibold text-white duration-150">
                  <MdEdit size={20} />
                  Edit profile
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
