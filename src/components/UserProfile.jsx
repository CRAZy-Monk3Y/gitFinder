import React from "react";
import { Badge, Button, Container, Image, Row, Stack } from "react-bootstrap";
import "./UserProfile.css";
import Repos from "./Repos";

const UserProfile = ({ userData, loading }) => {

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
  return (
    userData && (
      <>
        <Container className="mt-4 p-4 border border-success rounded">
          <Row xs={2} md={2}>
            <Stack gap={3} style={{ width: "25%" }}>
              <Image width={"150px"} src={userData?.avatar_url} roundedCircle />
              <Button style={{ width: "150px" }} variant="success">
                <a href={userData.html_url} target="_blank">
                  View Profile
                </a>
              </Button>
            </Stack>
            <div
              className="d-flex flex-column"
              style={{ width: "75%", overflow: "clip", wordWrap: "wrap" }}
            >
              <Stack direction="horizontal" gap={2}>
                <Badge bg="warning">
                  PUBLIC REPOS: {userData.public_repos}
                </Badge>
                <Badge bg="secondary">
                  PUBLIC GISTS: {userData.public_gists}
                </Badge>
                <Badge bg="primary">FOLLOWERS: {userData.followers}</Badge>
                <Badge bg="success">FOLLOWING: {userData.following}</Badge>
              </Stack>
              <h3 className="text_green mt-3">{userData.name}</h3>
              <p className="text_green mt-2">{userData.bio}</p>
              <Stack className="mt-2">
                <p className="details">
                  <span className="text_green">Company:</span>{" "}
                  {userData.company || "Not Specified"}
                </p>
                <p className="details">
                  <span className="text_green">Location:</span>{" "}
                  {userData.location || "Not Specified"}
                </p>
                <p className="details">
                  <span className="text_green">Blog / Website:</span>{" "}
                  {userData.blog ? (
                    <a href={userData.blog} target="_blank">
                      {userData.blog}
                    </a>
                  ) : (
                    "Not Specified"
                  )}
                </p>
                <p className="details">
                  <span className="text_green">Member Since:</span>{" "}
                  {new Date(userData.created_at).toLocaleDateString()}
                </p>
              </Stack>
            </div>
          </Row>
        </Container>
        

        <Repos reposUrl={userData?.repos_url} />
      </>
    )
  );
};

export default UserProfile;
