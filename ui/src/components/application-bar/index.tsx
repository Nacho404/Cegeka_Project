import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "./avatar-initials-generator";
import DropDownMenu from "./dropdown-profile-menu";
import RenderMenuOptions from "./render-menu";
import store from "../../store/store";
import { UserRoles } from "../../core/types";

const ResponsiveAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDropDown = Boolean(anchorEl);
  const navigate = useNavigate();
  const state = store.getState()
  const user = state.user

  const handleClickOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickCloseProfile = () => {
    setAnchorEl(null);
  };

  function redirectAccordingRole(){
    if(state.user.role == UserRoles.Administrator){
      navigate('/nomenclatoare');
    }

    if(state.user.role == UserRoles.Architect){
      navigate('/proiecte');
  }
  
  }
  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ApartmentIcon></ApartmentIcon>
          <Button onClick={redirectAccordingRole}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'white', mr: 2, display: "flex" }}>
              NBC Architect
            </Typography>
          </Button>

          {RenderMenuOptions(user)}

          {user.email != null ? (
            <>
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="Open settings">
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={handleClickOpenProfile}
                    aria-controls={openDropDown ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openDropDown ? 'true' : undefined}>
                    <Avatar
                      alt="A S"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <DropDownMenu handleClickCloseProfile={handleClickCloseProfile} anchorEl={anchorEl} openDropDown={openDropDown} stringAvatar={stringAvatar}></DropDownMenu>
            </>
          ) : null}

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;


