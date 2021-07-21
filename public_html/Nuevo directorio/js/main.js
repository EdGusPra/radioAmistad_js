document.addEventListener("DOMContentLoaded", () => {
	let audio;

	const tema = document.querySelector(".tema");
	const banner = document.querySelector(".imagen .banner");
	const tapa = document.querySelector(".imagen .tapa");
	const llama = document.querySelector("#llama");
	const player = document.querySelector(".player");
	const dino = document.querySelector("#dino");
	const d = document.querySelector("#d");
	const u = document.querySelector("#u");
	const p = document.querySelector(".porcentaje");
	//generar tema y tapa

	const getTapa = async () => {
		const getInfo = await axios.get(
			"https://tools.zenoradio.com/api/stations/nce136tua2zuv/now_playing/"
		);

		tema.innerHTML =`${getInfo.data.artist} - ${getInfo.data.title}`;
		const getTapa = await axios.get(
			`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${getInfo.data.artist}&limit=1`
		);
		if (getTapa.data.artists) {
			banner.src = "img/logo2a.png";
			tapa.src = getTapa.data.artists[0].strArtistThumb || "img/logo2.png";
		}
	};

	getTapa();
	setInterval(getTapa, 14000);

	//audio
	audio = new Audio();
	audio.src = "http://stream.zeno.fm/nce136tua2zuv.acc";
	audio.volume = 0.5;

	//volumen
	d.addEventListener("click", () => {
		if (audio.volume != 0) {
			audio.volume -= 0.1;
		}
	});

	u.addEventListener("click", () => {
		if (audio.volume >= 0) {
			audio.volume += 0.1;
		}
	});

	//dar play

	player.addEventListener("click", () => {
		//boton.getLottie();

		playOrPause();
	});

	playOrPause = () => {
		if (audio.paused) {
			audio.play();
			player.innerHTML = `<lottie-player
        id="boton" 
        src="img/dolphin.json" 
        background="transparent"  
        speed="1"  
        loop  
        autoplay>
</lottie-player>`;
			
			llama.play();
			dino.play();
		} else {
			audio.pause();
			player.innerHTML = `<lottie-player
        id="boton" 
        src="img/play.json" 
        background="transparent"  
        speed="1"  
        loop  
        autoplay>
</lottie-player>`;
			console.log("pause");
			dino.stop();
			llama.stop();
		}
	};

	const tl = gsap.timeline({defaults: {duration: 2,opacity:0}});

	tl.from(".repro",{
		
		
	}).from(".player",{
		duration:1,
		scale:0,
		ease:"elastic.out",duration:1.5
	})
	.from(".banner",{
		scale:0
		
	}).to(".turn",{
		opacity:1
	}).from(".tapa",{
		x:400
	}).from(".marquesina",{
		
	}).from(".danc",{
		y: -100,
		ease: "bounce.out"
	}).from(".volumen",{
		x:100,
		ease:"back.out(1.7)"
	}).to(".turn",{
		borderRadius:20,
		opacity:1
	}).to(".tapa",{
		borderRadius:60,
		opacity:1
	}).from(".arm",{
		y:-100
	}).to(".tapa",{
		rotate:360,
		opacity:1,
		duration:6,
		repeat:-1,
		ease:Linear.easeNone
		
		
	})
});
