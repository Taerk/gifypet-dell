// General settings defaults
if (typeof startingcoins == "undefined")
  var startingcoins = 10;

if (typeof locale == "undefined")
  var locale = "en";

if (typeof stepSize == "undefined")
  var stepSize = 15;

if (typeof activities == "undefined") {
  var activities = {};
}
if (typeof activities.feed == "undefined") {
  activities.feed = {
    "cost": 5,
    "mood": 10,
    "belly": 20,
    "duration": 2
  };
  document.getElementById("wash_btn").value = document.getElementById("wash_btn").value.replace("??", activities.shower.cost * -1);
}
Array.from(document.getElementsByClassName("feed-cost-display")).forEach(function(el) {
  el.innerHTML = activities.feed.cost;
});

if (typeof activities.shower == "undefined") {
  activities.shower = {
    "cost": 1,
    "mood": 20,
    "duration": 6
  };
}
Array.from(document.getElementsByClassName("wash-cost-display")).forEach(function(el) {
  el.innerHTML = activities.shower.cost;
});

if (typeof activities.party == "undefined") {
  activities.party = {
    "cost": 20,
    "mood": 80,
    "duration": 9
  };
}
Array.from(document.getElementsByClassName("party-cost-display")).forEach(function(el) {
  el.innerHTML = activities.party.cost;
});

if (typeof activities.slots == "undefined") {
  activities.slots = {
    "cost": 5,
    "win_coins": 10,
    "win_mood": 20,
    "lose_mood": -10,
    "poor_mood": -40
  };
}
if (typeof activities.rain == "undefined") {
  activities.rain = {
    "rate": 2, // x/100 chance of rain starting to fall
    "mood": -20,
    "duration": 10
  };
}

//System variables
var petX = 50;
var petY = 50;
var talk = '';
var mood = loadMood();
var belly = loadBelly();
var coins = loadCoins();
var movment = true;

//Owner configured variables
var nowDate = Date.now();
var lastVisited = parseInt(localStorage.getItem("lastVisited"));
if (!lastVisited) {
  console.warn("lastVisited was invalid. Resetting: " + nowDate);
  lastVisited = Date.now();
  localStorage.setItem("lastVisited", lastVisited);
}
var date = new Date(getParameterByName('dob') * 1000);
var dob = date.getMonth() + 1 + '-' + date.getFullYear();

var playerName = getParameterByName('playerName');
var petName = getParameterByName('name');
var element = getParameterByName('element');
var gender = getParameterByName('gender'); //f m b n

var tableColor = getParameterByName('tablecolor');
var textColor = getParameterByName('textcolor');

var mapImage = getParameterByName('map');
if (!mapImage.includes('://')) {
  //Map
  mapImage = 'maps/' + mapImage;
}

var petImage = getParameterByName('pet');
if (!petImage.includes('://')) {
  //Pet
  petImage = 'pets/' + petImage;
}

var bodyImage = getParameterByName('background');
if (!bodyImage.includes('://')) {
  //Pet
  bodyImage = 'backgrounds/' + bodyImage;
}

//DOM elements
var pet = document.getElementById('pet');
var petdisplay = document.getElementById('petdisplay');
var map = document.getElementById('map');
var talkBox = document.getElementById('talk');
var petNameBox = document.getElementById('petName');
var elementBox = document.getElementById('element');
var dobBox = document.getElementById('dob');
var moodBox = document.getElementById('mood');
var bellyBox = document.getElementById('belly');
var coinsBox = document.getElementById('coins');
var petNameTag = document.getElementById('petName-tag');
var overlay = document.getElementById('overlay');
var underlay = document.getElementById('underlay');
var petInteract = document.getElementById('overlay-pet-interact');
var petTable = document.getElementById('petTable');

