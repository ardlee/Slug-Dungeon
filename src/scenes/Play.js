class Play extends Phaser.Scene{
    constructor() {
        super({key: 'playScene'})
        this.VEL=100;
    }
    preload(){
            
    }
    create(){
        var player;
        var blinkInterval = 500; // Blink interval in milliseconds
        var lastBlinkTime = 0;
        // Create a square character placeholder
        this.player = new Phaser.GameObjects.Rectangle(
            this,
            100,    // x position
            100,    // y position
            25,     // width
            25,     // height
            0x00ff00 // fill color
        );
        this.physics.add.existing(this.player);
        this.add.existing(this.player);

        this.cursors = this.input.keyboard.createCursorKeys()
        
    }
    update(time){
        // Probably change this to a tween
        var blinkInterval = 1000; // Blink interval in milliseconds
        var lastBlinkTime = 0;
        // Blink the square at the specified interval
        if (time - lastBlinkTime > blinkInterval) {
            this.player.visible = !this.player.visible; // Toggle visibility
            lastBlinkTime = time;
        }
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
        // need sprite
        // this.player.setVelocity(this.VEL * this.directions.x, this.VEL * this.directions.y)
    }
}