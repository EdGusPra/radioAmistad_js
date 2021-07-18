let audio;
let player=document.getElementById("player");
let titulo = document.querySelector(".titulos__nombre");
let tema = document.querySelector(".titulos__tema");
let tapa= document.querySelector(".disco__portada__img");
let range= document.querySelector("#range");
let token ="11f1f36cb33ec1d1289c8e3d869cbb27";
let ipStack_token="d74a6ceecfc9893d27e9319eb2183e04";
let nombre = document.querySelector(".clima__name h1");
let temp = document.querySelector(".clima__temp h1");
let icono = document.querySelector(".clima__icon img");
let desc = document.querySelector(".clima__desc h1");


audio = new Audio();
audio.src = "http://stream.zeno.fm/nce136tua2zuv.acc";
audio.volume = 0.5;

player.addEventListener("click", () => {
		playOrPause();
	});

    playOrPause = () => {
		if (audio.paused) {
			audio.play();
			player.innerHTML = `<i class="fas fa-ban"></i>`;
			
		} else {
			audio.pause();
			player.innerHTML = `<i  class="fas fa-power-off "></i>`;
			
		}
	};


const getTapa = async () => {
		const getInfo = await axios.get(
			"https://tools.zenoradio.com/api/stations/nce136tua2zuv/now_playing/"
		);
      let artist=getInfo.data.artist.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
      let title=getInfo.data.title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
		titulo.innerHTML =`${artist}`;
        tema.innerHTML =`${title}`;
    

		const getTapa = await axios.get(
			`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${getInfo.data.artist}&limit=1`
		);
		if (getTapa.data.artists) {
			tapa.src = getTapa.data.artists[0].strArtistThumb || "img/logorepro.jpg";
		}else{tapa.src ="img/portada_disco.webp";}
	};

getTapa();

setInterval(getTapa, 14000);

range.addEventListener("input", (e) => {

        audio.volume = e.target.value/100;
        gsap.to(".path",{
        strokeDasharray: (e.target.value.toString() + ",100"),
  });
    
});

loadIp= async()=>{
    const getIp= await axios.get("https://jsonip.com");
    const getCity= await axios.get(`http://api.ipstack.com/${getIp.data.ip}?access_key=${ipStack_token}`);
    
    const getTemp= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${getCity.data.city}&appid=${token}&lang=es&units=metric`);
    

    nombre.innerHTML=`${getCity.data.city}`;
    temp.innerHTML=`${parseInt(getTemp.data.main.temp)}&deg;`;
    icono.src=`img/icons/${getTemp.data.weather[0].icon}.png`;
    let description=getTemp.data.weather[0].description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    desc.innerHTML=`${description}`;
      
};

loadIp();




const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const setDate = () => {
  const now = new Date();
  // cal sec degrees
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
//   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  // cal min degrees
  const mins = now.getMinutes();
  const minsDegrees = (mins / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minsDegrees}deg)`;
  // cal hr degrees
  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 + 90 + mins / 2;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  // push 0 before mins
  let minsFormat = mins >= 10 ? mins : "0" + mins.toString();
  let secondsFormat = seconds >= 10 ? seconds : "0" + seconds;
  // display time word
  document.querySelector(".word").innerHTML = `${hour}:${minsFormat}:${secondsFormat}`;
};
setInterval(setDate, 1000);