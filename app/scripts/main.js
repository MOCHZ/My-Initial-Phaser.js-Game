var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'the-game');
game.state.add('GameState', GameState);
game.state.start('GameState');