// Settings
var startingcoins = 20;
var locale = "dell";
var stepSize = 15;

var mood_decay = 0.3;
var hunger_decay = 0.3;

var mood_decay_afk = mood_decay / 2;
var hunger_decay_afk = hunger_decay / 5;

var params = {
  "playerName": "y/n",
  "name": "Boomer",
  "dob": -602449200,
  "gender": "m",
  "element": "Lightning",
  "pet": "https://i.postimg.cc/Wb0PnY7c/boomer2.gif",
  "map": "https://i.postimg.cc/W4rhVwGC/bedroom.png",
  "background": "https://i.postimg.cc/LXkzvphZ/922cba87.jpg",
  "tablecolor": "#8000ff",
  "textcolor": "#f0f0f0",
};

var activities = {
  "feed": {
    "cost": 5,
    "mood": 10,
    "belly": 20,
    "duration": 2
  },
  "shower": {
    "cost": 1,
    "mood": 20,
    "duration": 6
  },
  "party": {
    "cost": 20,
    "mood": 80,
    "duration": 30
  },
  "slots": {
    "cost": 2,
    "win_coins": 100,
    "win_mood": 20,
    "lose_mood": -10,
    "poor_mood": -40
  },
  "rain": {
    "rate": 0, // x/100 chance of rain starting to fall
    "mood": -20,
    "duration": 10
  },
  "teufort": {
    "cost_belly": 20,
    "duration": 10,
    "win_coins": 20,
    "win_mood": 20,
    "lose_coins": 0,
    "lose_mood": -20
  }
};