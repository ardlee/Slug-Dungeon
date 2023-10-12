class Play extends Phaser.Scene{
    constructor() {
        super({key: 'playScene'})
        this.VEL=100;
    }
    preload(){
        this.load.path = './assets/'
            this.load.image('slug', 'banaslug.png')
            
    }
    create(){
        var player;
        
        this.player = this.physics.add.sprite( 700, 320, 'slug',)    

        this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
    }
    update(time){
        
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