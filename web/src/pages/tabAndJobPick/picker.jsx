import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Picker = ({ conversation }) => {
  const [task, setUser] = useState(conversation);


  return (
    <>
      {task && (
        <div className="conversation">
          {/* <img
            className="conversationImg"
            src={
              user?.avatar
                ? user?.avatar
                : "https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?ssl=1"
            }
            alt=""
          /> */}
          <span className="conversationName">{task?.taskname}</span>
        </div>
      )}
    </>
  );
};

export default Picker;
