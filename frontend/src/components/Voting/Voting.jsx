import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import { message } from "antd";
import "./style.css";

export const Voting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votedIndex, setVotedIndex] = useState("");
  const [title, setTitle] = useState("");
  const [expriseTime, setExpriseTime] = useState("");
  const [voteId, setVoteId] = useState("");
  const [status, setStatus] = useState(false);
  //const { selectedRestaurants } = location.state || { selectedRestaurants: [] };

  useEffect(() => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    const voteId = params.get("voteId");

    //-------bruce-----
    if (location.state) {
      setSelectedRestaurants(JSON.parse(location.state));
    } else {
      // Handle direct navigation or refresh scenarios
      console.log("No restaurants passed through navigation state.");
      // Optionally fetch default data or handle the lack of data appropriately
    }
    //-----------------
    if (voteId) {
      fetch(`http://localhost:3000/api/votes/getDetail?voteId=${voteId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setSelectedRestaurants([...res.recommend]);
          setStatus(res.status);
          if (
            new Date(res.expires).getTime() < new Date().getTime() ||
            res.status
          ) {
            setVoted(true);
            messageApi.open({
              type: "error",
              content: "Session Expired",
            });
          }
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: "Failed",
          });
        });
    }
    setVoteId(voteId);
  }, [location.state]);

  const incrementVote = (index) => {
    if (index === votedIndex) {
      return;
    }
    setVotedIndex(index);
  };
  const handVote = () => {
    if (voted) {
      messageApi.open({
        type: "error",
        content: "You already voted",
      });
      return;
    }
    if (!votedIndex && votedIndex !== 0) {
      messageApi.open({
        type: "error",
        content: "Please select votes",
      });
      return;
    }
    selectedRestaurants[votedIndex].count++;
    const sendData = {
      voteId,
      recommend: selectedRestaurants,
    };
    fetch("http://localhost:3000/api/votes/update", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 20000) {
          setVoted(true);
          messageApi.open({
            type: "success",
            content: "Success",
            duration: 1.5,
          });
        } else {
          messageApi.open({
            type: "error",
            content: res.data,
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Failed",
        });
      });
  };
  const createVote = async () => {
    const sendData = {
      status,
      expires: expriseTime,
      recommend: selectedRestaurants,
      title,
    };
    fetch("http://localhost:3000/api/votes/create", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 20000) {
          messageApi.open({
            type: "success",
            content: "Success",
            duration: 1.5,
            async onClose() {
              await navigator.clipboard.writeText(
                `${window.location.origin}/voting/?voteId=${voteId}`
              );
              navigate(`/voting?voteId=${res.data._id}`);
            },
          });
        } else {
          messageApi.open({
            type: "error",
            content: res.data,
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Failed",
        });
      });
  };
  const endVote = async () => {
    const sendData = {
      voteId,
      status: true,
    };
    fetch("http://localhost:3000/api/votes/endVote", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 20000) {
          setVoted(true);
          messageApi.open({
            type: "success",
            content: "Success",
            duration: 1.5,
          });
          navigate(`/voting/?voteId=${voteId}`);
        } else {
          messageApi.open({
            type: "error",
            content: res.data,
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Failed",
        });
      });
  };
  return (
    <div className="vote-card">
      {contextHolder}
      {voteId ? (
        status ? (
          <h1>Vot session End</h1>
        ) : (
          <div>
            <h1>Please vote!</h1>
            <button onClick={endVote} className="btn create-vote">
              End now
            </button>
          </div>
        )
      ) : (
        <div className="vote-option">
          <div>
            <label htmlFor="">Vote Title:</label>
            <input
              className="vote-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Exprise Time:</label>
            <input
              type="datetime-local"
              className="vote-title"
              value={expriseTime}
              onChange={(e) => {
                setExpriseTime(e.target.value);
              }}
            />
          </div>
        </div>
      )}

      {selectedRestaurants.map((restaurant, index) => (
        <div
          className={`card-item ${index === votedIndex ? "voted" : ""}`}
          key={restaurant.name}
        >
          <div style={{ width: "500px" }}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>
              {restaurant.location} - {restaurant.priceRange}
            </p>
            {voted && (
              <span className="vote-count">Votes: {restaurant.count}</span>
            )}
          </div>
          {voteId && !status && (
            <button
              className={`btn ${voted[index] ? "voted" : ""}`}
              onClick={() => incrementVote(index)}
              disabled={voted}
            >
              {index === votedIndex ? "Voted" : "Vote"} {voted}
            </button>
          )}
        </div>
      ))}
      {voteId && !status && (
        <button onClick={handVote} className="btn create-vote">
          {voted ? "voted" : "vote"}
        </button>
      )}
      {!voteId && (
        <button onClick={createVote} className="btn create-vote">
          Create Vote!
        </button>
      )}
      {voteId && (
        <p>
          Share this link:{" "}
          <a
            href={`${window.location.origin}/voting/voteId=${voteId}`}
          >{`${window.location.origin}/voting/?voteId=${voteId}`}</a>
        </p>
      )}
    </div>
  );
};

export default Voting;
