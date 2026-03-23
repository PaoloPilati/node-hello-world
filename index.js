//L'idea è replicare uno useState con JS vanilla ("https://stackoverflow.com/questions/75389439/replicating-react-usestate-on-vanilla-javascript-node") 

//La console stampa il messaggio iniziale "HelloWorld!" (debut = variabile globale) ---> I funzione eseguita (pushata e poppata) nel call stack.

//const debut = "Hello World!"
//Effettuare la chiamata all'endpoint API---> https://digital.nhs.uk/developer/api-catalogue/hello-world
import axios from "axios";

axios.get("https://digital.nhs.uk/developer/api-catalogue/hello-world")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Errore API:", error);
  });

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

const callout = makeState(debut);

callout() // callout() richiama lo stato con il suo valore corrente (debut) ---> II funzione eseguita nel call stack
callout("Hello Boolean!") // ---> III funzione eseguita nel call stack

