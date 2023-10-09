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
        // Create a square character
        this.player = new Phaser.GameObjects.Rectangle(
            this,
            100,    // x position
            100,    // y position
            25,     // width
            25,     // height
            0x00ff00 // fill color
        );
        this.add.existing(this.player);
    }
    update(time){
        // var blinkInterval = 1000; // Blink interval in milliseconds
        // var lastBlinkTime = 0;
        // Blink the square at the specified interval
        // if (time - this.lastBlinkTime > this.blinkInterval) {
        //     this.player.visible = !this.player.visible; // Toggle visibility
        //     this.lastBlinkTime = time;
        // }
        // this.directions = new Phaser.Math.Vector2(0)
        // if(this.cursors.left.isDown){
        //     this.directions.x -=1
        // }
        // else if(this.cursors.right.isDown){
        //     this.directions.x += 1
        // }
        // if(this.cursors.up.isDown){
        //     this.directions.y -=1
        // }
        // else if(this.cursors.down.isDown){
        //     this.directions.y += 1
        // }
        // this.directions.normalize()
        // this.player.setVelocity(this.VEL * this.directions.x, this.VEL * this.directions.y)
    }
}