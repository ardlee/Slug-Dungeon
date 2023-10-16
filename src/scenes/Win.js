class End extends Phaser.Scene {
    constructor() {
        super('end');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('win', 'youwin.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#013220');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.titleob = this.add.image(
            centerX,//x
            centerY - 30,//y
            'win',//imagename
            )
            this.titleob.setScale(2) //resize
        const playText = this.add.text(centerX - 80, centerY + 180, 'PLAY AGAIN', { fontSize: '50px', fill: '#fff' });
        playText.setInteractive();
        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#3944BC' });
        });
        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#fff' });
        });
        playText.on('pointerdown', () => {
            this.scene.start('playScene');
        });
        this.tweens.add({
            targets: this.titleob,
            x: '+=' + 100,
            repeat: 2,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 100
        });
    }
    update() {

    }
}