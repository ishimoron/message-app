import React from "react";
import Contact from "./Contact";

const list = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX34l5Vy7K3aMXNcl8V7ncTVf8Nwfsic6O9FOkwEYKw4-zwLLh&s",
    name: "Kevin Parage",
    online: true
  },
  {
    avatar:
      "http://www.moving-up.fr/wp-content/uploads/2017/05/corinneleycharles.jpg",
    name: "Corrine Russo",
    online: false
  },
  {
    avatar: "https://www.babelio.com/users/AVT_Juliette-Lemaitre_8819.jpg",
    name: "Juliette Boyrie",
    online: true
  },
  {
    avatar:
      "https://vignette.wikia.nocookie.net/schtroumpfs/images/7/73/Le-Grand-Schtroumpf_original_backup.jpg/revision/latest?cb=20150309140805&path-prefix=fr",
    name: "Grand Schtroumpf",
    online: true
  },
  {
    avatar:
      "https://photos.lci.fr/images/613/344/rambo-820x490-e55f6f-0@1x.jpeg",
    name: "John Rambo",
    online: false
  }
];

const ContactList = () => (
  <div>
    {list.map((item) => (
      <Contact avatar={item.avatar} name={item.name} online={item.online} />
    ))}
  </div>
);

export default ContactList;
