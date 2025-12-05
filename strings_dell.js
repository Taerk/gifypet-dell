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
string_db["dell"] = {
  "welcome": "Howdy! I'm {petName}.",
  "welcome_back": "Howdy! I'm {petName}.",
  "pett_pet_speak": "More please?",
  "talk_pet_speak": [
    'BOOMER WUZ HERE!',
    'I wonder when the next derby will be?',
    'Do you think Snake Eyes wears his assless chaps to bed?',
    'I love my family!',
    'I have the munchies.',
    'Wanna listen to music with me?',
    'I have at least 16 copies of Willow Springs.',
    'Wonder what Lockejaw is up to right now...',
    'I love you!',
    'I wanna hunt for shinies!',
    'Do you like rollerskating?',
    'I feel like dancing!',
    'I\'m gonna bite you :3',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'I should draw a portrait of you!',
    'I feel dizzy...'
  ],
  "talk_player_name": "y/n",
  // talk_player_converse is special, as the message and response are tied
  "talk_player_converse": [
    [
      "Hey Boomer!",
      "Hiii hi!! :D"
    ],
    [
      "I love you <3",
      "I love you too <3"
    ],
    [
      "Play your guitar for me?",
      "I\'d love to!"
    ],
    [
      "What are your pronouns?",
      "It/Woof/He!"
    ],
    [
      "Who\'s your favorite artist?",
      "Pink Floyd :3"
    ],
    [
      "Let\'s go scavenging!",
      "YAYAYYY!"
    ],
    [
      "Augie!!!",
      "That\'s me!"
    ],
  ],
  // Positioning for this is important due to food types using array indexes
  "feed_sayings": {
    0: [
      'For me?',
      'That was good, thanks!',
      'Yum!'
    ],
    1: [
      'YAY!!!',
      'Ough, thank you...',
      'That hit the spot!'
    ],
    2: [
      'MY FAVORITE!!!',
      'I love you, thank you!',
      '*noms*'
    ],
    3: [
      'Juice!!',
      '*sip*'
    ],
  },
  "feed_poor_name": "Ironside",
  "feed_poor_speak": "Come back later when you've earned enough.", // {0} - Cost
  "feed_mood_20_pet_speak": "Can I have a snack, please?",
  "feed_mood_40_pet_speak": "I'm hungry :(",
  "feed_mood_100_pet_speak": ":3c",
  "feed_mood_150_pet_speak": "I could really use a nap.",
  "feed_mood_200_pet_speak": "Mmm, sleepy...",
  "feed_full_pet_speak": [
    "I'm full now. Thanks!",
    "No thank you, I`m not hungry.",
    "Maybe later."
  ],
  "feed_auto_name": "Ironside",
  "feed_auto_speak": "Have a treat!",
  "rain_pet_speak": "Oh great, its raining...",
  "shower_poor_name": "!!",
  "shower_poor_speak": "You don\'t have enough coins.",
  "shower_pet_speak": "I feel so much better!",
  "party_pet_speak": "YEAAAAH!!!",
  "party_poor_name": "Snake Eyes",
  "party_poor_speak": "\"Hey, didn't I tell you no late night parties?\"", // {0} - Cost
  "slots_welcome": "<b>Welcome to GifySlots</b><br/>Lets play!",
  "slots_start_button": "Start! ({0}c)", // {0} - Cost
  "slots_exit_button": "Exit",
  "slots_win": "<b>YOU WON!</b>", // {0} - Earnings; {1} - Cost
  "slots_win_pet_speak": "YAAAAYY GAMBLING!!!!!", // {0} - Earnings; {1} - Cost
  "slots_lose": "<b>You failed.</b>",
  "slots_lose_pet_speak": "Ough... gambling...", // {0} - Cost
  "slots_poor": "<b>You need more coins for this.</b>", // {0} - Cost
  "slots_poor_pet_speak": "Awwww :(", // {0} - Cost
  "slots_running": "Spinning!",
  "slots_running_spin": "<b>Good luck!</b>"
};

// Like the text, these will randomize if there are multiple entries
var sound_db = {
  "pett": [
    "/public/sounds/yes-sonic-cd.mp3"
  ],
  "eat": [
    "/public/sounds/munch-sound-effect.mp3"
  ],
  "party": [
    "/public/sounds/stardust-speedway-2.mp3"
  ],
  "wash": [
    "/public/sounds/bubble-bath-banter_rG4ekkj.mp3"
  ],
  "talk": [
    "/public/sounds/sonic-cd-yeah.mp3"
  ],
  "error": [
    "/public/sounds/im-outta-here-sonic-cd.mp3"
  ],
  "slotsClick": [
    "/public/sounds/SonicCD_FM66.ogg"
  ],
  "slotsPull": [
    "/public/sounds/echl-sound-effect-slot-machine.mp3"
  ],
  "slotsWin": [
    "/public/sounds/alright-sonic-cd.mp3"
  ],
  "slotsLose": [
    "/public/sounds/sonic-death-sound-effect.mp3"
  ],
};

// These aren't randomized, so don't change them into arrays
image_db = {
  "gender_marker": {
    "f": "ui/girl.png",
    "m": "https://heavymedic.gay/public/stamps/tumblr_84d8a42b7e250033e268faae6bb06994_1ac339a9_75.png",
    "b": "https://heavymedic.gay/public/stamps/tumblr_cd33bb3402702af5985c5f0ed00f6324_8d0d4165_75.png"
  },
  "mood": "https://heavymedic.gay/public/stamps/tumblr_5de61d31e9b49c003ec36bcb4c4f64db_bf764497_75.webp",
  "belly": "https://heavymedic.gay/public/stamps/tumblr_f51e029b90134540be7300474e3dc226_8544f262_75.webp",
  "feed": "https://heavymedic.gay/public/stamps/dog_eat.gif",
  "slots": {
    "machine": "/public/sounds/slot.gif",
    "a": "/public/sounds/tumblr_5c58949f7207f05afdaff5be02f8113b_30e45c2f_75.webp",
    "b": "/public/sounds/tumblr_b44f829924be74fa0db86d1c6ac414e1_c85f095a_75.webp",
    "c": "/public/sounds/tumblr_ebbad443f8cc84aa60b2851a5aa1f497_412d3fa8_75.webp"
  },
  "rain": "overlays/rain.gif",
  "shower": "https://heavymedic.gay/public/stamps/tumblr_6251a0a6e4b29fe0291d2d759c312600_e8dff242_250.webp",
  "heartrain": "https://heavymedic.gay/public/stamps/ezgif-5e88db4f218d8379.gif",
  "party": {
    "background": "https://heavymedic.gay/public/stamps/WXLS5PGDXKN4WFBUSSUSK45B7LVZWZVT.gif",
    // Party guests section is special. All entries below will be added to the party
    "guests": [
      "https://heavymedic.gay/public/stamps/IMG_6838.gif",
      "https://heavymedic.gay/public/stamps/IMG_6839.gif",
      "https://heavymedic.gay/public/stamps/IMG_6836.gif"
    ]
  }
};