import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout, MdPerson, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../state/thunk/auth/logoutThunk";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const { user_auth: user } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.userProfile);

  const handleLogOut = () => {
    dispatch(logoutThunk());
    setAnchorEl(null);
    navigate("/");
  };

  const menuItems = [
    {
      text: "Profile",
      icon: MdPerson,
      onClick: () => {
        navigate("/profile");
        setAnchorEl(null);
      },
    },
    {
      text: "Log out",
      icon: MdLogout,
      onClick: handleLogOut,
    },
  ];

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <header className="bg-white z-50 sticky top-0 h-16 py-4 px-6 md:px-8 flex justify-between items-center shadow-lg bg-gradient-to-r from-blue-400 to-pink-400">
      <div>
        <Link to="/" className="text-3xl text-white">
          Ola
        </Link>
      </div>
      <div>
        <div className="md:space-x-4 flex space-x-2 items-center">
          <div onClick={() => navigate("/cart")} className="mr-4 hidden md:block">
            <IconButton>
              <MdShoppingCart color="#000" />
            </IconButton>
          </div>
          {!user && (
            <Link
              className="md:px-6 hidden md:block px-4 py-1 md:py-2 bg-white rounded-3xl hover:bg-blue-400 hover:text-white transition cursor-pointer"
              to="/login"
            >
              Log in
            </Link>
          )}
          {!user && (
            <Link
              className="md:px-6 hidden md:block px-4 py-1 md:py-2 rounded-2xl hover:bg-blue-400 hover:text-white transition cursor-pointer"
              to="/signup"
            >
              Sign up
            </Link>
          )}
          {user && (
            <>
              <Avatar
                src={userData?.user?.avatar?.url}
                sx={{ cursor: "pointer" }}
                onClick={openMenu}
              />
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    py: "0.3em",
                    borderBottom: "1px solid silver",
                  }}
                >
                  {userData?.user?.name}
                </Typography>
                {menuItems.map(({ text, icon: Icon, ...options }) => (
                  <MenuItem 
                  key={text}
                  {...options}>
                    <ListItemIcon>
                      <Icon fontSize={20} />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};