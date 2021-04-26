
function mostradescrizione(event){
    const testo = event.currentTarget;
    testo.removeEventListener("click",mostradescrizione);
    const desc = event.currentTarget.parentNode.querySelector("li");
    desc.classList.remove("hidden");
    testo.textContent = "Nascondi ID";
    testo.addEventListener("click",nascondidescrizione);
}

function nascondidescrizione(event){
    const testo = event.currentTarget;
    testo.removeEventListener("click",nascondidescrizione);
    const desc = event.currentTarget.parentNode.querySelector("li");
    desc.classList.add("hidden");
    testo.textContent = "Mostra ID";
    testo.addEventListener("click",mostradescrizione);
}

function aggiungipreferito(event){

    const ti = document.createElement("h2");
    ti.textContent = event.currentTarget.parentNode.querySelector("h2").textContent;

    const im = document.createElement("img");
    im.src = event.currentTarget.parentNode.querySelector("img").src;
    im.classList.add("copertina");

    const te = document.createElement("span");
    te.textContent = event.currentTarget.parentNode.querySelector("span").textContent;
    te.addEventListener("click",mostradescrizione);

    const de = document.createElement("li");
    de.textContent = event.currentTarget.parentNode.querySelector("li").textContent;
    de.classList.add("hidden");
    
    const bottone1 = event.currentTarget.parentNode.querySelector("button");
    bottone1.removeEventListener("click",aggiungipreferito);
    bottone1.innerHTML = "Tra i tuoi preferiti";
    bottone1.classList.add("cliccato");

    
    const bottone2 = document.createElement("button");
    bottone2.innerHTML = "Rimuovi dai preferiti";
    bottone2.addEventListener("click",rimuovipreferito);

    const preferito = document.createElement("div");
    preferito.classList.add("elemento");
    preferito.id = ("preferito");
 
    preferito.appendChild(im);
    preferito.appendChild(ti);
    preferito.appendChild(te);
    preferito.appendChild(de);
    preferito.appendChild(bottone2);

    const sectionelem =document.querySelector("#prefelem");
    sectionelem.appendChild(preferito);
    const section = document.querySelector("#preferiti");
    section.classList.remove("hidden");
    cont++;

}

function rimuovipreferito(event){
    const t1 = event.currentTarget.parentNode.querySelector("h2").textContent;
    
    const rim= event.currentTarget.parentNode;

    const cliccati = document.querySelectorAll(".cliccato");
    for(let bot of cliccati){
        const t2 = bot.parentNode.querySelector("h2").textContent;

        if( t2 == t1){
        bot.classList.remove("cliccato");
        bot.innerHTML ="Aggiungi ai preferiti";
        bot.addEventListener("click",aggiungipreferito);
        }
    }
    
    rim.remove();
    cont--;
    if(cont ===0){
        preferiti.classList.add("hidden");
    }
}

function ricerca(event){
    event.preventDefault();
    const content = document.querySelector("#content").value;
    console.log(content);
    if(!content){
        const section  = document.querySelector("section.griglia");
        section.innerHTML ="";
        alert("Inserire testo nella barra di ricerca!");
        
    }
    else{
        const text = encodeURIComponent(content);
        fetch(tvshows_endpoint+text, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": key,
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
	}}).then(onResponse).then(onJSONshow);
    } 

}

function onResponse(response){
    return response.json();
}

function onJSONshow(json){
    console.log(json);
    const results = json.d;
    const section = document.querySelector("section.griglia");
    section.innerHTML="";
    for(result of results){

        const container = document.createElement("div");
        container.classList.add("elemento");
        container.id ="articolo";

        const title = document.createElement("h2");
        title.textContent = result.l;

        const immagine = document.createElement("img");
        immagine.src = result.i.imageUrl;
        immagine.classList.add("copertina");

        const testo = document.createElement("span");
        testo.textContent = "Mostra ID";
        
        var descrizione = document.createElement("li");
        descrizione.classList.add("hidden");
        descrizione.textContent = result.id;

        const bottone = document.createElement("button");
        bottone.innerHTML = "Aggiungi ai preferiti";
       
       
        container.appendChild(immagine);
        container.appendChild(title);
        container.appendChild(testo);
        container.appendChild(descrizione);
        container.appendChild(bottone);

        section.appendChild(container);

        testo.addEventListener("click",mostradescrizione);
        bottone.addEventListener("click",aggiungipreferito);

    }
}

function mostratop(){
    const top_request = top_endpoint + "?per_page" + num_result;
    fetch(top_request).then(onTopResponse).then(onJSONtop);
}

function onTopResponse(response){
   return response.json();
}

function onJSONtop(json){

    const results = json.tv_shows;
    const section =document.querySelector("section.top");
    section.innerHTML ="";
    for(result of results){
        const container = document.createElement("div");
        container.classList.add("elemento");
        container.id ="articolo"; 

        const title = document.createElement("h2");
        title.textContent = result.name;

        const immagine = document.createElement("img");
        immagine.src = result.image_thumbnail_path;
        immagine.classList.add("copertina");

        
        container.appendChild(immagine);
        container.appendChild(title);

        section.appendChild(container);

    }
}



const tvshows_endpoint = "https://imdb8.p.rapidapi.com/auto-complete?q=";
const top_endpoint ="https://www.episodate.com/api/most-popular";
const key = "0a9bbad37fmsh410b05fd2973ffep1550f2jsn6548d730b76a";

const num_result = 20;
let cont = 0;

const form = document.querySelector("#ricerca");
form.addEventListener("submit",ricerca);
mostratop();
