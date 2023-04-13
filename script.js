/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function divNotChecked(content){
   for(const choice of choices){
      if(content.dataset.questionId==choice.dataset.questionId && choice!==content){
         cambiaCheck(choice,unChecked,'0.6',''); //passandolo vuoto il colore si recupera il background color dallo style css
      }
   }
}

function cambiaCheck(content,imge,opacity,color){
   let toChange = content.querySelector(".checkbox");
   toChange.src = imge;
   content.style.opacity = opacity;
   content.style.backgroundColor = color;
}

function calcolaRisposta(choiceOne,choiceTwo,choiceThree){
   
   if(choiceOne!==choiceTwo && choiceOne!==choiceThree && choiceTwo!==choiceThree || 
      choiceOne===choiceTwo && choiceTwo!==choiceThree ||
      choiceOne===choiceTwo && choiceTwo===choiceThree ||
      choiceOne===choiceThree && choiceTwo!==choiceThree){
         return choiceOne;
   }

   if(choiceTwo===choiceThree && choiceOne!==choiceThree){
         return choiceTwo;
   }
}

function fullChoice(elements){
   let count = 0;
   for(el in elements){
      count++;
   }

   if(count===griglie.length)
      return true;
   else
      return false;
}

function mostraRisultato(result){
   const divResult = document.querySelector("#result");
   divResult.style.display = 'flex';
   divResult.style.flexDirection = 'column';
   const title = document.querySelector("#result h1");
   const paragraph = document.querySelector("#result p");
   title.textContent = RESULTS_MAP[result].title;
   paragraph.textContent = RESULTS_MAP[result].contents;
}

function divChecked(event)
{
   const container = event.currentTarget; 
   cambiaCheck(container,checked,'1','#cfe3ff');
   divNotChecked(container);
   takenChoice[container.dataset.questionId] = container.dataset.choiceId;
   console.log(takenChoice);

   if(fullChoice(takenChoice)){
      for(const choice of choices){
         choice.removeEventListener('click',divChecked);
      }
      var result = calcolaRisposta(takenChoice["one"],takenChoice["two"],takenChoice["three"]);
      mostraRisultato(result);
      console.log(result);
      //console.log(takenChoice["one"]);
   }
}

function resettaScelte(){
   for(const choice of choices){
      cambiaCheck(choice,unChecked,'1','#f4f4f4')
   }
}

function resettaRisultato(){
   const divResult = document.querySelector("#result");
   divResult.style.display = 'none';
}

function refresh(){
   resettaScelte();
   resettaRisultato();
   for(const choice of choices){
      choice.addEventListener('click',divChecked);
      takenChoice = {};
   }
}

const unChecked = "images/unchecked.png";
const checked = "images/checked.png";
const choices = document.querySelectorAll('.choice-grid div');
const griglie = document.querySelectorAll('.choice-grid');
const restart = document.querySelector("#restart");
var takenChoice = {};

restart.addEventListener('click',refresh);

for(const choice of choices){
    choice.addEventListener('click',divChecked);
}