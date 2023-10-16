class Play extends Phaser.Scene{
    constructor() {
        super({key: 'playScene'})
        this.VEL=100;
    }
    preload(){
        this.load.path = './assets/'
        this.load.image('slug', 'banaslug.png');
        this.load.tilemapTiledJSON('map1', 'tilemap.json');
        this.load.spritesheet('tilesheet', 'tilesheet.png', { frameWidth: 128, frameHeight: 128 });
            
    }
    create(){

        const camera = this.cameras.main;
        
        map = this.make.tilemap({ key: 'map1' });
        // tiles for the ground layer
        var levelTiles = map.addTilesetImage('tilesheet');
        wallLayer = map.createLayer('Background', levelTiles, 0, 0);
        groundLayer = map.createLayer('Terrain', levelTiles, 0, 0);

        // the player will collide with this layer
        groundLayer.setCollisionByExclusion([-1]);

        var player;
        
        this.player = this.physics.add.sprite( 300, 200, 'slug',)    

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
    }
    update(time){

        if (this.player.x > game.config.width + 500) {
            this.scene.start('end');
        }
        
        this.directions = new Phaser.Math.Vector2(0)
        // later put another && condition where player cant go left or right if next to wall or on wall

        if(keyA.isDown){
            this.player.angle = 0;
            this.player.flipX = true;
            this.directions.x -=1;
        }
        else if(keyD.isDown){
            this.player.angle = 0;
            this.player.flipX = false;
            this.directions.x += 1;
        }

        // making up and down only possible against walls
        // put && condition when next to a wall to use W and S
        // maybe do another if condition where if there is a wall A and D will move vertically, because going on the wall
        
        // if(!onWall) player.body.setAllowGravity(true)
        
        // player will not fall off walls
        if(keyW.isDown){
            this.player.angle = -90;
            this.directions.y -=1;
        }
        if(keyW.isDown && this.player.flipX){
            this.player.angle = 90;
            this.directions.y -=1;
        }
        if(keyS.isDown){
            this.player.angle = 90;
            this.directions.y += 1;
        }
        if(keyS.isDown && this.player.flipX){
            this.player.angle = -90;
            this.directions.y += 1;
        }
        this.directions.normalize()
        this.player.setVelocity(this.VEL * this.directions.x, this.VEL * this.directions.y)
    }
}