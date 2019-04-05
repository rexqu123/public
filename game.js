// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player 

function preload () {
  // Load & Define our game assets
  game.load.image('sky', 'sky.png')
  game.load.image('food', 'food.png')
  game.load.spritesheet('snakeball', 'circle.png')
}

function create () {
    //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE)

    //  A simple background for our game
  game.add.sprite(0, 0, 'sky')

    // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'snakeball')

    //  We need to enable physics on the player
  game.physics.arcade.enable(player)

    //  Player physics properties.
  player.body.collideWorldBounds = true

    //  Finally some diamonds to collect
  diamonds = game.add.group()

    //  Enable physics for any object that is created in this group
  diamonds.enableBody = true

    //  Create 12 diamonds evenly spaced apart
  for (var i = 0; i < 12; i++) {
    let diamond = diamonds.create(i * 70, 0, 'food')

  }

    //  Create the score text
  scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' })

    //  And bootstrap our controls
  cursors = game.input.keyboard.createCursorKeys()
}

function update () {
    //  We want the player to stop when not moving
  player.body.velocity.x = 0

    //  Call callectionDiamond() if player overlaps with a diamond
  game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

    // Configure the controls!
  if (cursors.left.isDown) {
    player.body.velocity.x = -150

  } 
  else if (cursors.up.isDown) {
    player.body.velocity.y = -150
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = 150
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150

  } else {
    // If no movement keys are pressed, stop the player
    player.animations.stop()
  }

    //  This allows the player to jump!
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
    // Show an alert modal when score reaches 120
  if (score === 120) {
    alert('You win!')
    score = 0
  }
}

function collectDiamond (player, diamond) {
    // Removes the diamond from the screen
  diamond.kill()

    //  And update the score
  score += 10
  scoreText.text = 'Score: ' + score
}
