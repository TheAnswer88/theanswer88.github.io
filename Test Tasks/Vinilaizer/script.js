"use strict";
let vinilaizer = {
	musicSwitch: false,
	musicButton: null,
	timerId: null,
	vinylMove: null,
	startSpeed: 0,
	audioSong: null,
	currentSongTime: {
		songMin: null,
		songSec: null,
		songMillSec: null
	},
	allSongs: null,
	time: null,
	count: 0,
	songTitle: null,
	titleMove: null,
	SVGObjectElem: null,
	songDuration: null,
	toneArm: null,
	toneArmPosition: 38,
	selectDiscCoord: null,
	startGame() {
		// добавление аудио 
		this.audioSong = new Audio;
		this.audioSong.src = 'Urban country-Knife and Stone.mp3';
		this.createTimeIndicator();
		this.addSongTitle()
		this.selectSong();
		this.startStopMusic();


		// music duration
		vinilaizer.audioSong.addEventListener('loadedmetadata', function() {
			vinilaizer.songDuration = Math.floor(vinilaizer.audioSong.duration);
     console.log(vinilaizer.songDuration);
		});
	},
	startAnimation() {
    // плавное движение - от 25 кадр/сек
    this.timerId = setInterval(this.tickAnimation,40);
	},
	tickAnimation() {
    vinilaizer.startSpeed +=2;
    vinilaizer.vinylMove.style.transform = 'rotate(' + vinilaizer.startSpeed + 'deg)';
    if (vinilaizer.startSpeed == 360) {
    	vinilaizer.startSpeed = 0;
    }

    // вращение надписи
    vinilaizer.titleMove = document.querySelector('.circular');
    vinilaizer.titleMove.style.transform = 'rotate(' + vinilaizer.startSpeed + 'deg)' + 'scale(2)';

    // движение звукоснимателя
    let toneArmDegrees = 19;	// 19 диапазон поворота звукоснимателя в градусах
    vinilaizer.toneArmPosition += toneArmDegrees/25/vinilaizer.songDuration; // 25 кадров в секунду
    vinilaizer.toneArm = document.querySelector('.tonearm');
    vinilaizer.toneArm.style.transform = 'rotate(' + vinilaizer.toneArmPosition + 'deg)';
    console.log(18/25/vinilaizer.songDuration);

    let secondsInMinute = 60;
    let currentTime = vinilaizer.audioSong.currentTime;
    // current time of song
    // current milliseconds
    vinilaizer.currentSongTime.songMillSec.textContent = currentTime.toFixed(3).slice(-3,-1);

    // current seconds
    if (Math.trunc(currentTime) < 10) { // 10 - time limit
    	vinilaizer.currentSongTime.songSec.textContent = '0' + Math.trunc(currentTime);
    }
    else if (Math.trunc(currentTime) - 60*Number(vinilaizer.currentSongTime.songMin.innerHTML) < 10) {
    	vinilaizer.currentSongTime.songSec.textContent = '0' + (Math.trunc(currentTime) - 60*Number(vinilaizer.currentSongTime.songMin.innerHTML));
    }
    else {
    	vinilaizer.currentSongTime.songSec.textContent = Math.trunc(currentTime) - 60*Number(vinilaizer.currentSongTime.songMin.innerHTML);
    }

    // current minutes
    vinilaizer.currentSongTime.songMin.textContent = Math.floor(Math.trunc(currentTime)/60);
    console.log(currentTime);
  },
  stopAnimation() {
		clearInterval(this.timerId);
  },
	startStopMusic() {
		this.musicButton = document.querySelector('.button');

		
		this.musicButton.addEventListener('click', () => {
			this.vinylMove = document.querySelector('.vinyl');
			if (this.musicSwitch == false) {
				this.musicSwitch = true;
				this.startAnimation();
				this.audioSong.play(); // запускаем звук


				console.log(this.audioSong);

			} else {
				this.stopAnimation();
				this.audioSong.pause(); // аудио на паузу
				this.musicSwitch = false;
			}
		});

		this.audioSong.addEventListener('ended', () => { // останавливает вращение диска
				this.stopAnimation();
				console.log('stop song');
		});
	},
	createTimeIndicator() {
		// minutes
		this.currentSongTime.songMin = document.querySelector('.songMinute');
		this.currentSongTime.songMin.textContent = '0';
		// seconds
		this.currentSongTime.songSec = document.querySelector('.songSecond');
		this.currentSongTime.songSec.textContent = '00';
		// milliseconds
		this.currentSongTime.songMillSec = document.querySelector('.songMillSecond');
		this.currentSongTime.songMillSec.textContent = '00';

	},
	selectSong() {
		this.allSongs = document.querySelectorAll('.song');

		for (let i = 0; i < this.allSongs.length; i++) {
			this.allSongs[i].addEventListener('click', () => {
				// добавление определенного трека
				this.audioSong.src = this.allSongs[i].getAttribute('data');
        this.songTitle = this.audioSong.getAttribute('src');
        this.SVGObjectElem.textContent = this.songTitle;
        this.SVGObjectElem.textContent = this.songTitle.slice(0,-4);

        // moveback tone arm
        let startToneArmPos = 38; // 38  - start position for tone arm
        if (this.toneArmPosition != startToneArmPos && this.musicSwitch == true) { 
        	vinilaizer.toneArm.style.transform = 'rotate(' + startToneArmPos + 'deg)';
        	this.toneArmPosition = startToneArmPos;
        	this.stopAnimation();
        	this.musicSwitch = false;
        }
        
			});
		}
	},
	addSongTitle() {
		// ищем сам элемент OBJECT
        this.SVGObjectElem=document.getElementById("songTitleText");
        this.songTitle = vinilaizer.audioSong.getAttribute('src');

				// название песни
        this.SVGObjectElem.textContent = this.songTitle.slice(0,-4);

        // svg для последующей анимации
    		vinilaizer.titleMove = document.querySelector('.circular');
	}
};
vinilaizer.startGame();