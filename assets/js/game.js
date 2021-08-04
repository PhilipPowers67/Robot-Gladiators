// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    *Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less


var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var getPlayerName = function(){
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerinfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health= 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for $7.");
    this.health += 20;
    this.money -= 7;
    }
    else {
      window.alert("Insignificant Funds!");
    }
  },
  upgradeAttack: function(){
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for $7.");
    this.attack += 6;
    this.money -= 7;
  }
  else {
    window.alert("Insignificant Funds!");
  }
}
};

var enemyinfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];
var fightOrSkip = function() {
  //ask player if they'd like to fight or skip using the fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
if (promptFight === "" || promptFight === null) {
  window.alert("You need to provide a valid answer! Please try again.");
  return fightOrSkip();
}

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerinfo.name + " has decided to skip this fight!");
      //subtract money from playerMoney for skipping
      playerinfo.money = Math.max(0, playerinfo.money - 10);

      return true;
      shop();
    }
  }
}
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = True;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerinfo.health > 0 && enemy.health > 0) {
  if (isPlayerTurn) {
    // ask player if they'd like to fight or skip using fightOrSkip function
    if (fightOrSkip()) {
    break;
  }
    var damage = randomNumber(playerinfo.attack - 3, playerinfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
        playerinfo.name +
         " attacked " +
          enemy.name +
           ". " +
            enemy.name +
             " now has " +
              enemy.health +
               " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerinfo.money = playerinfo.money + 20;
        break;
    } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
    // player gets attacked first
  } else {
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
    // remove player's health by subtracting the amount set in the damage variable
      playerinfo.health = Math.max(0, playerinfo.health - damage);
    console.log(
        enemy.name +
         " attacked " +
          playerinfo.name +
           ". " +
            playerinfo.name +
             " now has " +
              playerinfo.health +
               " health remaining."
    );

    if (playerinfo.health <= 0) {
      window.alert(playerinfo.name + " has died!");
      //leave while() loop if player dies
      break;
    } else {
      window.alert(playerinfo.name + " still has " + playerinfo.health + " health left.");
    }
  }
  // switch order for next round
    isPlayerTurn = !isPlayerTurn;
}
};
    
   

var startGame = function() {
  // reset player stats
  playerinfo.reset();

for(var i = 0; i < enemyinfo.length; i++) {
  if (playerinfo.health > 0) {
    // let player know what round they are in, remember that array starts at 0 so it needs to have 1 added to it
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
  // pick new enemy to fight based on the index of the enemyNames array
  var pickedEnemyObj = enemyinfo[i];
  // rest enemyHealth before starting new fight
  pickedEnemyObj.health = randomNumber(40, 60);
  // use debugger to pause script from running and check what's going on at that moment in the code
  
  // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
  fight(pickedEnemyObj);
  //if we're not at the last enemy in the array
  if (playerinfo.health > 0 && i < enemyinfo.length - 1) {
    //ask if player wants to use the store before next round
    var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

    //if yes take them to the store() function
    if (storeConfirm) {
      shop();
    }
  }
  }
  else {
    window.alert("You have lost your robot in battle! GAME OVER!");
    break;
  }
}
endGame();
};

var endGame = function(){
  window.alert("The game has now ended. Let's see how you did!");

  // check localStorage for high score, if its not there use 0
  var highScore = localStorage.getItem("highscore");
  if (highscore === null) {
    highScore = 0;
  }
  // if player has more money than the high score, player has new high score
  if (playerinfo.money > highScore) {
    localStorage.setItem("highscore", playerinfo.money);
    localStorage.setItem("name", playerinfo.name);

    alert(playerinfo.name + " now has the high score of " + playerinfo.money + "!");
  }
  else {
    alert(playerinfo.name + " did not beat the high score of " + highScore + "!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if(playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  //ask player what they'd like to do...
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
     playerinfo.refillHealth();
      // increase health and decrease money
      break;
    case 2:
     playerinfo.upgradeAttack();
      break;
    case 3:
      window.alert("leaving the store");
      //do nothing, function will end
      break;
      default:
        window.alert("You did not pick a valid option. Try again.");
        shop();
        break;
  }
};
startGame();
