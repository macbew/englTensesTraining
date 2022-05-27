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
  tenses = getTenses(randExample);

  let punctuation = getPunctuation(randExample);
  $('.russ').text(vokab.ru.form[randPronoun][randExample] + vokab.ru.verbs[verb][tenses][randPronoun] + punctuation);//выбор русского предложения
  $('.result').text('?');
}


function chooseTimeEngVerb(randomPronoun, randExemple) {
  if (randExemple === 7) {
    return 2
  }
  if (randExemple === 4 && (randomPronoun > 1 && randomPronoun < 4)) {
    return 1
  }
  return 0
}

function getEnglSentence() {   //англ вариант
  let checkEng = [];
  if ((randExample + 1) % 3 === 0) {
    checkEng.push(vokab.eng.form[randPronoun][randExample][0] + vokab.eng.verbs[verb][numTime]);
    checkEng.push(vokab.eng.form[randPronoun][randExample][1] + vokab.eng.verbs[verb][numTime]);
    // console.log('your - ', input, '; soure - ', checkEng);
  } else {
    checkEng = vokab.eng.form[randPronoun][randExample] + vokab.eng.verbs[verb][numTime];
  }
  return checkEng;
}

function blink (color) {  
  $('.result').addClass(`blink${color}`);
  setTimeout(()=>{$('.result').removeClass(`blink${color}`)},1000)
}

function check() {
  let input = $('input[name=engl]').val().replace(/[^a-zа-яё0-9\s]/gi, '').trim().toLowerCase();
  const englSentence = getEnglSentence();
  if (Array.isArray(englSentence)) {//if get Array
    if (input === englSentence[0] || input === englSentence[1]) {
      $('.result').text("true");
      blink('Green');
      result = true;
    } else {
      $('.result').text("false").addClass("blinkRed")
      blink('Red');
      result = false;
    }
  }else if (input === englSentence) {
    $('.result').text("true").addClass("blinkGreen");
    blink('Green');
    result = true;
  } else {
    $('.result').text("false").addClass("blinkRed")
    blink('Red');
    result = false;
  }
  console.log('your - ', input, '; soure - ', englSentence);
}

function help() {
  const englSentence = getEnglSentence();
  if(Array.isArray(englSentence)){
    temp.push(englSentence[0][count]);
  } else{
  temp.push(englSentence[count]);
}
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