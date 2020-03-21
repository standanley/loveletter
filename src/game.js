import { playerConverter } from "./player";

class Game {
  constructor(name, key, players = [], inGame = false) {
    this.name = name;
    this.key = key;
    this.players = players;
    this.inGame = inGame;
  }

  start() {
    this.inGame = true;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  // removePlayer(player) {

  // }
}

// Firestore data converter
export const gameConverter = {
  toFirestore: function(game) {
    const firestorePlayers = game.players.map(player =>
      playerConverter.toFirestore(player)
    );
    return {
      name: game.name,
      key: game.key,
      players: firestorePlayers,
      inGame: game.inGame,
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    const players = data.players.map(firestorePlayer =>
      playerConverter.fromFirestore(firestorePlayer)
    );
    return new Game(data.name, data.key, players, data.inGame);
  }
};

export default Game;
