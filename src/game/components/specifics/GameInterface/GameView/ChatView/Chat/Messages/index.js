import React from 'react'

import './Messages.scss';

const Messages = ({ messages }) => {

  const getDate = timestamp => {
    const d = new Date(timestamp);
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    if(s < 10) s = `0${s}`;
    if(m < 10) m = `0${m}`;
    if(h < 10) h = `0${h}`;
    return `${h}:${m}:${s}`;
  }

  return(
    <div className="Messages">
      <div className="messages">
        {messages.map(message => (
          <p
            key={`${message.timestamp}${message.username}`}
            className="message"
          >
            <span className="date">{ getDate(message.timestamp) }</span>
            <span className="username">{ message.username }: </span>
            <span className="content">{ message.content }</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Messages;
