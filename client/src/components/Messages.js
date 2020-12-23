import React, {useCallback, useContext, useState} from 'react';
import MessagesDB from "../messagesDB";
import {useHistory} from "react-router-dom";


import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';


import {
    MotionScene,
    MotionScreen,
    SharedElement,
    useMotion
} from "react-motion-layout";
import {Avatar, ListItemIcon, ListItemText} from "@material-ui/core";
import {Menu, IconButton, MenuItem} from '@material-ui/core';
import {AuthContext} from "../context/AuthContext";


const Messages = ({item, id}) => {

    const auth = useContext(AuthContext)

    function ItemComponent({item, id}) {
        const history = useHistory();
        const withTransition = useMotion(`message-${id}`);
        const callback = useCallback(() => history.push(`/message/${id}`), [
            history,
            id
        ]);

        return (
            <MotionScene
                easing="cubic-bezier(0.22, 1, 0.36, 1)"
                name={`message-${id}`}
                onClick={withTransition(callback)}
            >
                <div className="flex p-4 cursor-pointer hover:bg-gray-200">
                    <SharedElement.Image
                        alt=""
                        className="w-16 h-16 rounded-full"
                        src={item.avatar}
                        animationKey="avatar"
                    />
                    <div className="flex justify-between w-full ml-4 mt-2">
                        <div className="flex flex-col">
                            <SharedElement.Text className="font-semibold" animationKey="name">
                                {item.name}
                            </SharedElement.Text>
                            <div
                                className={`text-sm font-medium ${
                                    item.unread ? "text-gray-800" : "text-gray-500"
                                }`}
                            >
                                {item.text}
                            </div>
                        </div>
                        <div className={`text-xs ${item.unread ? "" : "text-gray-500"}`}>
                            {item.time}
                        </div>
                    </div>
                </div>
            </MotionScene>
        );
    }

    const [menu, setMenu] = useState(null);
    const [dialog, setDialog] = useState(null)
    const open = Boolean(menu);
    const ITEM_HEIGHT = 48;

    const menuOpen = (e) => {
        setMenu(e.currentTarget);
    }

    const menuClose = (e) => {
        setMenu(false);
    }

    const dialogOpen = () => {

    }

    const dialogClose = () => {

    }

    return (
        <MotionScreen>
            <div className="mt-4">
                <div className="flex items-center">
                    <Avatar src={PersonIcon} className="ml-4"/>
                    <h1 className="p-4 text-4xl font-bold ">Messages</h1>
                    <div className="flex justify-end w-screen cursor-pointer mr-6">
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={menuOpen}
                        >
                            <CreateIcon/>
                        </IconButton>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={menuOpen}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={menu}
                            keepMounted
                            open={open}
                            onClose={menuClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </MenuItem>
                            <MenuItem onClick={auth.logout}>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Exit"/>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

                {MessagesDB.map((item, id) => (
                    <ItemComponent item={item} id={id} key={id}/>
                ))}
            </div>
        </MotionScreen>
    );
};

export default Messages;
