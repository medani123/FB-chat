import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../Firebase";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-Id": "0b736c04-9e1c-4baf-928a-dcdbbfdc1e4a",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "48f7a34c-1ada-4a67-a4a9-19c38edb6052",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, history]);

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>FB chat</div>
        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='0b736c04-9e1c-4baf-928a-dcdbbfdc1e4a'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
