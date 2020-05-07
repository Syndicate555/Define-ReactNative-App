import React from "react";

const UserContext = React.createContext({
  user: {
    id: null,
    name: '',
    handle: '',
    followers: [],
    following: [],
    description: '',
    avatarUrl: '',
    challenges: [],
    socialMedia: [],
  },
  setUser: null
});

export default UserContext;
