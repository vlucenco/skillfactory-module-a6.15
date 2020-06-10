const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missedHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый - DONE
  $(".target").removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).removeClass("miss");
  // TODO: помечать target текущим номером - DONE
  $(".target").text(hits + 1);
  // FIXME: тут надо определять при первом клике firstHitTime - DONE
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function startGame() {
  $("#button-start").addClass("d-none");
  $("#game-playground").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
  round();
}

function endGame() {
  // FIXME: спрятать игровое поле сначала - DONE
  $("#game-playground").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#final-score").text(hits-missedHits);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? - DONE
  if ($(event.target).hasClass("target")) {
    $(".target").text("");
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
    missedHits = missedHits + 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss - DONE
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке - DONE
  $("#button-start").click(startGame);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();
  });
}

$(document).ready(init);
