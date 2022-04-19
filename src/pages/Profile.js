import { Avatar, Typography, useMediaQuery } from "@mui/material";
import { Container } from "../components/Container";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserData } from "../state/thunk/user/fetchCurrUserData";
import { Loader } from "../components/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Head } from "../components/Head";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const { user_loading, userData } = useSelector((state) => state.userProfile);

  const data = [
    {
      title: "Name",
      value: userData?.user?.name,
    },
    {
      title: "Email",
      value: userData?.user?.email,
    },
    {
      title: "Joined on",
      value: moment(userData?.user?.createdAt).format("MMMM Do YYYY"),
    },
  ];

  useEffect(() => {
    dispatch(fetchCurrentUserData());
  }, [dispatch]);

  useEffect(() => {
    if(user_loading) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [user_loading])

  return (
    <>
      {!user_loading ? (
        <Container classes="flex justify-center">
          <Head title="Profile" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14 h-max lg:h-[70vh] my-4 md:my-10 lg:my-16 md:w-full w-[90%]">
            <div className="h-max md:h-[90%]">
              <Avatar
                src={userData?.user?.avatar?.url}
                sx={{
                  borderRadius: 0,
                  width: "100%",
                  height: mobile ? "90%" : "90%",
                }}
              />
              <button
                onClick={() => navigate("/updateprofile")}
                className="lg:h-[10%] h-[14%] py-2 w-full bg-blue-500 hover:bg-blue-600 text-lg lg:text-xl text-white"
              >
                Edit profile
              </button>
            </div>
            <div className="flex flex-col justify-between h-max lg:h-[90%]">
              <div className="flex flex-col space-y-8">
                {data.map(({ title, value }) => (
                  <div key={title} className="flex flex-col space-y-3">
                    <Typography
                      sx={{
                        color: "#ec4899",
                        borderBottom: "2px solid #ec4899",
                      }}
                      variant={mobile ? "h6" : "h5"}
                    >
                      {title}
                    </Typography>
                    <Typography>{value}</Typography>
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-3 mt-10">
                <button 
                 onClick={() => navigate("/orders")}
                className="bg-pink-700 hover:bg-pink-600 py-2 lg:py-3 text-white text-lg">
                  My orders
                </button>
                <button 
                onClick={() => navigate("/changepassword")}
                className="bg-pink-700 hover:bg-pink-600 py-2 lg:py-3 text-white text-lg">
                  Change password
                </button>
              </div>
            </div>
          </div>
        </Container>
      ) : (
       <>
        <Head title="Loading..."/>
        <Loader />
       </>
      )}
    </>
  );
};