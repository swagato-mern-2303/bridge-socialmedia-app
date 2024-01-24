import { LiaTimesSolid } from "react-icons/lia";

export default function EditProfile({ profileImg, profileName, coverImg, onShowEditProfile }) {
  return (
    <div className="absolute left-0 top-0 h-screen w-full overflow-y-scroll bg-black/70 backdrop-blur-sm">
      <div className="mx-auto my-6 w-[700px] rounded-md  bg-dark-300 py-4 text-light-400">
        <div className="relative border-b border-b-white/20 ">
          <h2 className="pb-3 pt-2 text-center text-2xl font-semibold">
            Edit Profile
          </h2>
          <button className="absolute right-10 top-[40%] -translate-y-1/2 rounded-full bg-dark-200 p-2 text-2xl duration-150 hover:bg-dark-100" onClick={()=>onShowEditProfile(false)}>
            <LiaTimesSolid />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 px-10 py-4 text-xl font-medium">
          <div>
            <div className="flex justify-between">
              <h3>Profile Name</h3>
              <EditButton />
            </div>
            <p className="text-center text-3xl">{profileName}</p>
          </div>
          <div>
            <div className="flex justify-between">
              <h3>Profile Picture</h3>
              <EditButton />
            </div>
            <img
              className="mx-auto my-8 w-[150px] rounded-full"
              src={profileImg}
              alt="profile picture"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <h3>Cover Photo</h3>
              <EditButton />
            </div>
            <img
              className="mx-auto my-8 w-[500px] rounded-lg"
              src={coverImg}
              alt="cover photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditButton() {
  return (
    <button className="rounded-md px-3 py-1 text-lg font-normal text-green-400 duration-150 hover:bg-dark-200">
      Edit
    </button>
  );
}
