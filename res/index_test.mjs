
var directions = {
    west: { offset: 0, x: -2, y: 0, opposite: 'east' },
    northWest: { offset: 32, x: -2, y: -1, opposite: 'southEast' },
    north: { offset: 64, x: 0, y: -2, opposite: 'south' },
    northEast: { offset: 96, x: 2, y: -1, opposite: 'southWest' },
    east: { offset: 128, x: 2, y: 0, opposite: 'west' },
    southEast: { offset: 160, x: 2, y: 1, opposite: 'northWest' },
    south: { offset: 192, x: 0, y: 2, opposite: 'north' },
    southWest: { offset: 224, x: -2, y: 1, opposite: 'northEast' }
};
var scene;
var anim = true;

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.atlas('pijam', '/res/img/SpriteSheetMini/walksheet.png', '/res/img/SpriteSheetMini/walksheet.json');
    }

    create ()
    {
        scene = this;

        this.anims.create({
            key: 'walk0',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAB-0-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk1',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAB-1-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk2',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAB-2-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk3',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAB-3-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk4',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAB-4-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk5',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAB-5-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run0',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAT-0-',
                suffix: '.png',
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run1',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAT-1-',
                suffix: '.png',
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run2',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAT-2-',
                suffix: '.png',
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run3',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAT-3-',
                suffix: '.png',
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run4',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAT-4-',
                suffix: '.png',
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run5',
            frames: this.anims.generateFrameNames('pijam', {
                prefix: 'HMJMPSAT-5-',
                suffix: '.png',
                start: 0,
                end: 9
            }),
            frameRate: 8,
            repeat: -1
        });


        this.add.sprite(30, 40).play('walk0');
        this.add.sprite(80, 40).play('walk1');
        this.add.sprite(130, 40).play('walk2');
        this.add.sprite(180, 40).play('walk3');
        this.add.sprite(230, 40).play('walk4');
        this.add.sprite(280, 40).play('walk5');
        this.add.sprite(30, 120).play('run0');
        this.add.sprite(80, 120).play('run1');
        this.add.sprite(130, 120).play('run2');
        this.add.sprite(180, 120).play('run3');
        this.add.sprite(230, 120).play('run4');
        this.add.sprite(280, 120).play('run5');
        this.add.sprite(30, 200, 'pijam', 'stay0.png');
        this.add.sprite(80, 200, 'pijam', 'stay1.png');
        this.add.sprite(130, 200, 'pijam', 'stay2.png');
        this.add.sprite(180, 200, 'pijam', 'stay3.png');
        this.add.sprite(230, 200, 'pijam', 'stay4.png');
        this.add.sprite(280, 200, 'pijam', 'stay5.png');

        scene.cameras.main.setSize(500, 500);

    }

    update ()
    {

    }
}


const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [ Example ],
    render: {
        pixelArt: true
    },
};

const game = new Phaser.Game(config);
