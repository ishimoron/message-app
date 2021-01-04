import React, {useCallback, useContext, useState} from 'react';
import MessagesDB from "../messagesDB";
import {useHistory} from "react-router-dom";


import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import BlockIcon from '@material-ui/icons/Block';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
    MotionScene,
    MotionScreen,
    SharedElement,
    useMotion
} from "react-motion-layout";
import {
    AppBar,
    Avatar,
    Dialog, DialogContent, DialogTitle, Divider, List, ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Switch,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu, IconButton, MenuItem, TextField} from '@material-ui/core';
import {AuthContext} from "../context/AuthContext";

const Messages = ({item, id}) => {

    const useStyles = makeStyles((theme) => ({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }));
    const classes = useStyles()
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
    const [dialog, setDialog] = useState(false)
    const [preferences, setPreferences] = useState(false)
    const open = Boolean(menu);
    const ITEM_HEIGHT = 48;

    const menuOpen = (e) => {
        setMenu(e.currentTarget);
    }

    const menuClose = (e) => {
        setMenu(false);
    }

    const dialogOpen = () => {
        setDialog(true)
    }

    const dialogClose = () => {
        setDialog(false)
    }

    const preferencesOpen = () => {
        setPreferences(true)
        setMenu(false)
    }

    const preferencesClose = () => {
        setPreferences(false)
    }


    //Switch

    const [switchHandler, setSwitchHandler] = useState({
        checked: true,
    });

    const handleChange = (event) => {
        setSwitchHandler({[event.target.name]: event.target.checked});
    };


    return (
        <MotionScreen>
            <div className="mt-4">
                <div className="flex items-center">
                    <Avatar className="ml-5"><PersonIcon/></Avatar>
                    <h1 className="p-4 text-4xl font-bold">Messages</h1>
                    <div className="flex justify-end w-screen mr-6">
                        <Dialog fullScreen open={dialog} onClose={dialogClose}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={dialogClose} aria-label="close">
                                        <CloseIcon/>
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}>
                                        Find User
                                    </Typography>
                                    {/*<Button autoFocus color="inherit" onClick={dialogClose}>*/}
                                    {/*    save*/}
                                    {/*</Button>*/}
                                </Toolbar>
                            </AppBar>
                            <List>
                                <ListItem>
                                    <TextField fullWidth placeholder="Find user"/>
                                </ListItem>
                                <Divider/>
                                {MessagesDB.map((item, id) => (
                                    <ItemComponent item={item} id={id} key={id}/>
                                ))}
                            </List>
                        </Dialog>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={dialogOpen}
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
                            <Dialog onClose={preferencesClose} aria-labelledby="customized-dialog-title"
                                    open={preferences}>
                                <DialogTitle id="customized-dialog-title" onClose={preferencesClose}
                                             className="text-center">
                                    Preferences
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        <span className="text-2xl font-bold text-gray-900">Account</span>
                                    </Typography>
                                    <Typography component={'div'} gutterBottom>
                                        <div className="flex cursor-pointer p-5 rounded-md hover:bg-gray-200 mb-3">
                                            <Avatar className="text-2xl"><PersonIcon/></Avatar>
                                            <div className="flex flex-col ml-3">
                                                <span className="text-base text-gray-900">Name Profile</span>
                                                <span className="text-gray-400">Change your information</span>
                                            </div>
                                        </div>
                                        <hr/>
                                    </Typography>
                                    <Typography component={'div'} gutterBottom>
                                        <div className="flex cursor-pointer p-5 rounded-md hover:bg-gray-200 mb-3">
                                            <VisibilityIcon/>
                                            <div className="flex flex-col ml-3">
                                                <span className="text-base text-gray-900">Disable Online status</span>
                                            </div>
                                        </div>
                                        <hr/>
                                    </Typography>
                                    <Typography component={'div'} gutterBottom>
                                        <div className="flex cursor-pointer p-5 rounded-md hover:bg-gray-200 mb-3">
                                            <BlockIcon/>
                                            <div className="flex flex-col ml-3">
                                                <span className="text-base text-gray-900">Manage blocking</span>
                                            </div>
                                        </div>
                                        <hr/>
                                    </Typography>
                                    <Typography component={'div'} gutterBottom>
                                        <span className="text-2xl font-bold text-gray-900">Notifications</span>
                                    </Typography>
                                    <Typography component={'div'} gutterBottom>
                                        <div className="flex p-5 ">
                                            <VolumeUpIcon/>
                                            <div className="flex flex-col ml-3 mb-3">
                                                <span className="text-base text-gray-900">Notification sounds</span>
                                                <span className="text-gray-400">Use sound notifications for incoming messages, calls and video chats.</span>
                                                <span className="flex justify-center">
                                                    <Switch
                                                        checked={switchHandler.checked}
                                                        onChange={handleChange}
                                                        color="primary"
                                                        name="checked"
                                                        inputProps={{'aria-label': 'primary checkbox'}}
                                                        size="medium"
                                                    />
                                                </span>

                                            </div>
                                        </div>
                                        <hr/>
                                    </Typography>
                                </DialogContent>
                            </Dialog>
                            <MenuItem onClick={preferencesOpen}>
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
                <div className="m-5">
                    <input type="text" placeholder="Find in messenger"
                           className="leading-tight placeholder-gray-400 text-xl"/>
                </div>

                {MessagesDB.map((item, id) => (
                    <ItemComponent item={item} id={id} key={id}/>
                ))}
            </div>
        </MotionScreen>
    );
};

export default Messages;
