import numUtils from '../../utils/numUtils.js';
import vokab from './vokabulary.js';

let randPronoun = 0;
let randExample = 0;
let tenses = 0;
let verb = 0;
// let punctuation = "."

// const time = {future: 0, present: 1, past: 2};

function getTenses(example) {
  if (example > 2 && randExample < 6) {
    return 1;
  }
  if (example > 5) {
    return 2;
  }
  return 0
}

function getPunctuation(example) {
  if ((example) % 3 === 0 || example === 0) {
    return "?";
  }
  return "."
}

function start() {
  $('input[name=engl]').val('');
  randPronoun = numUtils.getRandomArbitrary(0, 6);
  randExample = numUtils.getRandomArbitrary(0, 8);
  tenses = getTenses(randExample);
  verb = numUtils.getRandomArbitrary(0, vokab.ru.verbs.length - 1);

  let punctuation = getPunctuation(randExample);
  $('.russ').text(vokab.ru.form[randPronoun][randExample] + vokab.ru.verbs[verb][tenses][randPronoun] + punctuation);//выбор русского предложения
  $('.result').text('?');
}

start();

function chooseTimeEngVerb(randomPronoun, randExemple) {
  if (randExemple === 7) {
    return 2
  }
  if (randExemple === 4 && (randomPronoun > 1 && randomPronoun < 5)) {
    return 1
  }
  return 0
}

function check() {
  let input = $('input[name=engl]').val().replace(/[^a-zа-яё0-9\s]/gi, '').trim().toLowerCase();
  console.log(input);

  let numTime = chooseTimeEngVerb(randPronoun, randExample);
  let checkEng = vokab.eng.form[randPronoun][randExample] + vokab.eng.verbs[verb][numTime];

  console.log(checkEng);
  if (input === checkEng) {
    $('.result').text("true")
  } else {
    $('.result').text("false")
  }
}

$(document).keypress(function (e) {
  if (e.key === "Enter") {
    check();
  }
})

$('.check').click(function (e) { //проверка перевода
  e.preventDefault();
  check();
})

$('.next').click(function (e) { //проверка перевода
  e.preventDefault();
  start();
})

$('input[name="engl"]').click(function () {//reset befor type answer
  $('.result').text('?');
})