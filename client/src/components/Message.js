import React from "react";
import {Link, useParams} from "react-router-dom";
import messagesDB from "../messagesDB";

import {MotionScene, SharedElement, MotionScreen} from "react-motion-layout";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton} from "@material-ui/core";


import SendIcon from '@material-ui/icons/Send';



export default function Messages() {
    const {messageId} = useParams();

    const item = messagesDB[messageId || 0];


    return  (
        <MotionScreen>
            <MotionScene
                name={`message-${messageId}`}
                easing="cubic-bezier(0.22, 1, 0.36, 1)"
            >
                <div className="flex flex-col h-screen">
                    <div className="flex p-4 cursor-pointer hover:bg-gray-100 items-center">
                        <div className="mr-4">
                            <IconButton component={Link} to="/messages">
                                <ArrowBackIcon/>
                            </IconButton>
                        </div>
                        <SharedElement.Image
                            alt=""
                            className="w-16 h-16 rounded-full"
                            src={item.avatar}
                            animationKey="avatar"
                        />

                        <div className="flex justify-between w-full ml-4 mt-2">
                            <div className="flex flex-col">
                                <SharedElement.Text
                                    className="font-semibold text-xl"
                                    animationKey="name"
                                >
                                    {item.name}
                                </SharedElement.Text>
                                <div className={`text-sm font-medium text-green-500`}>
                                    Active now
                                </div>
                            </div>
                            <div className={`text-xs ${item.unread ? "" : "text-gray-500"}`}>
                                profile | settings
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex w-full justify-start">
                            <div
                                className="p-4 w-1/2 bg-gray-400 rounded-lg m-4"
                                style={{borderRadius: 40}}
                            >
                                {item.messages[1].text}
                            </div>
                        </div>
                        <div className="flex w-full justify-end items-center">
                            <div
                                className="flex p-4 w-1/2 bg-blue-600 text-white rounded-lg m-4"
                                style={{borderRadius: 40}}
                            >
                                {item.messages[0].text}
                            </div>
                            <img
                                alt=""
                                className="w-5 h-5 rounded-full border-white mr-4"
                                src={item.avatar}
                            />
                        </div>
                    </div>
                    <div className="ml-4 flex mt-auto mb-2">
                        <input type="text" placeholder="Type your message"
                               className="border-5 w-96% bg-gray-500 rounded-3xl p-3 bg-opacity-25"/>
                        <span className="text-2xl mx-4 mt-2"><SendIcon className="cursor-pointer"
                                                                       fontSize="large" color="primary"/></span>
                    </div>
                </div>
            </MotionScene>
        </MotionScreen>)

};
