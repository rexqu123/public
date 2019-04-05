// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let score = 0
let scoreText
let food
let cursors
let player 

function preload () {
  // Load assets
  game.load.image('grid', 'grid.png')
  game.load.image('food', 'food.png')
  game.load.image('snakeball', 'circle.png')
  game.load.image('snakeball2', 'circle2.png')
}

function create () {
    //  Enable ARCADE physics
  game.physics.startSystem(Phaser.Physics.ARCADE)

    //  backround
  game.add.sprite(0, 0, 'grid')

    // spawn player
  player = game.add.sprite(32, game.world.height - 150, 'snakeball')

    //  physics for player
  game.physics.arcade.enable(player)
  player.body.collideWorldBounds = true

    //  spawn food
  food = game.add.group()
  food.enableBody = true
  for (var i = 0; i < 12; i++) {
    let foods = food.create(i * 70, 0, 'food')

  }

    //  create scoreboard
  scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' })

    //  Enable arrowkeys
  cursors = game.input.keyboard.createCursorKeys()
}

function update () {

    //  Call callectionDiamond() if player overlaps with a diamond
  game.physics.arcade.overlap(player, food, collectfood, null, this)

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
  }

    //  This allows the player to jump!
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
    // Show an alert modal when score reaches 120
  if (score === 120) {
    score = 0
  }
}

function collectfood (player, foods) {
    // Removes the diamond from the screen
  foods.kill()

    //  And update the score
  score += 10
  scoreText.text = 'Score: ' + score
}
