'use strict';

var createRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var createText = function (ctx, text, x, y, font, color, baseLine) {
  ctx.font = font;
  ctx.fillStyle = color;
  if (baseLine) {
    ctx.textBaseline = baseLine;
  } else {
    ctx.textBaseline = 'alphabetic';
  }
  ctx.fillText(text, x, y);
};

var findMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  // Параметры облака
  var cloudX = 100;
  var cloudY = 0;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudColor = 'white';

  // Параметры тени облака
  var shadowOffset = 10;
  var shadowX = cloudX + shadowOffset;
  var shadowY = cloudY + shadowOffset;
  var shadowColor = 'rgba(0, 0, 0, 0.7)';

  // Параметры текста на облаке
  var textFont = '16px PT Mono';
  var textColor = 'black';
  var textOffset = 40;
  var textX = cloudX + textOffset;
  var textY = cloudY + textOffset;
  var textFirstLine = 'Ура, вы победили!';
  var textSecondLine = 'Список результатов:';
  var lineHeight = 20;

  // Параметры гистограммы
  var gistOffset = 30;
  var gistTextOffset = 5;
  var gistY = textY + lineHeight + gistOffset;
  var gistHeight = 150;
  var gistColumnWidth = 40;
  var gistColumnSpace = 50;
  var gistOwnColor = 'rgba(255, 0, 0, 1)';
  var worstScore = findMaxElement(times);

  // Рисуем тень облака
  createRect(ctx, shadowX, shadowY, cloudWidth, cloudHeight, shadowColor);

  // Рисуем облако
  createRect(ctx, cloudX, cloudY, cloudWidth, cloudHeight, cloudColor);

  // Рисуем текст на облаке
  createText(ctx, textFirstLine, textX, textY, textFont, textColor);
  createText(ctx, textSecondLine, textX, textY + lineHeight, textFont, textColor);

  // Рисуем гистограмму
  for (var i = 0; i < names.length; i++) {
    var columnColor = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      columnColor = gistOwnColor;
    }
    var columnHeight = gistHeight * times[i] / worstScore;
    var columnY = gistY + gistHeight - columnHeight;
    var columnX = textX + i * (gistColumnWidth + gistColumnSpace);

    createRect(ctx, columnX, columnY, gistColumnWidth, columnHeight, columnColor);
    createText(ctx, times[i].toFixed(), columnX, columnY - gistTextOffset, textFont, textColor);
    createText(ctx, names[i], columnX, gistY + gistHeight + gistTextOffset, textFont, textColor, 'hanging');
  }
};