//+++ Game Loop +++
function loop() {
  //Belly
  belly = belly - hunger_decay;
  if (belly < 10) {
    adjustBelly(10, true);
  }
  if (belly > 100) {
    adjustBelly(100, true);
  }
  var bellyHearts = '';
  for (var i = 0; i < belly / 10 / 2; i++) {
    bellyHearts += `<img class="uiicon" src="` + image_db["belly"] + `">`;
  }
  bellyBox.innerHTML = bellyHearts;

  //Mood
  mood = mood - mood_decay;
  if (mood < 10) {
    adjustMood(10, true);
  }
  if (mood > 100) {
    adjustMood(100, true);
  }
  var moodHearts = '';
  for (var i = 0; i < mood / 10 / 2; i++) {
    moodHearts += `<img class="uiicon" src="` + image_db["mood"] + `">`;
  }
  moodBox.innerHTML = moodHearts;

  //Coins
  coins = coins + (mood / 600);
  coinsBox.innerHTML = Math.floor(coins);
  saveCoins(coins);
  saveBelly(belly);
  saveMood(mood);

  //Function calls
  teMain();
  speakAnimator();
  rainFall();
  movePet();
  petTalk();
  autoEat();
}

//+++ Main System Functions +++

//Pet movment
function movePet() {
  if (movment === false) {
    return;
  }

  var xFlip = false;
  var yFlip = false;

  if (random100() < 50) {
    xFlip = invertB(xFlip);
  }

  if (random100() < 50) {
    yFlip = invertB(yFlip);
  }

  if (xFlip === true) {
    petX += stepSize;

    if (moveCheck(petX, petY) === false) {
      petX -= stepSize * 2;
    }
  } else {
    petX -= stepSize;

    if (moveCheck(petX, petY) === false) {
      petX += stepSize * 2;
    }
  }

  if (yFlip === true) {
    petY += stepSize;

    if (moveCheck(petX, petY) === false) {
      petY -= stepSize * 2;
    }
  } else {
    petY -= stepSize;

    if (moveCheck(petX, petY) === false) {
      petY += stepSize * 2;
    }
  }

  //Set pet position
  if (parseInt(pet.style.left) > petX) {
    petdisplay.classList.remove("flip");
  } else {
    petdisplay.classList.add("flip");
  }
  pet.style.left = petX + 'px';
  pet.style.top = petY + 'px';

  //Match overlay pet interact box to pet position
  petInteract.style.left = petX + 'px';
  petInteract.style.top = petY + 60 + 'px'; //Height ajusted for overlay offset from relative pet position.
}

//Timed event manager
var teTimer = -1;
var teEnd = 5;
var teFunction = null;

function teStart(functionPass, duration) {
  //Close any complex UI that may mess things up.
  closeSlots();

  //If the timer is already running, call a cancel on whatever function is active.
  if (teTimer != -1) {
    teFunction(false);
  }
  teTimer = 0;
  teEnd = duration;
  teFunction = functionPass;
}

function teMain() {
  if (teTimer == -1) {
    return;
  }

  //Ok ok, yes this could be run instantly in teStart, but theres a charm to the delay it adds.
  if (teTimer === 0) {
    teFunction(true);
    petInteract.style.zIndex = '-1'; //Disable pet interaction
  }

  teTimer++;

  if (teTimer == teEnd) {
    teFunction(false);
    teTimer = -1;
    petInteract.style.zIndex = '1'; //Enable pet interaction
  }
}

//+++ Actions +++

//General Pet chatter
var sayings = getString("talk_pet_speak", true);
var lastPick = 0;
var speakDelay = 0;

