import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const FolderList = ({ _id, name, img, score }) => (
  <div className="List">
    <Link
      to={`/backoffice/players/${_id}`}
      className="link-userlist"
      onClick={() => window.scrollTo(0, 0)}
    >
      <Avatar
        src={img && `https://ucarecdn.com/${img}`}
        alt="avatar"
        className="user-avatar"
      >
        {!img && name.charAt(0)}
      </Avatar>
      <div className="user-info">
        <h3>{name}</h3>
        <h4>Score: {score}</h4>
      </div>
    </Link>
  </div>
);

export default FolderList;
