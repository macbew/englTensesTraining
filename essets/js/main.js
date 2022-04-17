import numUtils from '../../utils/numUtils.js';
import vokab from './vokabulary.js';

let randNum  = 0;

function start (){
  randNum = numUtils.getRandomArbitrary(0, 44);
  $('.russ').text(vokab.ru.Бегать[randNum-1]);//выбор русского предложения
  $('.result').text('?');
}

start();

function check(){
  if (    $('input[name="engl"]').val() === vokab.eng.Run[randNum-1]  ) {
    $('.result').text('It is  true')
  } else {
    $('.result').text('It is false')
  }
}


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