function petTalk() {
  //Speak Delay adds a minimum delay between messages
  speakDelay++;
  if (speakDelay < 12) {
    return;
  }

  if (random100() < 8) {
    var pick = 0;
    do {
      pick = Math.floor(Math.random() * sayings.length);
    } while (pick == lastPick);

    speak(petName, sayings[pick]);
    speakDelay = 0;
  }
}
//Mood related actions
function moodCheck() {
  if (mood > 0 && mood < 20) {
    if (random100() < 4) {
      speak(petName, getString("feed_mood_20_pet_speak"));
    }

    return;
  }

  if (mood > 20 && mood < 40) {
    if (random100() < 4) {
      speak(petName, getString("feed_mood_40_pet_speak"));
    }

    return;
  }

  if (mood > 40 && mood < 100) {
    if (random100() < 4) {
      speak(petName, getString("feed_mood_100_pet_speak"));
    }

    return;
  }

  if (mood > 100 && mood < 150) {
    if (random100() < 4) {
      speak(petName, getString("feed_mood_150_pet_speak"));
    }

    return;
  }

  if (mood > 150 && mood < 200) {
    if (random100() < 4) {
      speak(petName, getString("feed_mood_200_pet_speak"));
    }

    return;
  }
}

//Feed Pet
var foodTypeSayings = getString("feed_sayings", true);

function feedPet(foodType) {
  //0-Main/Meal/Meat 1-Junk 2-Boring 3-Drink
  if (coins < activities.feed.cost) {
    speak(getString("feed_poor_name"), printf(getString("feed_poor_speak"), activities.feed.cost));
    errorSound.play();
    return;
  }

  if (belly > 80) {
    speak(petName, getString("feed_full_pet_speak"));
    errorSound.play();
    return;
  }

  adjustCoins(activities.feed.cost * -1);
  adjustMood(activities.feed.mood);
  adjustBelly(activities.feed.belly);
  speak(petName, foodTypeSayings[foodType][randomArray(foodTypeSayings[foodType])]);
  teStart(teFeed, activities.feed.duration);
}

function teFeed(active) {
  if (active === true) {
    console.log(image_db);
    overlay.style.backgroundImage = "url('" + image_db["feed"] + "')";
    eatSound.play();
  } else {
    overlay.style.backgroundImage = 'none';
  }
}
//Pet auto eats to maintain mood
function autoEat() {
  if (mood < 20 && belly < 20) {
    speak(getString("feed_auto_name"), getString("feed_auto_speak"));
    speak(petName, foodTypeSayings[0][randomArray(foodTypeSayings[0])]);
    adjustBelly(20);
    adjustMood(20);
  }
}

//Talk to pet
function talkToPet() {
  var pick = Math.floor(Math.random() * getString("talk_player_converse", true).length);

  talkSound.play();
  speak(getString("talk_player_name"), getString("talk_player_converse", true)[pick][0]);
  speak(petName, getString("talk_player_converse", true)[pick][1]);
}

//Pett pet
function pettPet() {
  speak(petName, getString("pett_pet_speak"));
  adjustMood(20);
  pettSound.src = getSound("pett");
  pettSound.play();
  teStart(tePett, 3);
}

function tePett(active) {
  if (active === true) {
    movment = false;
    pet.classList.add('pett');
    overlay.innerHTML = `<img src="` + image_db["heartrain"] + `" />`;
  } else {
    movment = true;
    pet.classList.remove('pett');
    overlay.innerHTML = '';
  }
}

//Shower
function showerPet() {
  if (coins < activities.shower.cost) {
    speak(getString("shower_poor_name"), getString("shower_poor_speak"));
    errorSound.play();
    return;
  }
  teStart(teShower, activities.shower.duration);
  speak(petName, getString("shower_pet_speak"));
  adjustMood(activities.shower.mood);
  adjustCoins(activities.shower.cost * -1);
}

function teShower(active) {
  if (active === true) {
    overlay.style.backgroundImage = `url('` + image_db["shower"] + `')`;
    overlay.innerHTML = '<img style="padding-top: 50px; width: 60%;" src="' + petImage + '" />';
    washSound.play();
  } else {
    overlay.style.backgroundImage = 'none';
    overlay.innerHTML = '';
  }
}

