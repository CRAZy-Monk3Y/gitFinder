import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Stack, Toast } from "react-bootstrap";
import "./Repo.css";

const Repos = ({ reposUrl }) => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: "" });

  useEffect(() => {
    const getRepos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        setRepos(data);
      } catch (error) {
        setAlertMessage({ message: error.message });
      } finally {
        setIsLoading(false);
      }
    };
    getRepos();
  }, [reposUrl]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text_green text-center my-2">REPOSITORIES</h2>
      <div className="repo_details">
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
        {repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .map((repo, index) => {
            if (index > 4 && !showDetails) return null;
            return (
              <div className="d-flex my_card" key={index}>
                <div className="d-flex flex-column m-3">
                  <a href={repo.html_url} className="black w_full">
                    {repo.name}
                  </a>
                  <Badge bg="success lang">
                    Language: {repo.language || "None"}
                  </Badge>
                </div>
                <div className="m-auto">
                  <Stack direction="horizontal" gap={2}>
                    <Badge bg="warning">STARS: {repo.stargazers_count}</Badge>
                    <Badge bg="info">FORKS: {repo.forks_count}</Badge>
                    <Badge bg="primary">WATCHERS: {repo.watchers_count}</Badge>
                  </Stack>
                </div>
              </div>
            );
          })}

        {showDetails && (
          <div className="d-flex">
            <Button className="mb-4" onClick={() => setShowDetails(false)}>
              Show Less
            </Button>
          </div>
        )}

        {!showDetails && repos.length > 5 && (
          <div className="d-flex">
            <Button className="mb-4" onClick={() => setShowDetails(true)}>
              Show More
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Repos;
