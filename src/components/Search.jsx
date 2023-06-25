import React, { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const Search = ({ setUserData, setLoading }) => {
  const [query, setQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState({ message: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    // check if we have a query
    if (!query || query.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      const resp = await res.json();
      if (resp.message) {
        setAlertMessage({ message: resp.message });
      }
      // setQuery(resp);
      // console.log(resp);
      setUserData(resp);
      addUserToLocalStorage(resp, query);
    } catch (error) {
      setAlertMessage({ message: error.message });
      setUserData(null);
    } finally {
      setLoading(false);
    }

    // reset the field
    // setQuery("");
  }

  const addUserToLocalStorage = (resp, userName) => {
    const users = JSON.parse(localStorage.getItem("github_users")) || [];
    const userExists = users.find((user) => user.id === userName);
    if (userExists) {
      users.splice(users.indexOf(userExists), 1);
    }
    users.unshift({
      id: userName,
      avatar_url: resp.avatar_url,
      name: resp.name,
      url: resp.html_url,
    });
    localStorage.setItem("github_users", JSON.stringify(users));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Enter User Id (eg. CRAZy-Monk3Y) "
        />
      </Form.Group>
      <Button className="btn-success mt-2" type="submit">
        Search User
      </Button>
      <Toast
        className="mt-4"
        show={alertMessage?.message.length > 0}
        onClose={() => setAlertMessage({ message: "" })}
        bg="danger"
        delay={5000}
        autohide
      >
        <Toast.Body style={{ textAlign: "center" }}>
          {alertMessage.message}
        </Toast.Body>
      </Toast>
    </Form>
  );
};

export default Search;