//Party
function petParty() {
  if (coins < activities.party.cost) {
    speak(getString("party_poor_name"), printf(getString("party_poor_speak"), activities.party.cost));
    errorSound.play();
    return;
  }
  teStart(teParty, activities.party.duration);
  speak(petName, getString("party_pet_speak"));
  adjustMood(activities.party.mood);
  adjustCoins(activities.party.cost * -1);
}

var partyGuests = image_db["party"]["guests"];
function teParty(active) {
  if (active === true) {
    pet.classList.add("party");
    underlay.classList.add("rainbow");
    map.classList.add("rainbow");
    underlay.style.backgroundImage = `url('` + image_db["party"]["background"] + `')`;
    partySound.play();

    var shuffeledGuests = shuffle(partyGuests);

    for (var i = 0; i < partyGuests.length; i++) {
      var guestX = i * 40 + 15;
      var guestY = (random100() / 2) + 50;
      underlay.innerHTML += '<img class="pet guest" style="top:' + guestY + 'px; left:' + guestX + 'px; position: fixed;" src="' + shuffeledGuests[i] + '" />';
    }
  } else {
    pet.classList.remove("party");
    underlay.classList.remove("rainbow");
    map.classList.remove("rainbow");
    underlay.style.backgroundImage = 'none';
    underlay.innerHTML = '';
  }
}

//Rain
var rainDelay = 0;

function rainFall() {
  rainDelay++;
  if (rainDelay < 15) {
    return;
  }

  if (random100() < activities.rain.rate) {
    teStart(teRain, activities.rain.duration);
    speak(petName, getString("rain_pet_speak"));
    adjustMood(activities.rain.mood);
    rainDelay = 0;
  }
}

function teRain(active) {
  if (active === true) {
    underlay.innerHTML = `<img src="` + image_db["rain"] + `" />`;
    underlay.style.backgroundColor = '#1b3a63';
    underlay.style.opacity = '0.4';
  } else {
    underlay.innerHTML = '';
    underlay.style.backgroundColor = null;
    underlay.style.opacity = null;
  }
}

//Slots Game
function openSlots() {
  // Prevent duplicates
  if (document.getElementById("slots") !== null) {
    console.debug("Slots is already open");
    return;
  }

  petInteract.style.zIndex = '-1'; //Disable pet interaction
  overlay.style.backgroundImage = "url('" + image_db["slots"]["machine"] + "')";
  overlay.innerHTML = `
    <div id="slots">
      <div id="slot-counters">
        <div class="slot" id="slot1"><img src="` + image_db["slots"]["a"] + `" /></div>
        <div class="slot" id="slot2"><img src="` + image_db["slots"]["b"] + `" /></div>
        <div class="slot" id="slot3"><img src="` + image_db["slots"]["c"] + `" /></div>
      </div>
      <input id="slot-button" type="button" value="` + printf(getString("slots_start_button"), activities.slots.cost) + `" onclick="runSlots();" />
      <input id="slot-button-exit" type="button" value="` + getString("slots_exit_button") + `" onclick="closeSlots();" />
      <p id="slot-text">` + getString("slots_welcome") + `</p>
    </div>`;
}

function closeSlots() {
  petInteract.style.zIndex = '1'; //Enable pet interaction
  overlay.style.backgroundImage = 'none';
  overlay.innerHTML = '';
}
var slotIntervals = null;
var slotLoopCounter = 0;
var slotNumbers = [1, 1, 1];

