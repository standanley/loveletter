import React from "react";
import firebase from "./firebase";
import Game, { gameConverter } from "./game";
import Player from "./player";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      player: null
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

  startGame() {
    this.state.game.start();
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
      .withConverter(gameConverter)
      .get()
      .then(docs => {
        if (isNew) {
          // creating a game
          if (!docs.empty) {
            alert("you tried to create a game that already exists!! oh nooooo");
            // would you like to join this game? yes no
            return;
          }
          const player = new Player(user);
          const game = new Game(name, key, [player]);
          this.firestore
            .collection("games")
            .withConverter(gameConverter)
            .add(game);
          this.setState({
            game,
            player
          });
        } else {
          // joining an existing game
          const doc = docs.docs[0];
          if (!doc) {
            alert("you tried to join a game that does not exist! oh nooooooo");
            // would you like to create this game? yes no
            return;
          }
          const game = doc.data();
          if (game.inGame) {
            alert("in game already!!!");
            return;
          }
          if (game.players.length === 4) {
            alert("max players reached!!!");
            return;
          }

          const newPlayer = new Player(user);
          if (game.players.some(player => player.equals(newPlayer))) {
            alert("that user is taken!");
            return;
          }

          game.addPlayer(newPlayer);

          this.firestore
            .collection("games")
            .doc(doc.id)
            .withConverter(gameConverter)
            .set(game);
          this.setState({
            game,
            player: newPlayer
          });
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
    if (!this.state.game.inGame) {
      return (
        <div>
          <header>
            <h1>Welcome, {this.state.player.user}</h1>
            <h2>
              You are in the game <b>{this.state.game.name}</b>
            </h2>
            <h3>
              Your game key is <b>{this.state.game.key}</b>
            </h3>
          </header>
          <p>When all the expected players join, start the game below:</p>
          <button onClick={this.startGame}>Start Game</button>
        </div>
      );
    }
    return (
      <div>
          <header>
            <h1>Welcome, {this.state.player.user}</h1>
            <h2>
              You are in the game <b>{this.state.game.name}</b>
            </h2>
            <h3>
              Your game key is <b>{this.state.game.key}</b>
            </h3>
          </header>
        </div>
    )
  }
}

export default App;
