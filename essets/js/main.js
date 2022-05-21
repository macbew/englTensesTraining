import numUtils from '../../utils/numUtils.js';
import vokab from './vokabulary.js';

let randPronoun = 0;
let randExample = 0;
let tenses = 0;
let verb = 0;
let numTime = 0;
// let checkEng = '';
let count = 0;//for help()
let temp = [];//for help()
let result = false;

function getTenses(example) {//получение времени
  if (example > 2 && randExample < 6) {
    return 1;//present
  }
  if (example > 5) {
    return 2;//past
  }
  return 0//future
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
  $('#blur').addClass('blur');//блюрим
  randPronoun = numUtils.getRandomArbitrary(0, 5);
  randExample = numUtils.getRandomArbitrary(0, 8);
  verb = numUtils.getRandomArbitrary(0, vokab.ru.verbs.length - 1);
  numTime = chooseTimeEngVerb(randPronoun, randExample);
  // if((randExample + 1) % 3 === 0){
  //   checkEng = vokab.eng.form[randPronoun][randExample] + vokab.eng.verbs[verb][numTime];//англ вариант
  // }
  // checkEng = vokab.eng.form[randPronoun][randExample] + vokab.eng.verbs[verb][numTime];//англ вариант
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

  if ((randExample + 1) % 3 === 0) {
    let checkEngNegativ = vokab.eng.form[randPronoun][randExample][0] + vokab.eng.verbs[verb][numTime];//англ вариант
    let checkEngNegativ2 = vokab.eng.form[randPronoun][randExample][1] + vokab.eng.verbs[verb][numTime];//англ вариант
    console.log('your - ', input, '; soure - ', checkEngNegativ, 'OR ', checkEngNegativ2);
    if (input === checkEngNegativ || input === checkEngNegativ2) {
      $('.result').text("true");
      result = true;
    } else {
      $('.result').text("false")
      result = false;
    }
  } else {
    let checkEng = vokab.eng.form[randPronoun][randExample] + vokab.eng.verbs[verb][numTime];//англ вариант
    console.log('your - ', input, '; soure - ', checkEng);
    // console.log();
    if (input === checkEng) {
      $('.result').text("true");
      result = true;
    } else {
      $('.result').text("false")
      result = false;
    }
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

$(document).keypress(function (e) {//срабатывает 2 раза - разобратсья
  if (e.key === "Enter") {
    if (result === false) {
      check();
    } else {
      start();
    }
  }
})

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

$('.blur').click(function (e) { //проверка перевода
  $('.blur').removeClass('blur');
})