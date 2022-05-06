import numUtils from '../../utils/numUtils.js';
import vokab from './vokabulary.js';

let randPronoun = 0;
let randExample = 0;
let tenses = 0;
let verb = 0;
let numTime = 0;
let checkEng = '';
let count = 0;//for help()
let temp = [];//for help()
let result = false;

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
  result = false;
  count = 0;//обнуляем счётчик
  temp = [];//обнуляем подсказку
  $('input[name=engl]').val('');// обнуляем поле ввода
  randPronoun = numUtils.getRandomArbitrary(0, 6);
  randExample = numUtils.getRandomArbitrary(0, 8);
  verb = numUtils.getRandomArbitrary(0, vokab.ru.verbs.length - 1);
  numTime = chooseTimeEngVerb(randPronoun, randExample);
  checkEng = vokab.eng.form[randPronoun][randExample] + vokab.eng.verbs[verb][numTime];
  tenses = getTenses(randExample);

  let punctuation = getPunctuation(randExample);
  $('.russ').text(vokab.ru.form[randPronoun][randExample] + vokab.ru.verbs[verb][tenses][randPronoun] + punctuation);//выбор русского предложения
  $('.result').text('?');
}


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


  console.log(checkEng);
  if (input === checkEng) {
    $('.result').text("true");
    result = true;
  } else {
    $('.result').text("false")
    result = false;
  }
}

function help() {
  temp.push(checkEng[count]);
  count++;
  $('input[name="engl"]').val(temp.join(''));
}

start();

$('.help').click(function (e) {
  e.preventDefault();
  help();
})

$(document).keypress(function (e) {
  if (e.key === "Enter") {
    if (result === false) {
      check();
    } else {
      start();
    }
  }
})

// $(document).keydown(function (e) {
//   if (e.which == 38) {
//     start();
//   }
// })

$('.check').click(function (e) { //проверка перевода
  e.preventDefault();
  check();
})

$('.next').click(function (e) {
  e.preventDefault();
  start();
})

$('input[name="engl"]').click(function () {//reset result befor type answer
  $('.result').text('?');
})