function runSlots() {
  var slotButton = document.getElementById('slot-button');
  var slotButtonExit = document.getElementById('slot-button-exit');
  var slotText = document.getElementById('slot-text');

  slotButton.disabled = true;
  slotButtonExit.disabled = true;
  if (slotIntervals !== null) {
    if (slotLoopCounter < 15) {
      return;
    }

    slotButton.disabled = false;
    slotButtonExit.disabled = false;
    clearInterval(slotIntervals[0]);
    clearInterval(slotIntervals[1]);
    clearInterval(slotIntervals[2]);
    slotIntervals = null;
    slotLoopCounter = 0;
    slotButton.value = printf(getString("slots_start_button"), activities.slots.cost);

    if (slotNumbers[0] == slotNumbers[1] && slotNumbers[1] == slotNumbers[2]) {
      slotSoundWin.play();
      slotText.innerHTML = printf(getString("slots_win"), activities.slots.win, activities.slots.cost);
      speak(petName, printf(getString("slots_win_pet_speak"), activities.slots.win, activities.slots.cost));
      adjustCoins(activities.slots.win_coins);
      adjustMood(activities.slots.win_mood);
    } else {
      slotSoundLoose.play();
      slotText.innerHTML = getString("slots_lose");
      speak(petName, printf(getString("slots_lose_pet_speak"), activities.slots.cost));
      adjustMood(activities.slots.lose_mood);
    }

    return;
  } else {
    if (coins < activities.slots.cost) {
      errorSound.play();
      slotText.innerHTML = printf(getString("slots_poor"), activities.slots.cost);
      speak(petName, printf(getString("slots_poor_pet_speak"), activities.slots.cost));
      adjustMood(activities.slots.poor_mood);
      return;
    }

    adjustCoins(activities.slots.cost * -1);
  }

  var slot1 = document.getElementById('slot1');
  var slot2 = document.getElementById('slot2');
  var slot3 = document.getElementById('slot3');

  slotIntervals = [];

  slotIntervals[0] = setInterval(function () {
    slotSoundClick.play();

    //Loop counter to allow stopping
    slotLoopCounter++;
    if (slotLoopCounter > 15) {
      slotButton.disabled = false;
      slotButton.value = 'Stop!';
    }

    slotNumbers[0]++;
    if (slotNumbers[0] > 3) {
      slotNumbers[0] = 1;
    }

    slot1.innerHTML = slotNumberToFruit(slotNumbers[0]);
  }, Math.floor(Math.random() * 20 + 1) + 150);

  slotIntervals[1] = setInterval(function () {
    slotNumbers[1]++;
    if (slotNumbers[1] > 3) {
      slotNumbers[1] = 1;
    }

    slot2.innerHTML = slotNumberToFruit(slotNumbers[1]);
  }, Math.floor(Math.random() * 20 + 1) + 150);

  slotIntervals[2] = setInterval(function () {
    slotNumbers[2]++;
    if (slotNumbers[2] > 3) {
      slotNumbers[2] = 1;
    }

    slot3.innerHTML = slotNumberToFruit(slotNumbers[2]);
  }, Math.floor(Math.random() * 20 + 1) + 150);

  slotButton.value = getString("slots_running");
  slotText.innerHTML = getString("slots_running_spin");
  slotSoundPull.play();
}

function slotNumberToFruit(number) {
  if (number == 1) {
    return `<img src="` + image_db["slots"]["a"] + `" />`;
  } else if (number == 2) {
    return `<img src="` + image_db["slots"]["b"] + `" />`;
  } else if (number == 3) {
    return `<img src="` + image_db["slots"]["c"] + `" />`;
  } else {
    return '!!';
  }
}

//+++ Helpers +++

//Outputs text to the talk box.
function speak(from, message) {
  if (from == petName) {
    speakTimer = 0;
    if (!pet.classList.contains("party")) {
      pet.classList.add("jump");
    }
  }

  talk = talk + '\n' + from + ': ' + message;
  talkBox.value = talk;
  talkBox.scrollTop = talkBox.scrollHeight;
}
//Mini version of et system to allow speach animation
var speakTimer = -1;

function speakAnimator() {
  if (speakTimer == -1) {
    return;
  }
  if (speakTimer < 1) {
    speakTimer++;
  }
  if (speakTimer >= 1) {
    pet.classList.remove("jump");
    speakTimer = -1;
  }
}

