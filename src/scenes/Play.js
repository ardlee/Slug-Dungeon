class Play extends Phaser.Scene{
    constructor() {
        super({key: 'playScene'})
        this.VEL=100;
        this.keyLocked = true;

    }
    preload(){
        this.load.path = './assets/'
        this.load.image('slug', 'banaslug.png');
        this.load.image('key', 'key.png');
        this.load.tilemapTiledJSON('map1', 'tilemap.json');
        this.load.spritesheet('tilesheet', 'tilesheet.png', { frameWidth: 128, frameHeight: 128 });

        // audio created from https://sfxr.me/
        this.load.audio('keyPickup', 'pickupSound.wav');
    }
    create(){

        const camera = this.cameras.main;        
        map = this.make.tilemap({ key: 'map1' });
        // tiles for the ground layer
        var levelTiles = map.addTilesetImage('tilesheet');
        wallLayer = map.createLayer('Background', levelTiles, 0, 0);
        groundLayer = map.createLayer('Terrain', levelTiles, 0, 0);
        gateLayer = map.createLayer('Gate', levelTiles, 0, 0);

        // the player will collide with this layer
        groundLayer.setCollisionByExclusion([-1]);
        gateLayer.setCollisionByExclusion([-1]);

        var player;
        var key; 
        
        this.player = this.physics.add.sprite( 300, 200, 'slug',)  
        this.key = this.physics.add.sprite(200, 1000, 'key',); 
        // Lock the key in place from the start
        this.physics.add.collider(this.player, this.key, this.collisionCallback, null, this);
        
        
        this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Keep the image anchored to the top right corner during camera scroll
        this.cameras.main.scrollX = 0; // Set the initial scroll position to 0
        this.cameras.main.scrollY = 0;
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // player will collide with the level tiles 
        this.physics.add.collider(groundLayer, this.player);

        // key will collide with the level tiles
        this.physics.add.collider(groundLayer, this.key);

        gatecollide = this.physics.add.collider(gateLayer, this.player);

        //gravity
        this.physics.world.gravity.y = 1000;
        this.physics.world.enable(this.player);
        // this.physics.world.createDebugGraphic();

        this.player.body.setSize(this.player.width -50, this.player.height);
        //this.key.body.setSize(this.key.width -50, this.player.height); 


    }
    update(time){

        // Use the overlap method to check for overlap between player and key
        if (this.physics.world.overlap(this.player, this.key)) {
            // Handle the overlap
            this.physics.world.removeCollider(gatecollide);
            this.sound.play('keyPickup');
            this.key.destroy();
            this.keyLocked = false;
        }


        if (this.player.x > game.config.width + 500 && this.keyLocked == false) {
            this.scene.start('end');
        }
        
        this.directions = new Phaser.Math.Vector2(0)
        // later put another && condition where player cant go left or right if next to wall or on wall

        if(keyA.isDown){
            this.player.angle = 0;
            this.player.flipX = true;
            this.player.body.setVelocityX(-100);
        }
        else if(keyD.isDown){
            this.player.angle = 0;
            this.player.flipX = false;
            this.player.body.setVelocityX(100);
        }
        // stop player from sliding if not moving
        else {
            this.player.body.velocity.x = 0;
        }

        // making up and down only possible against walls
        // put && condition when next to a wall to use W and S
        // maybe do another if condition where if there is a wall A and D will move vertically, because going on the wall
        
        // if(!onWall) player.body.setAllowGravity(true)
        
        // player will jump up if on the floor
        if (keyW.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-500);     
        }
        else if (keyW.isDown && this.player.body.blocked.right){
            this.player.angle = -90;
            this.player.setVelocityY(-100);
        }
        else if (keyW.isDown && this.player.body.blocked.left){
            this.player.angle = 90;
            this.player.setVelocityY(-100);
        }
        else 
            this.player.angle = 0;
        
        //face correctly when pushing against wall while not climbing, makes it look more slug like
        if ( this.player.body.blocked.right && !this.player.body.onFloor()){
            this.player.angle = -90;
        }
        else if ( this.player.body.blocked.left && !this.player.body.onFloor()){
            this.player.angle = 90;
        }
        

        // if(keyW.isDown){
        //     this.player.angle = -90;
        //     this.directions.y -=1;
        // }
        // if(keyW.isDown && this.player.flipX){
        //     this.player.angle = 90;
        //     this.directions.y -=1;
        // }
        // if(keyS.isDown){
        //     this.player.angle = 90;
        //     this.directions.y += 1;
        // }
        // if(keyS.isDown && this.player.flipX){
        //     this.player.angle = -90;
        //     this.directions.y += 1;
        // }
        // this.directions.normalize()
        // this.player.setVelocity(this.VEL * this.directions.x, this.VEL * this.directions.y)
    }
}