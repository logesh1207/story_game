let xp=0;
let health=100;
let gold=50;
var fighting=0;
var monsterhealth=0;
var currentweapon=0;
var inventory=["stick"];

const xp_element=document.querySelector('.xp');
const health_element=document.querySelector('.health');
const gold_element=document.querySelector('.gold');
var text=document.querySelector('.text');
let store=document.querySelector(".store");
let cave=document.querySelector(".cave");
let fight=document.querySelector(".fight");
var monster_element=document.querySelector(".monster");
var monstername_element=document.querySelector(".monstername");
var monsterhealth_element=document.querySelector(".monsterhealth");


store.onclick=goToStore;
cave.onclick=goToCave;
fight.onclick=fightdragon;
var weapon=[{
    name:"stick",
    power:5

},{
    name:"knife",
    power:20
},{
    name:"hammer",
    power:40
},{
    name:"sword",
    power:70
}]
var locations=[
    {
        name:"Go to store",
        "button name":["Buy health(10gold)","Buy weapon(30 gold)","Go to Town"],
        "button function":[buyhealth,weaponstore,town],
        text:"you entered the store,you should pay for every item."
    },
    {
        name:"town",
        "button name":["Go to Store","Go to Cave","Figh with dragon"],
        "button function":[goToStore,goToCave,fightdragon],
        text:"you are now in the town,you see a sign showing the \"store\""

},{
    name:"cave",
    "button name":["Fight slime","Fight Beast","Go to Town"],
    "button function":[fightslime,fightbeast,town],
    text:"You are now in the cave and you see lots of monsters infront of you.Now you want to fight with them,so equip best weapon in the store."

},{
    name:"fight",
    "button name":["Attack","Dodge","Run"],
    "button function":[attack,dodge,town],
    text:"The monsters coming to attack you,so fight against it or dodge at a correct time and then give counter attack."

},
    {
        name:"loss",
        "button name":["Restart!","Restart!","Restart!"],
        "button function":[restarting,restarting,restarting],
        text:"You are restarted the game again,good luck!!"

    },{
        name:"win",
        "button name":["Go To Town!","Go To Town!","Go To Town!"],
        "button function":[town,town,town],
        text:"The monster screaming loudly with the pain and it died,you won the battle,You will be awarded with gold and xp for this.Keep attacking monster until you defeat th dragon."

    },{
        name:"loss",
        "button name":["Replay!","Repaly!","Replay!"],
        "button function":[town,town,town],
        text:"Dragon is died,You win the game"
    }
]

var monster=[{
    name:"slime",
    level:2,
    health:40
},{
    name:"Beast",
    level:10,
    health:100
},{
    name:"dragon",
    level:20,
    health:200
}]
function update(locations){
    
    store.innerText=locations["button name"][0];
    cave.innerText=locations["button name"][1];
    fight.innerText=locations["button name"][2];
    store.onclick=locations["button function"][0];
    cave.onclick=locations["button function"][1];
    fight.onclick=locations["button function"][2];
    text.innerText=locations["text"];
}
function goToStore(){
    update(locations[0]);
}
function goToCave(){
    update(locations[2]);
}

function buyhealth(){
   if(health>=100)
   {
    text.innerText="you are with full health.";
   }
   else
   {
    if(gold>=10)
    {
        gold-=10;
        health+=10;
        gold_element.innerText=gold;
        health_element.innerText=health;
        text.innerText="You now refilled your health,so help the poor people"
    }
    else{
        text.innerText="You do not have enough gold ";
    }
   }

}
function weaponstore(){
    if(currentweapon<weapon.length-1)
    {
        if(gold>=30)
        {
         gold-=30;
         currentweapon++;
         gold_element.innerText=gold;
         text.innerText="you upgraded your weapon from "+weapon[currentweapon-1]["name"]+" to "+weapon[currentweapon]["name"]+".";
         inventory.push(weapon[currentweapon]["name"]);
         text.innerText+="Now you have "+inventory+" with you.So use this weapon to kill those monsters.";
        }
        else{
            text.innerText="you do not have enough gold to buy "+weapon[currentweapon+1]["name"];
        }
    }
else{
    text.innerText="You already have the most powerful weapon";
    cave.innerText="Sell weapon(15 gold)";
    cave.onclick=sellweapon;
}

}
function restarting()
{

xp=0;
health=100;
gold=50;
console.log(xp);
console.log(health);
console.log(gold);
//xp_element.innerText=xp;
if (xp_element) {
    xp_element.innerText = xp;
} else {
    console.error("xp_element is null");
}
health_element.innerText=health;
gold_element.innerText=gold;
fighting=0;
monsterhealth=0;
currentweapon=0;
inventory=["stick"];
update(locations[1]);
}


function sellweapon(){
    if(inventory.length>1)
    {
     gold+=15;
     gold_element.innerText=gold;
     let currentweapon=inventory.shift();
     text.innerText="you have sold your "+currentweapon+".Now your inventory have "+inventory+".";
     
    }
    else{
        text.innerText="you do not sell your only weapon otherwise you can't protect  you against monster"
    }
}
function town(){
    update(locations[1]);

}

function fightslime(){
   fighting=0;
   goFight();

}
function fightbeast(){
   fighting=1;
  goFight();
}
function fightdragon(){
 fighting=2;
 goFight();
}

function goFight()
{
 update(locations[3]);
 monster_element.style.display="block";
 var monstername=monster[fighting]["name"];
 monsterhealth=monster[fighting]["health"];
 monstername_element.innerText=monstername;
 monsterhealth_element.innerText=monsterhealth;
}

function attack()
{
 var monstername=monster[fighting]["name"];
text.innerText="The "+monstername+" monster is attacking you";
text.innerText+=".You are attacking it with your "+weapon[currentweapon]["name"];

health-=monster[fighting]["level"];
monsterhealth-=weapon[currentweapon]["power"]+Math.floor(Math.random()*xp)+1;
health_element.innerText=health;
monsterhealth_element.innerText=monsterhealth;
if(health<=0)
{
   loss();
}
else if(monsterhealth<=0)
{ 
   fighting==2?wingame():win();
}
}
function loss(){
 text.innerText="you were died .will you want to restart."
 update(locations[4]);
}
function win(){
update(locations[5]);
gold+=Math.floor(monster[fighting]["level"]*6.7);
xp+=monster[fighting]["level"];
gold_element.innerText=gold;
xp_element.innerText=xp;

}
function wingame()
{
    update(locations[6]);
}
function dodge()
{
var monstername=monster[fighting]["name"];
text.innerText="you are dodging the attack from the monster "+monstername;
}


