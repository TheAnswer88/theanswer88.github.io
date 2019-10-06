var SnakeGame = {
	titleLetters: {
		letterS: null,
		letterN: null,
		letterA: null,
		letterK: null,
		letterE: null
	},
	preload: function () {
		// описание поля игры
		var createGame = document.querySelector('body');
		
		//создание элементов
		var gameField = document.createElement('div');
		var gameTitle = document.createElement('div');
		var snakeImage = document.createElement('img');
		//var gameTitleLetter = document.createElement('img');
		
		// добавление узла в начале тега body
		createGame.prepend(gameField); // в начале узла
		gameField.append(gameTitle);	// в конце узла
		gameField.append(snakeImage);

		// добавление png букв
		for (let key in this.titleLetters) { // доступ к каждому ключю объекта sprities
			this.titleLetters[key] = new Image();	//  конструктор Image для создания нового изображения
			this.titleLetters[key].src = 'img/' + key +'.png';
			this.titleLetters[key].classList.add('letter');
			gameTitle.append(this.titleLetters[key]);
		}
		
		// описание классов, id для созданных элементов
		gameField.classList.add('game');
		gameTitle.setAttribute('id', 'wrap_letters');
		snakeImage.src = 'img/front_snake.png';
		snakeImage.classList.add('fontSnake');

		// запуск анимации букв
		this.preloadAnim();
		},
	preloadAnim: function () {
		var item = document.getElementById('wrap_letters');
		var letters = [];
		var select;
		for (var i = 0; i < item.children.length; i++) {	// все дочерние элементы (img) внутри дива 
			letters.push(item.children[i]);
		}
		
		function generateLetters() {
			select = Math.floor(Math.random() * letters.length); // случайная генерация от 0 до 3
			setTimeout(animateLetters, (Math.random() * 500) + 100) // вызов функции со случайной задержкой времени
		}

		function animateLetters() {
			letters[select].classList.add('lettersAnim');
			letters.splice(select, 1); // анимация запускается для случайной буквы из массива, а потом удаляет ее, чтобы ее нельзя было повторно заанимировать
			if (letters.length > 0) {
				generateLetters(); // пока количество элементов массива больше 0
			}
		}
		generateLetters();
	},
	start: function () {
		this.preload();
	}
};
SnakeGame.start();

	





/*
var elem = document.getElementById('wrap');
var letters = [];
var sel;
for (var i = 0; i < elem.children.length; i++) {
	letters.push(elem.children[i]);
}

function generate() {
	sel = Math.floor(Math.random() * letters.length);
	setTimeout(animate, (Math.random() * 500) + 100)
}
function animate() {
	letters[sel].classList.add('anim');
	letters.splice(sel, 1);
	if (letters.length > 0) {
		generate();
	}
}
generate();*/