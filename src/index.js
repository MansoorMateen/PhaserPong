

const config = {
    
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene:{
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
};

const game = new Phaser.Game(config);
let ball;
let speler1;
let speler2;
let Gamestart = false;
let cursors;
let speler1goal = false;
let speler2goal = false;
var score1 = 0;
var score2 = 0;
let keys = {};
let tekst1;
let tekst2;


function preload(){
    this.load.image('ball','./fotos/ball.png'); 
    this.load.image('pong','./fotos/paddle.png'); 

}

function create(){
    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    )
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);

    speler1 = this.physics.add.sprite(
        ball.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        'pong'
    )

    speler1.setImmovable(true);
    speler1.setCollideWorldBounds(true);

    
    speler2 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width /2 + 1),
        this.physics.world.bounds.height / 2,
        'pong'
    )
    speler2.setImmovable(true);
    speler2.setCollideWorldBounds(true);


    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.physics.add.collider(ball,speler1)
    this.physics.add.collider(ball,speler2)

    tekst1= this.add.text(
        400,400,'speler 1 wint'
    );

    
    tekst2= this.add.text(
        400,400,'speler 2 wint'
    );

    tekst1.setVisible(false);
    tekst2.setVisible(false);

}

function update(){
    if(!Gamestart){
        const startballX = (Math.random()* 200) + 100;
        const startballY = (Math.random()* 200) + 100;
        ball.setVelocityX(startballX);
        ball.setVelocityY(startballY);
        Gamestart = true;
    };

    if(ball.body.x > speler2.body.x  && score1 <10 ){
        speler1goal = true;
     
        
    };
    if(ball.body.x <=  1  && score2 <10 ){
        speler2goal = true;
     
        
    };

    if(speler1goal){
        score1++ ;
        speler1goal = false;
        console.log(score1,' / ',score2);
        
    };

    if(speler2goal){
        score2++;
        speler2goal = false;
        console.log(score1,' / ',score2);
        
    };

    speler1.body.setVelocityY(0);
    speler2.body.setVelocityY(0);


   if(cursors.up.isDown){
       speler1.body.setVelocityY(-350)
   }
   if(cursors.down.isDown){
    speler1.body.setVelocityY(350)

   }
   if(keys.w.isDown){
    speler2.body.setVelocityY(-350)
    }
    if(keys.s.isDown){
    speler2.body.setVelocityY(350)}   

    if (score1 == 10){
        ball.setVelocityX(0);
        ball.setVelocityY(0);
        tekst1.setVisible(true);

    }
    if (score2 == 10){
        ball.setVelocityX(0);
        ball.setVelocityY(0);
        tekst2.setVisible(true);

    }
}