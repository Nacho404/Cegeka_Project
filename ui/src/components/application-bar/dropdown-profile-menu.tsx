import { Logout } from "@mui/icons-material";
import { Avatar, Button, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { logout } from "../../services/logout.api.service";
import store from '../../store/store'

interface TProps {
    handleClickCloseProfile: any,
    anchorEl: any,
    openDropDown: boolean,
    stringAvatar: any,
}

export default function DropDownMenu(props: TProps) {
    const state = store.getState();
    return (
        <Menu
            anchorEl={props.anchorEl}
            open={props.openDropDown}
            onClose={props.handleClickCloseProfile}
            id="account-menu"
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 10,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem
                style={{ pointerEvents: 'none' }}
            >
                <Avatar {...props.stringAvatar(state.user.name)} /> {state.user.name}
            </MenuItem>

            <MenuItem
                style={{ pointerEvents: 'none' }}>
                {state.user.email}
            </MenuItem>

            <Divider></Divider>

            <MenuItem>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <Button variant="contained" onClick={() => {
                    logout().then(() => window.location.reload());
                }} type="submit" color="error">Logout</Button>
            </MenuItem>

        </Menu>
    );
}