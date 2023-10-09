let config = {
    type: Phaser.CANVAS,
    // width: 640,
    
    allign: "center",
    width: 1500,
    height: 722,
    scene: [ Play ],
    physics: {
        default: "arcade",
        arcade: {  
        }
    },
    scene: [ Play ]
}
 
let game = new Phaser.Game(config);



// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySPACE,keyI, keyW, keyA, keyS, keyD, keyESC, keyENTER, mouseClick;
