import React from 'react';
import '../styles/ContactList.css'
import {Avatar} from "@material-ui/core";

const Contact = ({name, avatar, online}) => (
    <div className="Contact">
        <Avatar className="avatar" src={avatar} alt="avatarImg" />
        <div className="status">
            <p className="name">{name}</p>
            <span className={online ? "status-online" : "status-offline"}></span>
            <span className="status-text">{online ? "online" : "offline"}</span>
        </div>
    </div>
)

export default Contact;