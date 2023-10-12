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
        
        this.player = this.physics.add.sprite( 100, 100, 'slug',)    

        this.cursors = this.input.keyboard.createCursorKeys()
        
    }
    update(time){
        
        this.directions = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown){
            this.directions.x -=1
        }
        else if(this.cursors.right.isDown){
            this.directions.x += 1
        }
        if(this.cursors.up.isDown){
            this.directions.y -=1
        }
        else if(this.cursors.down.isDown){
            this.directions.y += 1
        }
        this.directions.normalize()
        this.player.setVelocity(this.VEL * this.directions.x, this.VEL * this.directions.y)
    }
}