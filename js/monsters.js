//spawn the bee
enem1 = new entity(35,48,290,125,"url(sprites/bee.png)",[],"test",0);
enem1.spawn("test");
enem1.move([180],[0],1);
//test move
function moveBee()
{
    enem1.move([90, -90, -90, -90],[100, 250, 100, 250], 700);
}
//moveBee();

var monsterList = [enem1];
