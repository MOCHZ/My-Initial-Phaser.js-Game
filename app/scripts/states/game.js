var GameState = {
    init: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        this.game.world.setBounds(0, 0, gameWidth, gameHeight);

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        this.RUNNING_SPEED = 100;
        this.JUMPING_SPEED = 550;
    },
    preload: function () {
        // music by http://box-cat.com/
        this.game.load.audio('the-music', ['assets/audio/music/BoxCat_Games_-_19_-_Mission.mp3', 'assets/audio/music/BoxCat_Games_-_19_-_Mission.ogg']);

        // Sounds
        this.game.load.audio('jump', 'assets/audio/sounds/jump.wav');

        // The characters
        this.characters = {
            'blue': 'assets/sprites/blue.png',
            'cyan': 'assets/sprites/cyan.png',
            'cyclops': 'assets/sprites/cyclops.png',
            'eskimo': 'assets/sprites/eskimo.png',
            'golden_monk': 'assets/sprites/golden_monk.png',
            'green': 'assets/sprites/green.png',
            'hired_hand': 'assets/sprites/hired_hand.png',
            'jungle_warrior': 'assets/sprites/jungle_warrior.png',
            'lime': 'assets/sprites/lime.png',
            'meat_boy': 'assets/sprites/meat_boy.png',
            'ninja': 'assets/sprites/ninja.png',
            'purple': 'assets/sprites/purple.png',
            'red': 'assets/sprites/red.png',
            'robot': 'assets/sprites/robot.png',
            'round_boy': 'assets/sprites/round_boy.png',
            'round_girl': 'assets/sprites/round_girl.png',
            'spelunky': 'assets/sprites/spelunky.png',
            'van_helsing': 'assets/sprites/van_helsing.png',
            'viking': 'assets/sprites/viking.png',
            'yang': 'assets/sprites/yang.png',
            'yellow': 'assets/sprites/yellow.png'
        };


        // Images
        this.load.image('clouds', 'assets/backgrounds/clouds.png');
        this.load.image('dark-grass', 'assets/backgrounds/dark-grass.png');
        this.load.image('grass', 'assets/backgrounds/grass.png');
        this.load.image('platform', 'assets/backgrounds/platform.png');

        this.load.spritesheet('player', this.characters['viking'], 80, 80);
    },
    create: function () {
        // Music
        this.music = this.game.add.audio('the-music');
        this.music.loop = true;
        this.music.volume = 0.5;
        this.music.play();

        this.jumpSound = this.game.add.audio('jump');
        this.jumpSound.volume = 0.3;


        // Controls
        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.punchButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // The environment
        this.theClouds = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'clouds');

        this.theDarkGrass = this.add.tileSprite(
            0,
            gameHeight - this.game.cache.getImage('grass').height + 140,
            gameWidth,
            this.game.cache.getImage('grass').height + 140,
            'grass'
        );

        this.theDarkerGrass = this.add.tileSprite(
            0,
            gameHeight - this.game.cache.getImage('grass').height + 170,
            gameWidth + Math.floor((Math.random() * 100) + 1),
            this.game.cache.getImage('grass').height + 170,
            'grass'
        );

        this.theGrass = this.add.tileSprite(
            0,
            gameHeight - this.game.cache.getImage('grass').height + 200,
            gameWidth  + Math.floor((Math.random() * 100) + 1),
            this.game.cache.getImage('grass').height + 200,
            'grass'
        );

        this.theDarkGrass.tint = 0xa1d2c8;
        this.theDarkerGrass.tint = 0x899f9b;

        this.platform = this.add.tileSprite(
            0,
            gameHeight - this.game.cache.getImage('platform').height + 30,
            gameWidth,
            this.game.cache.getImage('platform').height + 30,
            'platform'
        );

        // Set the physics
        this.game.physics.arcade.enable(this.platform);
        this.platform.body.allowGravity = false;
        this.platform.body.immovable = true;

        // The player
        this.player = this.add.sprite(
            320,
            gameHeight - ((this.game.cache.getImage('player').width / 10) + 25),
            'player');

        this.playerScale = 1.2;
        this.player.scale.setTo(this.playerScale)
        this.player.anchor.setTo(0.5, 0.5);
        this.player.frame = 0;
        this.game.physics.arcade.enable(this.player);
        this.player.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 8, true);
        this.player.animations.add('crawl', [17, 18, 19, 20, 21, 22, 23], 16, true);
        this.player.animations.add('punch', [36, 37, 38, 39, 40, 41, 42], 16, true);
    },
    update: function () {
        // Default background movement
        this.theClouds.tilePosition.x -= 0.3;

        // Collisions
        this.game.physics.arcade.collide(this.player, this.platform);

        // Player controlled movement
        // Walking
        if (this.cursors.up.isDown) {
            if (this.cursors.left.isDown) {
                this.player.scale.setTo(-this.playerScale, this.playerScale);
            }
            if (this.cursors.right.isDown) {
                this.player.scale.setTo(this.playerScale, this.playerScale);
            }
            this.player.frame = 98;
        }
        // Punching
        else if (this.punchButton.isDown && this.player.body.touching.down) {
            this.player.animations.play('punch');
        }
        else if (this.cursors.right.isDown && !this.crawling) {
            this.player.scale.setTo(this.playerScale, this.playerScale);
            this.player.animations.play('walk');

            this.theClouds.tilePosition.x -= 1.5;
            this.theDarkGrass.tilePosition.x -= 1.3;
            this.theDarkerGrass.tilePosition.x -= 1.6;
            this.theGrass.tilePosition.x -= 2.2;
            this.platform.tilePosition.x -= 2.5;
        }
        else if (this.cursors.left.isDown && !this.crawling) {
            this.player.scale.setTo(-this.playerScale, this.playerScale);
            this.player.animations.play('walk');

            this.theClouds.tilePosition.x -= 0.1;
            this.theDarkGrass.tilePosition.x += 1.3;
            this.theDarkerGrass.tilePosition.x += 2;
            this.theGrass.tilePosition.x += 2.3;
            this.platform.tilePosition.x += 2.5;
        }
        else if (!this.crawling && !this.punching) {
            this.player.frame = 0;
            this.player.animations.stop();
        }

        // Crouching
        if (this.cursors.down.isDown) {
            this.crawling = true;

            if (this.cursors.right.isDown) {
                this.player.scale.setTo(this.playerScale, this.playerScale);
                this.player.animations.play('crawl');

                this.theClouds.tilePosition.x -= 1;
                this.theDarkGrass.tilePosition.x -= 0.2;
                this.theDarkerGrass.tilePosition.x -= 0.3;
                this.theGrass.tilePosition.x -= 0.6;
                this.platform.tilePosition.x -= 0.9;
            }
            else if (this.cursors.left.isDown) {
                this.player.scale.setTo(-this.playerScale, this.playerScale);
                this.player.animations.play('crawl');

                this.theClouds.tilePosition.x -= 0.1;
                this.theDarkGrass.tilePosition.x += 0.2;
                this.theDarkerGrass.tilePosition.x += 0.5;
                this.theGrass.tilePosition.x += 0.7;
                this.platform.tilePosition.x += 1;
            }
            else {
                this.player.frame = 23;
            }
        }
        if (this.cursors.down.isUp) {
            this.crawling = false;
        }



        // Jumping
        if (this.jumpButton.isDown && this.player.body.touching.down) {
            this.jumpSound.play();
            this.player.body.velocity.y = -400;
        }

        if(this.player.body.velocity.y < 0) {
            this.player.frame = 24;
        }

        if (this.player.body.touching.none && this.player.body.velocity.y > 1) {
            this.player.frame = 25;
        }

    }
};