import React from "react";
// import Player, { playerConverter } from "./player.js";
import firebase from "./firebase.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      player: null,
    };

    this.enterGame = this.enterGame.bind(this);

    this.firestore = firebase.firestore();
  }

  validateGameForm() {
    const name = document.getElementById("game-name").value;
    const key = document.getElementById("game-key").value;
    const user = document.getElementById("game-user").value;
    return { valid: name && key && user, name, key, user };
  }

  enterGame(isNew = true) {
    const { valid, name, key, user } = this.validateGameForm();
    if (!valid) {
      alert("you didnt do the darned form");
      return;
    }

    this.firestore
      .collection("games")
      .where("name", "==", name)
      .where("key", "==", key)
      .get()
      .then(docs => {
        debugger;
        if (docs.size > 0 && isNew) {
          alert("you tried to create a game that already exists!! oh nooooo");
        } else if (docs.size === 0 && !isNew) {
          alert("you tried to join a game that does not exist! oh nooooooo");
        } else if (isNew) {
          // creating a game
          this.firestore
            .collection("games")
            .add({
              key,
              name,
              inGame: false,
              players: [{
                user,
                card: 0,
                tokens: 0,
                dead: false,
                immunity: false,
              }]
            });
        } else {
          // joining an existing game
          const doc = docs.docs[0];

          if (doc.data().inGame) {
            alert("in game already!!!");
            return;
          }

          const currentPlayers = doc.data().players;
          if (currentPlayers.length === 4) {
            alert("max players reached!!!");
            return;
          }

          const existingPlayer = currentPlayers.find(
            player => player.user === user
          );
          if (existingPlayer) {
            alert("that user is taken!");
            return;
          }

          //TODO: join logic
        }
      });
  }

  render() {
    if (!this.state.game) {
      return (
        <div>
          <header>Let's play Love Letter!</header>
          <form id="game-form">
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
            <button type="button" onClick={() => this.enterGame(true)}>
              Create a Game
            </button>
            <p>OR</p>
            <button type="button" onClick={() => this.enterGame(false)}>
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
