import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";

export const Voting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [votes, setVotes] = useState([0, 0, 0, 0]);
  // const [voted, setVoted] = useState([false, false, false, false]);
  const { selectedRestaurants } = location.state || { selectedRestaurants: [] };
  const [votes, setVotes] = useState(selectedRestaurants.map(() => 0));
  const [voted, setVoted] = useState(selectedRestaurants.map(() => false));
  const [voteId, setVoteId] = useState(""); // State to store the generated vote ID
  // const languages = ["PHP", "Python", "React", "Java"];

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

  const createVote = async () => {
    const response = await fetch("http://localhost:3000/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Choose your favorite technology!",
        options: selectedRestaurants.map((lang, index) => ({
          recommend: lang, // Using 'recommend' instead of 'option' to align with database fields
          voteCount: votes[index],
        })),
      }),
    });
    const data = await response.json();
    console.log("data:", data);
    if (response.ok) {
      setVoteId(data.voteId); // Save the vote ID to state
      navigate("/voting/${data.voteId}");
    } else {
      alert("Failed to create vote");
    }
  };

  return (
    <div className="vote-card">
      <h1>Please vote your minds</h1>
      {selectedRestaurants.map((lang, index) => (
        <div className={`card-item ${voted[index] ? "voted" : ""}`} key={lang}>
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
      ))}
      <button onClick={createVote} className="btn create-vote">
        Create Vote!
      </button>
      {voteId && (
        <p>
          Share this link:{" "}
          <a
            href={`${window.location.origin}/voting/${voteId}`}
          >{`${window.location.origin}/voting/${voteId}`}</a>
        </p>
      )}
    </div>
  );
};

export default Voting;
