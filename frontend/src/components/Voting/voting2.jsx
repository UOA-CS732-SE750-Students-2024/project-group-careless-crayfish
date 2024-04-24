import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";

export const Voting = () => {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const [votes, setVotes] = useState([0, 0, 0, 0]);
  const [voted, setVoted] = useState([false, false, false, false]);
  const [isVoteCreated, setIsVoteCreated] = useState(false);
  const languages = ["PHP", "Python", "React", "Java"];

  // Function to increment local votes
  const incrementVote = (index) => {
    if (!voted[index]) {
      const newVotes = [...votes];
      newVotes[index] += 1;
      setVotes(newVotes);
      const newVoted = [...voted];
      newVoted[index] = true;
      setVoted(newVoted);
    }
  };

  // Function to save the initial vote configuration to the database
  const createVote = async () => {
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Choose your favorite technology!",
        options: languages.map((lang, index) => ({
          option: lang,
          count: votes[index],
        })),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate(`/voting/${data.voteId}`); // Redirect to the newly created voting page
      setIsVoteCreated(true);
    } else {
      alert("Failed to create vote");
    }
  };

  // Function to confirm votes and update the database
  const confirmVotes = async () => {
    const response = await fetch(`/api/votes/${voteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        options: languages.map((lang, index) => ({
          option: lang,
          count: votes[index],
        })),
      }),
    });
    const updatedVote = await response.json();
    if (response.ok) {
      setVotes(updatedVote.options.map((opt) => opt.count));
      setVoted(new Array(languages.length).fill(false)); // Reset voting status
    } else {
      alert("Failed to update votes");
    }
  };

  return (
    <div className="vote-card">
      {!isVoteCreated ? (
        <button onClick={createVote}>Create Vote</button>
      ) : (
        languages.map((lang, index) => (
          <div
            className={`card-item ${voted[index] ? "voted" : ""}`}
            key={lang}
          >
            <div>
              <span className="vote-count">{votes[index]}</span>
              <h3>{lang}</h3>
            </div>
            <button
              className={`btn ${voted[index] ? "voted" : ""}`}
              onClick={() => incrementVote(index)}
              disabled={voted[index]} // Disable after voting
            >
              Vote
            </button>
          </div>
        ))
      )}
      {isVoteCreated && <button onClick={confirmVotes}>Confirm Votes</button>}
    </div>
  );
};
