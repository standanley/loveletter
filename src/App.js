import React from "react";
import firebase from "./firebase.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null
    };

    this.onCreateGame = this.onCreateGame.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);

    this.firestore = firebase.firestore();
  }

  validateGameForm() {
    //var form = document.getElementById('game-form');

    const name = document.getElementById("game-name").value;
    if (!name) return false;

    const key = document.getElementById("game-key").value;
    if (!key) return false;

    const user = document.getElementById("game-user").value;
    if (!user) return false;

    return true;
  }

  onCreateGame() {
    debugger;
    if (!this.validateGameForm()) {
      alert("you didnt do the form");
      return;
    }
    alert("create");
  }

  onJoinGame() {
    this.validateGameForm();
    alert("join");
  }

  render() {
    if (!this.state.game) {
      return (
        <div>
          <header>Let's play Love Letter!</header>
          <form id="game-form" onSubmit={this.onCreateGame}>
            <input
              id="game-name"
              type="text"
              placeholder="name of your game"
              required
            />
            <input id="game-key" type="text" placeholder="entry key" required />
            <input
              id="game-user"
              type="text"
              placeholder="your username"
              required
            />
            <button type="button" onClick={this.onCreateGame}>
              Create a Game
            </button>
            <p>OR</p>
            <button type="button" onClick={this.onJoinGame}>
              Join an Existing Game
            </button>
          </form>
        </div>
      );
    }
    return <div></div>;
  }
}

export default App;
