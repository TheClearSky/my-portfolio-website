import React from 'react';
import "./MultiplayerChatbox.css";

export default function ChatBox({ player1: p_player1, player2: p_player2, children: p_children }) {
  if (!p_player1) {
    p_player1 = "Waiting...";
  }
  if (!p_player2) {
    p_player2 = "Waiting...";
  }
  const namemaxlen = 15;
  if (p_player1.length > namemaxlen) {
    p_player1 = p_player1.substring(0, namemaxlen - 3) + "...";
  }
  if (p_player2.length > namemaxlen) {
    p_player2 = p_player2.substring(0, namemaxlen - 3) + "...";
  }
  return (
    <>
      <div className="chessmatchinfo">
        <span className="player" style={{ alignSelf: "flex-start" }}>{p_player1}</span>
        Vs
        <span className="player" style={{ alignSelf: "flex-end" }}>{p_player2}</span>
      </div>
      <div className="chatbox">
        <div className="chatboxtitle">Messages</div>
        <div className="chatboxmessages">
          {p_children}
        </div>
      </div>
    </>
  )
}
