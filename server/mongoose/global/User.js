const { User } = require('../../models/');

exports.signup = ({ username, email, password, avatar, resume }) => {
  const userSave = new User({
    username,
    email,
    password,
    avatar,
    resume,
  });
  return userSave.save();
}

exports.login = ({ email }) => User.findOne({ email });

exports.editProfile = ({
  username,
  email,
  password,
  avatar,
  resume,
  id
}) => User.findByIdAndUpdate(
  id,
  {
    username: username,
    email: email,
    password: password,
    avatar: avatar,
    resume: resume,
  }
);

exports.updateScore = (id, score) => User.findByIdAndUpdate(id, { score });

exports.setOnline = (id, online) => User.findByIdAndUpdate(id, { online });

exports.hasCitadel = (id, hasCitadel) => User.findByIdAndUpdate(id, { hasCitadel });

exports.getUsers = () => User.find().sort({ username: 1 });

exports.getUserById = userId => User.findById(userId);
