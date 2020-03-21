class Player {
  constructor(user, card = 0, dead = false, immunity = false, tokens = 0) {
    this.user = user;
    this.card = card;
    this.dead = dead;
    this.immunity = immunity;
    this.tokens = tokens;
  }
}

// Firestore data converter
export const playerConverter = {
  toFirestore: function(player) {
    debugger;
    return {
      user: player.user,
      card: player.card,
      dead: player.dead,
      immunity: player.immunity,
      tokens: player.tokens
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Player(
      data.user,
      data.card,
      data.dead,
      data.immunity,
      data.tokens
    );
  }
};

export default Player;
