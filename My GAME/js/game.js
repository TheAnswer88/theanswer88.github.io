var SnakeGame = {
	titleLetters: {
		letterS: null,
		letterN: null,
		letterA: null,
		letterK: null,
		letterE: null
	},
	cell: null,
	cells: null,
	cellsSize: {
		x: 30,
		y: 24
	},
	snakeCoordinates: [],
	snakeBody: [],
	cellPosition: {
		x: 1,
		y: 1
	},
	snakeFood: [],
	createGame: null,
	gameField: null,
	gameTitle: null,
	snakeImage: null,
	item: null,
	createGameField: null,
	createGameCells: null,
	interval: null,
	changeDirection: null,
	snakeBodyHead: null,
	snakeBodyBody: null,
	snakeBodyTail: null,
	direction: 'right',
	preload: function () {
		// описание поля игры
		this.createGame = document.querySelector('body');
		
		//создание элементов
		this.gameField = document.createElement('div');
		this.gameTitle = document.createElement('div');
		this.snakeImage = document.createElement('img');
		//var gameTitleLetter = document.createElement('img');
		
		// добавление узла в начале тега body
		this.createGame.prepend(this.gameField); // в начале узла
		this.gameField.append(this.gameTitle);	// в конце узла
		this.gameField.append(this.snakeImage);

		// добавление png букв
		for (let key in this.titleLetters) { // доступ к каждому ключю объекта sprities
			this.titleLetters[key] = new Image();	//  конструктор Image для создания нового изображения
			this.titleLetters[key].src = 'img/' + key +'.png';
			this.titleLetters[key].classList.add('letter');
			this.gameTitle.append(this.titleLetters[key]);
		}
		
		// описание классов, id для созданных элементов
		this.gameField.classList.add('game');
		this.gameTitle.setAttribute('id', 'wrap_letters');
		this.snakeImage.src = 'img/front_snake.png';
		this.snakeImage.classList.add('fontSnake');

		// запуск анимации букв
		this.preloadAnim();
		//setTimeout(hidePreload, 4000);

		// исчезновение заставки
		
		},
		preloadDelay: function () {

		setTimeout(() => {this.hidePreload();}, 4000);
		},
		hidePreload: function () {
			//this.snakeImage = document.querySelector('.fontSnake');
			//this.gameTitle = document.querySelector('#wrap_letters');
			this.createGameField = document.querySelector('.gameCells');
			this.snakeImage.remove();
			this.gameTitle.remove();
			this.createGameField.style.display = 'flex';
			this.createGameField.style.flexWrap = 'wrap';
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
	createSells: function() {
		this.createGameField = document.querySelector('.game'); // находим див
		this.createGameCells = document.createElement('div');
		this.createGameCells.classList.add('gameCells');
		this.createGameField.appendChild(this.createGameCells); // поле с ячейками
		this.appearCell()	;
		// появление ячеек
		//setTimeout(this.appearCell(), 6000);

		//создание координат
		//this.createCoordinates();
	},
	appearCell: function() {
		for (i = 0; i < 720; i++) {
				this.cell = document.createElement('div'); // создаем ячейку
				this.createGameCells.appendChild(this.cell); // помещаем в него ячейку
				this.cell.classList.add('cell'); 
			}
			//this.createGameCells.style.display = 'flex';
			//this.createGameCells.style.flexWrap = 'wrap';

			this.cells = document.getElementsByClassName('cell');
			for (var j = 0; j < this.cells.length; j++) {
				if (this.cellPosition.x > this.cellsSize.x) {
					this.cellPosition.x = 1
					this.cellPosition.y++;
				}
				this.cells[j].setAttribute('posX', this.cellPosition.x);  // создание атрибутов положения ячеек
				this.cells[j].setAttribute('posY', this.cellPosition.y);
				this.cellPosition.x++;
			} 
	},
	createSnake: function () { // рандомное создание змеи
		var posSnakeX = Math.round(Math.random() * (this.cellsSize.x - 1) + 3); // рандомные x, y змеи, минимальное значение 3, чтобы змейка попала в поле
		var posSnakeY = Math.round(Math.random() * (this.cellsSize.y - 1) + 1);
		this.snakeCoordinates.push(posSnakeX);
		this.snakeCoordinates.push(posSnakeY);

		// создание змейки голова и тело
		this.snakeBodyHead = document.querySelector('[posx = "' + this.snakeCoordinates[0] + '"]' + '[posy = "' + this.snakeCoordinates[1] + '"]');
		this.snakeBodyBody = document.querySelector('[posx = "' + (this.snakeCoordinates[0] - 1) + '"]' + '[posy = "' + this.snakeCoordinates[1] + '"]');
		this.snakeBodyTail = document.querySelector('[posx = "' + (this.snakeCoordinates[0] - 2) + '"]' + '[posy = "' + this.snakeCoordinates[1] + '"]');

		// добавление в массив частей змейки при старте игры
		this.snakeBody.push(this.snakeBodyHead);
		this.snakeBody.push(this.snakeBodyBody);
		this.snakeBody.push(this.snakeBodyTail);

		//добавим классы с описанием картинки
		this.snakeBody[0].classList.add('snakeHead');
		this.snakeBody[1].classList.add('snakeBody');
		this.snakeBody[this.snakeBody.length - 1].classList.add('snakeTail');
		console.log(this.snakeBody);
	},
	createSnakeFood: function () {
		var snakeFoodX = Math.round(Math.random() * (this.cellsSize.x - 1) + 1); // рандомные x, y змеи, минимальное значение 3, чтобы змейка попала в поле
		var snakeFoodY = Math.round(Math.random() * (this.cellsSize.y - 1) + 1);
		this.snakeFood.push(snakeFoodX);
		this.snakeFood.push(snakeFoodY);
		console.log(this.snakeFood);

		// создание еды для змеи
		var food = document.querySelector('[posx = "' + this.snakeFood[0] + '"]' + '[posy = "' + this.snakeFood[1] + '"]');
		food.classList.add('snakeFood');

		while(food.classList.add('snakeHead') || food.classList.add('snakeBody') || food.classList.add('snakeTail')) {
			this.createSnakeFood();
		}
		console.log(food);
	},
	moveRight: function () { // движение змеи - удаление головы и хваста и наращивание тела
		var p = [this.snakeBody[0].getAttribute('posx'), this.snakeBody[0].getAttribute('posy')];
		this.snakeBody[0].classList.remove('snakeHead'); // удаление головы
		this.snakeBody[this.snakeBody.length - 1].classList.remove('snakeTail'); // удаление хвоста

		this.snakeBody[this.snakeBody.length - 1].classList.remove('snakeBody');
		this.snakeBody.pop(); // удаляем последний элемент массива

		if (this.direction == 'top') {
			console.log('hurra');
		}
		if (p[0] < this.cellsSize.x) { // если змейка доходит до правого края поля
			this.snakeBody.unshift(document.querySelector('[posx = "' + (+p[0] + 1) + '"]' + '[posy = "' + p[1] + '"]'));
		} else {
			this.snakeBody.unshift(document.querySelector('[posx = "1"]' + '[posy = "' + p[1] + '"]')); // появляется сначала левого поля
		}
		this.snakeBody[0].classList.add('snakeHead');

		this.snakeBody[this.snakeBody.length - 1].classList.add('snakeTail');
		
		for (var i = 0; i < this.snakeBody.length; i++) {
			this.snakeBody[i].classList.add('snakeBody');
		}
		this.direction;
	},
	moveTop: function () {
		console.log('pop');
	},
	interval: function () {
		setInterval(() => {this.moveRight();}, 1000); // запуск функции через интервал
	},
	changeDirection: function () {
		document.addEventListener('keydown', function(event) {
			if (event.code == 'ArrowLeft') {
			}
			else if (event.code == 'ArrowUp') {
				this.direction = 'top';
			}
			else if (event.code == 'ArrowRight') {
				this.direction = 'right';
			}
			else if (event.code == 'ArrowDown') {
			}
		});
	},
	start: function () {
		this.preload();
		this.preloadDelay();
		this.createSells();
		this.createSnake();
		this.createSnakeFood();
		this.interval();
		this.changeDirection();
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