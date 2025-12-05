// Init strings. Don't change these next three lines.
var string_db = {};
var sound_db = {};
var image_db = {};

// -- You can start making changes here --
// To override strings, copy everything here and below into a new file and load it after strings.js
// It should look something like this in the HTML:
// 
//      <script src="settings.js"></script>
//      <script src="strings.js"></script>
//      <script src="strings_dell.js"></script>
//
// Text with only one response will give that response
// Text in an array gives a random response
//
// Use values {0}..{9} as placeholders. What is placed in the placeholder is used determined in pet.js
// There are also some constant values available:
// - {petName} - The name of the pet
// - {playerName} - The name of the player/caretaker
// - {coins} - The number of coins you have
// - {mood} - The mood value
// - {belly} - The belly (fed) value
//
// The text will default try to default to "en" if another locale is not available
string_db["en"] = {
  "welcome": "Hello, I'm {petName} and you're awesome!",
  "welcome_back": "Hello, I'm {petName} and you're awesome!",
  "pett_pet_speak": "Yay, petts for {petName}!!",
  "talk_pet_speak": [
    'ALOvE you VERA much!',
    'The sky is pixels!',
    'Why do I exist?',
    'Pandas are silly',
    'Did you know a ripe cranberry will bounce.',
    'Im rooting for you!',
    'Youre looking sharp today!',
    'Orange you smart!',
    'Bubble yum keeps it poppin',
    'Im really quite frond of you :P',
    'Its a fine day with you around..',
    'I think your a swell person',
    'I hope I never get uninstalled!',
    "To me, you're the gifypet!",
    'Remember to be happy!',
    'You make every day special :P',
    'The sun never sets on Melonland',
    'BOO! I scared you :O',
    'Moo! Im a dragon!',
    'Bruup',
    'AHHchoooooooooo..',
    'Mrumph',
    'I like you :3',
    'Poof! You cant see me now!',
    'I got lost in the MoMG Gallery once!',
    "Buy Ozwomp's Voyage!"
  ],
  "talk_player_name": "You",
  // talk_player_converse is special, as the message and response are tied
  "talk_player_converse": [
    [
      'Whos the best pet!',
      'Meeeeee :D'
    ],
    [
      'You should get a job in finance!',
      'Ummmm... No...'
    ],
    [
      'What time is it?',
      'Beats me!'
    ],
    [
      'Who ya gonna call!',
      'GifyPets!',
    ],
    [
      'Do you know Ferris?',
      'Hes a righteous dude!',
    ],
    [
      'Are you a panda?',
      'Well what do you think..'
    ]
  ],
  // Positioning for this is important due to food types using array indexes
  "feed_sayings": {
    0: [
      'Yum, That was realy filling!',
      'Its good to eat!',
      'ROMNOMNOMNOM',
      'Mmmmmm <3',
      'This is almost as nice as you!',
      'For me :D',
      'I WILL EAT IT!'
    ],
    1: [
      'YAYAYAYAYAY',
      'OMG YUM',
      'Yumo',
      'I like this very much!'
    ],
    2: [
      'Thanks I guess..',
      'I guess you cant afford anything better?',
      'I can eat this..',
      'You eat this stuff regularly?',
      "It\'s food..."
    ],
    3: [
      'Refreshing!',
      'I was so thirsty!',
      'TIME TO GET PEPSI DRUNK!',
      'Glug glug glug',
      'Drinkn a drink, ya ya ya, thats my song...',
      'I can drink to that!'
    ],
  },
  "feed_poor_name": "FoodShop",
  "feed_poor_speak": "Food costs {0} coins!", // {0} - Cost
  "feed_mood_20_pet_speak": "HUNGRY! HUNGRY!!!",
  "feed_mood_40_pet_speak": "I\'m getting peckish..",
  "feed_mood_100_pet_speak": "Mmmmmm",
  "feed_mood_150_pet_speak": "I\'m getting a bit fat!",
  "feed_mood_200_pet_speak": "FAT FAT FAT!",
  "feed_full_pet_speak": "I\'m too full to eat more :(",
  "feed_auto_name": "Friend",
  "feed_auto_speak": "Here is some food {petName} ;)",
  "rain_pet_speak": "Oh great, its raining...",
  "shower_poor_name": "MrShower",
  "shower_poor_speak": "You can't afford my services..",
  "shower_pet_speak": "Yay a bath time :D",
  "party_pet_speak": "WOOOOOOT :D ;D",
  "party_poor_name": "Pimp",
  "party_poor_speak": "\"You can't afford my services..\"", // {0} - Cost
  "slots_welcome": "<b>Welcome to GifySlots</b><br/>Lets play!",
  "slots_start_button": "Start! ({0}c)", // {0} - Cost
  "slots_exit_button": "Exit",
  "slots_win": "<b>YOU WON!</b><br/>{0}c for you :)", // {0} - Earnings; {1} - Cost
  "slots_win_pet_speak": "Wow, you're my hero ;3", // {0} - Earnings; {1} - Cost
  "slots_lose": "<b>Aww :(</b><br/>Try again!",
  "slots_lose_pet_speak": "Are you wasting my coins? ;-;", // {0} - Cost
  "slots_poor": "<b>YOU'RE POOR</b><br/>You need coins to play..", // {0} - Cost
  "slots_poor_pet_speak": "HOW AM I GONNA BUY FOOD NOW!", // {0} - Cost
  "slots_running": "Running!",
  "slots_running_spin": "<b>THE SLOTS SPIN :O</b><br/>Good Luck!"
};

// Like the text, these will randomize if there are multiple entries
sound_db = {
  "pett": [
    ""
  ],
  "eat": [
    "audio/ommnom.mp3"
  ],
  "party": [
    "audio/party.mp3"
  ],
  "wash": [
    "audio/shower.mp3"
  ],
  "talk": [
    "audio/hello.mp3"
  ],
  "error": [
    "audio/ohno.mp3"
  ],
  "slotsClick": [
    "slots/click.mp3"
  ],
  "slotsPull": [
    "slots/lever.mp3"
  ],
  "slotsWin": [
    "slots/win.mp3"
  ],
  "slotsLose": [
    "slots/loose.mp3"
  ],
};

// These aren't randomized, so don't change them into arrays
image_db = {
  "gender_marker": {
    "f": "ui/girl.png",
    "m": "ui/boy.png",
    "b": "ui/both.png"
  },
  "mood": "ui/heart.gif",
  "belly": "ui/meat.png",
  "feed": "overlays/face.gif",
  "slots": {
    "machine": "slots/slots.gif",
    "a": "slots/slot1.png",
    "b": "slots/slot2.png",
    "c": "slots/slot3.png"
  },
  "rain": "overlays/rain.gif",
  "shower": "overlays/shower.gif",
  "heartrain": "overlays/heartrain.gif",
  "party": {
    "background": "overlays/party.gif",
    // Party guests section is special. All entries below will be added to the party
    "guests": [
      "pets/robot.gif",
      "pets/dog.gif",
      "pets/flower.gif",
      "pets/frog.gif",
      "pets/cactus.gif",
    ]
  }
};