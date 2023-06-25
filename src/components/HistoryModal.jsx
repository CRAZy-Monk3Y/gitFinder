import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./HistoryModal.css";

const HistoryModal = () => {
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearchDelete = (id) => {
    const updatedUsers = searchedUsers.filter((user) => user.id !== id);
    setSearchedUsers(updatedUsers);
    localStorage.setItem("github_users", JSON.stringify(updatedUsers));
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("github_users")) || [];
    setSearchedUsers(users);
  }, []);

  if (searchedUsers.length === 0) {
    return <></>;
  }

  return (
    <div className="container">
      {searchedUsers.map((user) => (
        <div
          className="d-flex my-2 p-2 align-items-center contact_details"
          key={user.id}
        >
          <Image
            width={"80px"}
            className="mx-1"
            alt={user.id}
            src={user.avatar_url}
            roundedCircle
          />
          <div className="d-flex flex-column m-1 flex-grow-1">
            <h5 className="">{user.name}</h5>
            <p>{user.id}</p>
          </div>
          <a
            href={user.url}
            className="btn my_btn_style btn-success btn-sm active"
            role="button"
          >
            Visit
          </a>

          <RiDeleteBin5Line
            size={20}
            color="red"
            onClick={() => handleSearchDelete(user.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default HistoryModal;
