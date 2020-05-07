import React from "react";

const LoggedInUserContext = React.createContext({
  user: {
    id: null,
    name: '',
    handle: '',
    followersCount: null,
    followingCount: null,
    followers: null,
    following: null,
    description: null,
    avatarUrl: null,
    challenges: null,
    socialMedia: null,
  },
  setUser: null
});

export default LoggedInUserContext;