//Checks if the pet is within map bounds
function moveCheck(petX, petY) {
  if (petX > 0 && petX < 100) {
    if (petY > 40 && petY < 95) {
      return true;
    }
  }
  return false;
}

//Retruns a random number with in an arrays size
function randomArray(inputArray) {
  return Math.floor(Math.random() * inputArray.length);
}

//Returns a random number 0 to 100
function random100() {
  return Math.floor(Math.random() * 100 + 1);
}

//Inverts a boolean
function invertB(boolIn) {
  if (boolIn === true) {
    return false;
  } else {
    return true;
  }
}

//Gets URL parameters
function getParameterByName(name, url) {
  if (params) {
    return params[name];
  } else {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



function getString(response_id, raw = false) {
  // Fall back if the selected locale isn't found
  let strings_by_locale = string_db[locale] ?? string_db["en"];

  // Find the string in the db. Fall back to en if it isn't found
  // If it isn't found in en, return false
  let string_in_locale = strings_by_locale[response_id] ?? string_db["en"][response_id] ?? false;

  if (string_in_locale === false) {
    console.warn(`A string with ID "${response_id}" was not found in locale ${locale}`);
    return "";
  }

  // If it's an object, then randomize the options
  if (typeof string_in_locale == "object") {
    // Return the available options raw
    if (raw) {
      return string_in_locale;
    }

    let available_response_count = string_in_locale.length;
    return printf(string_in_locale[Math.floor(Math.random() * available_response_count)]);
  }

  return printf(string_in_locale);
}

function getSound(sound_id) {
  let available_sounds = sound_db[sound_id] ?? false;
  if (!available_sounds) {
    return false;
  }

  // If it's an object, then randomize the options
  if (typeof available_sounds == "object") {
    let available_sounds_count = available_sounds.length;
    return printf(available_sounds[Math.floor(Math.random() * available_sounds_count)]);
  }

  return printf(available_sounds);
}

function adjustMood(adjustment, set = false) {
  if (set) {
    mood = adjustment
  } else {
    mood += adjustment;
  }
  saveMood(mood);
}

function saveMood(mood) {
  localStorage.setItem("mood", mood);
  return mood;
}

function loadMood() {
  let getMood = parseInt(localStorage.getItem("mood"));
  console.log("mood", getMood);
  if (getMood === false || getMood === null || !getMood.toString().match(/^[0-9]{1,3}$/)) {
    console.log(`Mood value ${getMood} is invalid. Resetting mood.`)
    getMood = 50;
    saveMood(getMood);
  }

  return getMood;
}

function adjustBelly(adjustment, set = false) {
  if (set) {
    belly = adjustment
  } else {
    belly += adjustment;
  }
  saveMood(belly);
}

function saveBelly(belly) {
  localStorage.setItem("belly", belly);
  return coins;
}

function loadBelly() {
  let getBelly = parseInt(localStorage.getItem("belly"));
  console.log("belly", getBelly);
  if (getBelly === false || getBelly === null || !getBelly.toString().match(/^[0-9]{1,3}$/)) {
    console.log(`Belly value ${getBelly} is invalid. Resetting belly.`)
    getBelly = 50;
    saveBelly(getBelly);
  }

  return getBelly;
}

function adjustCoins(adjustment, set = false) {
  if (set) {
    coins = adjustment
  } else {
    coins += adjustment;
  }
  saveCoins(coins);
}

function saveCoins(coins) {
  localStorage.setItem("coins", coins);
  return coins;
}

function loadCoins() {
  let getCoins = parseFloat(localStorage.getItem("coins"));
  console.log("coins", getCoins);
  if (getCoins === false || getCoins === null || !getCoins.toString().match(/^\-?[0-9]+(\.[0-9]+)?$/)) {
    console.log(`Coin value ${getCoins} is invalid. Resetting coins to ${startingcoins}`);
    getCoins = startingcoins;
    saveCoins(getCoins);
  }

  return getCoins;
}

//+++ GifyPet Startup and Render +++

//Master game loop
var mainInterval = setInterval(function () {
  loop();
}, 1000);

var saveVisit = setInterval(function () {
  localStorage.setItem("lastVisited", Date.now());
}, 10);

//Apply colour to the table
for (var i = 0, row; (row = petTable.rows[i]); i++) {
  row.style.borderColor = tableColor;

  for (var j = 0, col; (col = row.cells[j]); j++) {
    col.style.borderColor = tableColor;
  }
}
petTable.style.borderColor = tableColor;

//Pick gender icon
var genderRender = "";
if (image_db["gender_marker"][gender] !== null) {
  genderRender = `<img class="uiicon" src="` + image_db["gender_marker"][gender] + `"/>`;
}

//General render settings
petdisplay.style.backgroundImage = "url('" + petImage + "')";
map.style.backgroundImage = "url('" + mapImage + "')";
petNameTag.innerHTML = petName;
petNameBox.innerHTML = petName + genderRender;
dobBox.innerHTML = dob;
elementBox.innerHTML = element;
document.body.style.backgroundImage = "url('" + bodyImage + "')";
document.body.style.color = textColor;
document.title = petName;

//Register interaction events
petInteract.addEventListener('pointerover', function () {
  pet.style.animation = 'wiggle 0.2s linear infinite';
});
petInteract.addEventListener('pointerout', function () {
  pet.style.animation = null;
});

//Welcome function calls
var secondsSinceLastVisit = Math.floor((nowDate - lastVisited) / 1000);
console.debug(`It's been ${secondsSinceLastVisit} seconds since the last visit`);
if (secondsSinceLastVisit > 0) {
  speak(petName, getString("welcome_back"));
  
  // Reduce mood for every second you were gone with a floor of 10
  let originalMood = mood;
  adjustMood(Math.floor(secondsSinceLastVisit * mood_decay_afk) * -1);
  if (mood < 10) {
    adjustMood(10, true);
  }
  let newMood = mood;
  if (originalMood > newMood) {
    decayNotice(`<img src="` + image_db["mood"] + `" style="height: 1em"> Mood: -${(originalMood - newMood)}%`);
  }
  
  // Reduce hunger for every second you were gone with a floor of 10
  let originalBelly = belly;
  adjustBelly(Math.floor(secondsSinceLastVisit * hunger_decay_afk) * -1);
  if (belly < 10) {
    adjustBelly(10, true);
  }
  let newBelly = belly;
  if (originalBelly > newBelly) {
    decayNotice(`<img src="` + image_db["belly"] + `" style="height: 1em"> Belly: -${(originalBelly - newBelly)}%`);
  }
} else {
  speak(petName, getString("welcome"));
}

function decayNotice(message) {
  document.getElementById("decay_display").classList.add("display");
  document.getElementById("decay_text").innerHTML += `<div>${message}</div>`;
  setTimeout(function() {
    document.getElementById("decay_display").classList.remove("display");
  }, 8000)
}

//Load sounds
var pettSound = new Audio(getSound("pett"));
var eatSound = new Audio(getSound("eat"));
var partySound = new Audio(getSound("party"));
var washSound = new Audio(getSound("wash"));
var talkSound = new Audio(getSound("talk"));
var errorSound = new Audio(getSound("error"));
var slotSoundClick = new Audio(getSound("slotsClick"));
var slotSoundPull = new Audio(getSound("slotsPull"));
var slotSoundWin = new Audio(getSound("slotsWin"));
var slotSoundLoose = new Audio(getSound("slotsLose"));

function printf(format, ...args) {
  let return_text = format.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match
  });

  return_text = return_text.replace("{petName}", petName);
  return_text = return_text.replace("{playerName}", playerName);
  return_text = return_text.replace("{coins}", coins);
  return_text = return_text.replace("{mood}", mood);
  return_text = return_text.replace("{belly}", belly);

  return return_text;
}