class Player {
  constructor(user, card = 0, dead = false, immunity = false, tokens = 0) {
    this.user = user;
    this.card = card;
    this.dead = dead;
    this.immunity = immunity;
    this.tokens = tokens;
  }

  equals(player) {
    return this.user === player.user;
  }
}

// Firestore data converter
export const playerConverter = {
  toFirestore: function(player) {
    return {
      user: player.user,
      card: player.card,
      dead: player.dead,
      immunity: player.immunity,
      tokens: player.tokens
    };
  },
  fromFirestore: function(firestorePlayer) {
    return new Player(
      firestorePlayer.user,
      firestorePlayer.card,
      firestorePlayer.dead,
      firestorePlayer.immunity,
      firestorePlayer.tokens
    );
  }
};

export default Player;
