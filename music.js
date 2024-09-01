let tracks = [
    {
        header: 'Begining',
        year: 2021,
        desc: 'Если до этого трека я лишь пытался делать музыку, то этот трек показал мне то, что я всё-таки могу не пытаться, а делать музыку. Я над ним довольно много работал, искал хорошие плагины, эффекты. С обложкой я тоже повозился, надеюсь, вы заметили, что это буквы из стекла в 3D, а учитывая имеющиеся мощности моего "калькулятора", это было долго.',
        img: 'bgn.webp',
        blink: `https://band.link/L4W8W/`,
        audio: `asset/music/bgn.mp3`,
        links: [`https://geo.music.apple.com/ru/album/begining-single/1586236818?uo=4&app=itunes`,
                `http://www.deezer.com/album/256506772`,
                `https://soundcloud.com/landyb1squit/begining`,
                `https://music.yandex.ru/album/17856182`,
                `https://p.sber-zvuk.com/gS4E?pid=Bandlink&c=bandlink_1&is_retargeting=true&af_click_lookback=7d&af_dp=zvuk://&af_web_dp=https://sber-zvuk.com/release/19153585&action_name=open-release&id=19153585`,
                `https://open.spotify.com/album/7vnMbolsUFOhMT0osbObi2`,
                `https://www.newgrounds.com/audio/listen/1107213`,
                `https://youtu.be/QOf0veBDJ9M`
                ],
        brands: [`iTunes`, `Deezer`, `Soundcloud`, `Yandex`, `Zvuk`, `Spotify`, `Newgrounds`, `Youtube`],
    },
    {
        header: 'Catch the Rythm',
        year: 2021,
        desc: 'Сингл в жанре SKA. Смешение джазовой, инструментальной и поп-музыки с элементами электроники. Полсностью выполнен на виртуальных интструментах: LABS и Flex. Особенность в том, что трек написан за 2 дня, а обложку приходилось исправлять 3 раза по требованию модерации. Кстати, цвет на заднем фоне был создан автоматически, при этом он хорошо сочетается с основным содержимым.',
        img: 'ctr.webp',
        blink: `https://band.link/ALkaR/`,
        audio: `asset/music/ctr.mp3`,
        links: [`https://geo.music.apple.com/album/catch-the-rythm-single/1592904581?uo=4&app=itunes`,
                `http://www.deezer.com/album/266418642`,
                `https://soundcloud.com/landyb1squit/catch-the-rythm?si=d4b3293ce3cf4a7fa5ed495cbd56fd90`,
                `https://music.yandex.ru/album/18801374`,
                `https://p.sber-zvuk.com/gS4E?pid=Bandlink&c=bandlink_1&is_retargeting=true&af_click_lookback=7d&af_dp=zvuk://&af_web_dp=https://sber-zvuk.com/release/19992523&action_name=open-release&id=19992523`,
                `https://open.spotify.com/album/0R7psaeQwX0cYzcEG8uzU5`,
                ],
        brands: [`iTunes`, `Deezer`, `Soundcloud`, `Yandex`, `Zvuk`, `Spotify`],
    }
]

// getting parameters
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get(`track`);
let track = tracks[id];

// error handling
let Doc = document.querySelector(`#content`);
let redir = document.querySelector(`.redirection`);
if (!id || id > tracks.length) {
    Doc.classList.add('error');
    setTimeout(() => {redir.innerHTML = `Редирект на главную произойдёт автоматически через 4 секунды`}, 1000);
    setTimeout(() => {redir.innerHTML = `Редирект на главную произойдёт автоматически через 3 секунды`}, 2000);
    setTimeout(() => {redir.innerHTML = `Редирект на главную произойдёт автоматически через 2 секунды`}, 3000);
    setTimeout(() => {redir.innerHTML = `Редирект на главную произойдёт автоматически через 1 секунду`}, 4000);
    setTimeout(() => {redir.innerHTML = `Редирект на главную произойдёт автоматически через 0 секунд`
    window.location.href = `./index.html`}, 5000);
}

//add document
document.querySelector(`title`).innerHTML = `Landy Bisquit | ${track.header}`;
Doc.innerHTML = `
    <div class="player">
        <img src="asset/covers/${track.img}" alt="Cover">
		<div class="audio">
			<audio src="${track.audio}"></audio>
			<div class="plps"><img src="asset/play.svg" alt="controls"></div>
			<div class="prb"></div>
			<time class="time"></time>
		</div>
    </div>

	<div class="about">
		<div>
			<div class="mheader">
				<h3 id="name">${track.header}</h3>
				<h4><i id="date">${track.year}</i></h4>
			</div>
			<p class="mtext">${track.desc}</p>
		</div>
		<div class="muslinks">
			<div class="slink">
						
			</div>
		</div>
	</div>
`

// add links
let links = document.querySelector(`.slink`);
for (let i = 0; i < Number(track.links.length); i++) {
    let mlink = track.links[i];
    let brand = track.brands[i];
    links.innerHTML += 
        `
            <a class="lab" href="${mlink}">
                <img src="asset/labels/${brand}.svg" alt="label">
            </a>
        `
};

// music player
let plps = document.querySelector('.plps');
let plpsImg = plps.querySelector('img');
let prb = document.querySelector('.prb');
let audio = document.querySelector('audio');
let time = document.querySelector('time');
let isPlaying = false;

audio.addEventListener('loadeddata', function(){
    time.innerHTML = `${setTimer(audio.currentTime)}/${setTimer(audio.duration)}`;
});
async function updateProgress(){
    let cTime = audio.currentTime/audio.duration*100;
    prb.style.background = `linear-gradient(90deg, #8FC7FF 0 ${cTime}%, #9BA0FC ${cTime}% 100%)`;
    time.innerHTML = `${setTimer(audio.currentTime)}/${setTimer(audio.duration)}`;
    if (isPlaying){
        requestAnimationFrame(updateProgress);
    }
    if (audio.paused) {
        plpsImg.src = 'asset/play.svg';
        requestAnimationFrame(updateProgress);
        isPlaying = false;
    }
    if (!audio.paused && !isPlaying) {
        plpsImg.src = 'asset/pause.svg';
        isPlaying = true;
        requestAnimationFrame(updateProgress);
    }
};
function setTime(time){
    audio.currentTime = time;
    updateProgress();
};
function setTimer(time){
    let current = Math.floor(time);
    let minutes = Math.floor(current / 60);
    let seconds = Math.floor(current % 60);
    if (minutes < 10) {
        minutes = `0` + minutes;
    }
    if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`
};
async function playpause(){
    if (!isPlaying){
        await audio.play();
        isPlaying = true;
        plpsImg.src = 'asset/pause.svg';
        window.requestAnimationFrame(updateProgress);
    }
    else if (isPlaying){
        audio.pause();
        isPlaying = false;
        plpsImg.src = 'asset/play.svg';
        window.requestAnimationFrame(updateProgress);
    }
};
plps.addEventListener('click', function(){
    playpause();
});
prb.addEventListener('click', function(evt){
    let position = prb.getBoundingClientRect();
    let x = evt.clientX - Number(position.left);
    let clickedValue = x / prb.clientWidth;
    setTime(audio.duration * clickedValue);
});
document.addEventListener('keydown', function(evt){
    if (evt.key === " "){
        playpause();
    }
});
audio.addEventListener('ended', function(){
    plpsImg.src = 'asset/play.svg';
    setTime(0);
});
window.requestAnimationFrame(updateProgress);