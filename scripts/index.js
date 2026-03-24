//L'idea è replicare uno useState con JS vanilla ("https://stackoverflow.com/questions/75389439/replicating-react-usestate-on-vanilla-javascript-node") 

//La console stampa il messaggio iniziale "HelloWorld!" (debut = variabile globale) ---> I funzione eseguita (pushata e poppata) nel call stack.
//const debut = "Hello World!"


import axios from "axios"; //OR const axios = require ('axios');

// Per aggiornare la console e salvare l'aggiornamento uso una funzione nel global scope che contiene un'altra funzione di closure, ovvero che salva lo "stato" e la modifica dell'output di "stato" nel memory heap), simulando lo stato di React.

function makeState(getter) {
  let state = getter; //scope locale
  return function(setter) //funzione CLOSURE = funzione + riferimento allo scope in cui è contenuta (scope della funzione = state)
  {
    if (setter !== undefined) {
        state = setter;} //state si aggiorna assumendo il valore del "setter"
    console.log(state); //la closure termina stampando il valore attuale/aggiornato in console
  };
}

//Effettuare la chiamata all'endpoint API---> https://digital.nhs.uk/developer/api-catalogue/hello-world

function eventLoopOrganizer() {
  axios.get("https://sandbox.api.service.nhs.uk/hello-world/hello/world")
    .then(response => {
      const debut = response.data.message;
      console.log("Chiamata API:", debut);

      const callout = makeState(debut);
      const mode = process.env.MODE;

      if (mode === "watch") {
        callout("Hello Boolean!")
      }
      else {
        callout()
      };
    })
    .catch(error => {
      console.error("API Error:", error);
    });
}

eventLoopOrganizer();