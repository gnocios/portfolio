var $ = function(o){return document.getElementById(o);}
var $C = function(k){return document.createElement(k);}

var deckArray = [
    {name: "0", family: "clef", path: 'Images/0.svg'},
    {name: "1", family: "clef", path: 'Images/1.svg'},
    {name: "2", family: "clef", path: 'Images/2.svg'},
    {name: "3", family: "alterations", path: 'Images/3.svg'},
    {name: "4", family: "alterations", path: 'Images/4.svg'},
    {name: "5", family: "alterations", path: 'Images/5.svg'},
    {name: "6", family: "metrics", path: 'Images/6.svg'},
    {name: "7", family: "metrics", path: 'Images/7.svg'},
    {name: "8", family: "metrics", path: 'Images/8.svg'},
    {name: "9", family: "metrics", path: 'Images/9.svg'},
    {name: "10", family: "metrics", path: 'Images/10.svg'},
    {name: "11", family: "metrics", path: 'Images/11.svg'},
    {name: "12", family: "notes", path: 'Images/12.svg'},
    {name: "13", family: "dynamic", path: 'Images/13.svg'},
    {name: "14", family: "dynamic", path: 'Images/14.svg'},
    {name: "15", family: "dynamic", path: 'Images/15.svg'},
    {name: "16", family: "notation", path: 'Images/16.svg'},
    {name: "17", family: "instruments", path: 'Images/17.svg'},
    {name: "18", family: "notation", path: 'Images/18.svg'},
    {name: "19", family: "notation", path: 'Images/19.svg'},
    {name: "20", family: "notes", path: 'Images/20.svg'},
    {name: "21", family: "notes", path: 'Images/21.svg'},
    {name: "22", family: "notes", path: 'Images/22.svg'},
    {name: "23", family: "notes", path: 'Images/23.svg'},
    {name: "24", family: "notes", path: 'Images/24.svg'},
    {name: "25", family: "silences", path: 'Images/25.svg'},
    {name: "26", family: "silences", path: 'Images/26.svg'},
    {name: "27", family: "dynamic", path: 'Images/27.svg'},
    {name: "28", family: "dynamic", path: 'Images/28.svg'},
    {name: "29", family: "dynamic", path: 'Images/29.svg'},
    {name: "30", family: "dynamic", path: 'Images/30.svg'},
    {name: "31", family: "notes", path: 'Images/31.svg'},
    {name: "32", family: "notes", path: 'Images/32.svg'},
    {name: "33", family: "metrics", path: 'Images/33.svg'},
    {name: "34", family: "metrics", path: 'Images/34.svg'},
    {name: "35", family: "metrics", path: 'Images/35.svg'},
    {name: "36", family: "silences", path: 'Images/36.svg'},
    {name: "37", family: "silences", path: 'Images/37.svg'},
    {name: "38", family: "silences", path: 'Images/38.svg'},
    {name: "39", family: "silences", path: 'Images/39.svg'},
    {name: "40", family: "silences", path: 'Images/40.svg'},
    {name: "41", family: "notation", path: 'Images/41.svg'},
    {name: "42", family: "notation", path: 'Images/42.svg'},
    {name: "43", family: "notation", path: 'Images/43.svg'},
    {name: "44", family: "notation", path: 'Images/44.svg'},
    {name: "45", family: "notation", path: 'Images/45.svg'},
    {name: "46", family: "playing", path: 'Images/46.svg'},
    {name: "47", family: "playing", path: 'Images/47.svg'},
    {name: "48", family: "playing", path: 'Images/48.svg'},
    {name: "49", family: "playing", path: 'Images/49.svg'},
    {name: "50", family: "instruments", path: 'Images/50.svg'},
    {name: "51", family: "instruments", path: 'Images/51.svg'},
    {name: "52", family: "instruments", path: 'Images/52.svg'},
    {name: "53", family: "instruments", path: 'Images/53.svg'}
]
var gameDeckArray=[];
var table;
var imagetype;
var pairsAmount;
var time;
var tries;
var score;
var roundPath;
var deck = [];
var sortedCards = [];
var cardsChosen = [];
var cardsChosenId = [];
var matchesPlayer1;
var matchesPlayer2;
var clock;
var playing;
var matchesDiscovered;
var totalScore;
var selectedCards=[];
var pcmemory=[];
var players;
var gameMode;
var roundV;
var timeMode;
var player1;
var matchfound;


function create(){
    timeMode=$('timerMode').checked;
    soundMode=$('soundMode').checked;
    musicMode=$('musicMode').checked;
    if(timeMode==true){timeV=Number($('timeAmount').value);if(timeV<10 || timeV>90){alert("Invalid time amount"); return;}}
    gameMode = $('gameMode').value;
    $('results').style.display="none";
    let validate = validatePairs();
    if(validate == -1){alert("Invalid pairs number");return;}
    $('startMenu').style.display="none";
    $('gameContainer').style.display="";
    table=$('table');
    round=$('round');
    time=$('time');
    tries = $('tries');
    matches = $('matches');
    score = $('score');
    playersWay = $('players').value;
    moving=$('moving');
    roundV=1;
    totalScore=0;
    player1=false;
    selectAble=true;
    matchfound=false;
    triesV=0;
    matchesPlayer1=0;
    tries.innerHTML= triesV;
    matches.innerHTML= matchesPlayer1;
    gameDeckArray=[];

    if(playersWay=="2players" || playersWay=="vspc"){
        showSecondPlayer=$('showSecondPlayer');
        showSecondPlayer.style.display="";
        secondPlayer = $('secondPlayer');
        tries2 = $('tries2');
        matches2 = $('matches2');
        score2 = $('score2');
        totalScore2=0;
        triesV2=0;
        matchesPlayer2=0;
        tries2.innerHTML= triesV2;
        matches2.innerHTML= matchesPlayer2;
        if(playersWay=="2players"){secondPlayer.innerHTML="Player 2";}else{secondPlayer.innerHTML="Pc";}
    }

    if(gameMode == "single"){
        let radio = document.querySelector('input[name="imageWay"]:checked').value;
        if(radio==0){
            imagetype=$('imagetype').value;
            if(imagetype=="random"){pairsAmount= Number( $('pairsRandom').value );gameDeckArray=deckArray;}  
            else{
                for(let i=0; i<deckArray.length; i++){
                    if(deckArray[i]["family"] == imagetype){
                        gameDeckArray.push({name: deckArray[i]["name"]});
                    }
                }
                pairsAmount= gameDeckArray.length}
        }else{
            pairsAmount= selectedCards.length;
            for(let i=0; i<pairsAmount; i++){
                gameDeckArray.push({name: selectedCards[i]});
            }
        }
        
    }else{pairsAmount=roundV;gameDeckArray=deckArray;}

    if(soundMode==true){
        beepSound = new Audio('Audio/beep.mp3');
        flipSound = new Audio('Audio/flip.mp3');
        matchSound = new Audio('Audio/match.wav');
        victorySound = new Audio('Audio/victory.mp3');
        hurrySound = new Audio('Audio/Latido.mp3');
        gameOverSound = new Audio('Audio/gameover.mp3');
        $('soundBtn').style.display="";
        playingSounds=true;
    }
    if(musicMode==true){
        bgMusic = new Audio('Audio/ChildrenSong.mp3');
        bgMusic.loop = true;
        bgMusic.currentTime=0;
        playingMusic=true;
        bgMusic.play();
        $('musicBtn').style.display="";
    }

    displayRound();
}

function displayRound(){
    table.innerHTML= "";
    matchesDiscovered=0;

    if(timeMode==true){clock=setInterval(timer, 1000);time.innerHTML= timeV;}else{timeV=0;time.innerHTML="off";}
    round.innerHTML= roundV;

    score.innerHTML = totalScore;
    if(playersWay=="2players" || playersWay=="vspc"){score2.innerHTML = totalScore2;}

    fullDeck = new Array();
    sortedCards = new Array();
    playing=true;

    let randArray = new Array();
    let rand;
    for(let i=0; i<pairsAmount; i++){
        do{rand = Math.floor(Math.random()*gameDeckArray.length);}while(randArray[rand] != null);
        randArray[rand] = 0;
        let card = {name: gameDeckArray[rand]["name"]};
        fullDeck.push(card);
        fullDeck.push(card);
    }
    sortCards();
    insertCards();
    if(playersWay == "solitary"){player1=true;}else{playersMove();}
}

function sortCards(){
    for(let j=0; j<pairsAmount*2; j++){
        let card = Math.floor(Math.random()*fullDeck.length);
        sortedCards.push(fullDeck[card]);
        fullDeck.splice(card, 1);
    }
}

function insertCards(){
    for(let i=0; i<sortedCards.length; i++){
        var newImg = $C("IMG");
        newImg.id = i;
        newImg.name = sortedCards[i]["name"];
        newImg.src = "images/bck.svg"
        newImg.setAttribute('onclick', "selectCard(this);");
        newImg.classList.add("hover");
        table.appendChild(newImg);
    }
}

function selectCard(e){
    if(playing==false){return;}
    if(selectAble==false){return;}
    if(playersWay=="vspc"){pcmemory[e.id]= e.name;}
    cardsChosen.push(e.name);
    cardsChosenId.push(e.id);
    e.setAttribute('src', "images/"+e.name);
    e.removeAttribute('onclick');
    soundMode ? flipSound.play() : "";
    if (cardsChosen.length === 2) {
        playing=false;
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch(){
    let roundScore;
    if(cardsChosen[0] === cardsChosen[1]){
        document.getElementById(cardsChosenId[0]).setAttribute('src', "images/slf.svg");
        document.getElementById(cardsChosenId[1]).setAttribute('src', "images/slf.svg");
        matchesDiscovered++;
        if(timeMode==true){timeV+=3;}
        
        if((playersWay=="2players" || playersWay=="vspc") && player1==false){
            matchesPlayer2++;matches2.innerHTML= matchesPlayer2;
        }else{matchesPlayer1++;matches.innerHTML= matchesPlayer1;}
        if(playersWay=="vspc"){
            pcmemory[cardsChosenId[0]]="matched";
            pcmemory[cardsChosenId[1]]="matched";
        }
        playing=true;
        matchfound=true;
        soundMode ? matchSound.currentTime=0 : "";
        soundMode ? matchSound.play() : "";
    }else{
        if((playersWay=="2players" || playersWay=="vspc") && player1==false){
            triesV2++;tries2.innerHTML= triesV2;
        }else{triesV++;tries.innerHTML= triesV;}
        
        document.getElementById(cardsChosenId[0]).setAttribute('src', "images/bck.svg");
        document.getElementById(cardsChosenId[1]).setAttribute('src', "images/bck.svg");
        document.getElementById(cardsChosenId[0]).setAttribute('onclick', "selectCard(this);");
        document.getElementById(cardsChosenId[1]).setAttribute('onclick', "selectCard(this);");
        playing=true;
    }
    cardsChosen = [];
    cardsChosenId = [];
    if(pairsAmount==matchesDiscovered){
        roundScore = (matchesPlayer1*pairsAmount-triesV+timeV);
        totalScore+=roundScore;
        if(playersWay=="2players" || playersWay=="vspc"){
            roundScore2 = (matchesPlayer2*pairsAmount-triesV2+timeV);
            totalScore2+=roundScore2;
            $('resultText').innerHTML="Round over!!!<br>Player1 scored: " + roundScore + "<br>Player2 scored: " + roundScore2;
            $('results').style.display="";
        }else{
            $('resultText').innerHTML="Round over!!!<br>You've scored: " + roundScore;
            $('results').style.display="";
        }
        
        clearInterval(clock);
        playing=false;
        if(soundMode){victorySound.play();stopSounds();}
        if(gameMode=="rounds" && roundV<27){$('nextRound').style.display="";}
        else{$('results').style.display="";$('afterGame').style.display="";}
        return;
    }
    if(playersWay == "solitary"){return;}else{playersMove();}
}

function timer(){
    timeV--;
    time.innerHTML=timeV;
    if(timeV<=10){soundMode ? hurrySound.play() : "";}
    if(timeV==0){
        if(playersWay=="2players" || playersWay=="vspc"){
            roundScore = (matchesPlayer1*pairsAmount-triesV+timeV);
            totalScore+=roundScore;
            roundScore2 = (matchesPlayer2*pairsAmount-triesV2+timeV);
            totalScore2+=roundScore2;
            $('resultText').innerHTML="Game over!!!<br>Player1 scored: " + totalScore + "<br>Player2 scored: " + totalScore2;
            $('results').style.display="";
            $('afterGame').style.display="";
            $('nextRound').style.display="none";
        }else{
            roundScore = (matchesPlayer1*pairsAmount-triesV+timeV);
            totalScore+=roundScore;
            $('resultText').innerHTML="Game Over...<br>Your total score is: "+totalScore;
            $('results').style.display="";
            $('afterGame').style.display="";
            $('nextRound').style.display="none";
        }


        clearInterval(clock);playing=false;
        if(soundMode){stopSounds();gameOverSound.play();}
        if(musicMode){bgMusic.pause();} 
    }
}

function showDeck(){
    if($('fullDeck').style.display='none'){
        $('fullDeck').style.display='';
        $('startMenu').style.display='none'
    }
    
}

function displaySingleOptions(option){
    if(option == 1){$('singleOptions').style.display=''}
    else{$('singleOptions').style.display='none'}
}

function newRound(){
    roundV++;
    pairsAmount=roundV;
    timeV+=30;
    if(playersWay=="vspc"){pcmemory=[];}
    displayRound();
}

function pairsOption(option){
    if(option == "random"){$('selectPairsAmount').style.display='';}
    else{$('selectPairsAmount').style.display='none';}
}

function chosenCard(e){
    let index = selectedCards.indexOf(e);
    if(index>=0){selectedCards.splice(index, 1);}
    else{selectedCards.push(e);}
}

function selectedManually(option){
    if(option == 0){$('imageWay0').checked=true;$('fullDeck').style.display='none';$('startMenu').style.display=''}
    else{
        if(selectedCards.length <1){alert("You need to select at least 1 card to click OK\nOtherwise click back"); return;}
        $('imageWay1').checked=true;$('fullDeck').style.display='none';$('startMenu').style.display='';
    }
}

function validatePairs(){
    if(gameMode == "single"){
        let radio = document.querySelector('input[name="imageWay"]:checked').value;
        if(radio==0){
            imagetype=$('imagetype').value;
            if(imagetype=="random"){
                pairsAmount= Number( $('pairsRandom').value );
                if(pairsAmount>27 || pairsAmount<1){return -1;}
            }  
            return 0;
        }else{return 0;}
    }else{return 0;}
}

function playersMove(){
    if(playersWay == "solitary"){return;}
    if(matchfound==true){matchfound=false;
        if(playersWay=="vspc" && player1==false){setTimeout(computerMoves, 1000);}
        return;
    }
    soundMode ? beepSound.play() : "";
    if(player1 == true){
        player1=false;
        
        if(playersWay=="2players"){moving.innerHTML="Player2"; return;}else{selectAble=false;moving.innerHTML="Pc";setTimeout(computerMoves, 1000);}
    }else{
        player1=true; 
        moving.innerHTML="Player1";
        if(selectAble==false){selectAble=true;}
    }
}

function computerMoves(move){
    console.log("pc moves");
    if(playing==false){return;}
    if(move){
        for (let i=0; i < pcmemory.length; i++) {
            if (move.name === pcmemory[i] && move.id != i) {
                setTimeout(function() {pcmatching(move.id, i)}, 1000);
                return;
            }
        }
    }else{
        for (let i = 0; i < pcmemory.length - 1; i++) {
            for (let j = i + 1; j < pcmemory.length; j++) {
                if(typeof pcmemory[i] != "undefined" && pcmemory[j] != "matched" ){
                    if (pcmemory[i] === pcmemory[j]) {
                        setTimeout(function() {pcmatching(i, j)}, 1000);
                        return;
                    }
                }
                
            }
        }
    }
    
    pcrandomSelect();
}

function pcmatching(card1, card2){
    console.log("pc matches");
    let first = $(card1);
    cardsChosen[0]=first.name;
    cardsChosenId[0]=first.id;
    first.setAttribute('src', "images/"+first.name);
    first.removeAttribute('onclick');
    let second = $(card2);
    cardsChosen[1]=second.name;
    cardsChosenId[1]=second.id;
    second.setAttribute('src', "images/"+second.name);
    second.removeAttribute('onclick');
    setTimeout(checkForMatch, 500);
}

function pcrandomSelect(){
    console.log("random select");
    let randomCard;
    let first;
    for(let i = 0; i < pairsAmount*2; i++){
        if(typeof pcmemory[i]== "undefined"){
            randomCard=i;
            first = $(randomCard);
            cardsChosen.push(first.name);
            cardsChosenId.push(first.id);
            pcmemory[first.id]= first.name;
            first.setAttribute('src', "images/"+first.name);
            first.removeAttribute('onclick');
            break;}
    }
    

    if (cardsChosen.length === 2) {
        playing=false;
        setTimeout(checkForMatch, 1000);
    }else{computerMoves(first);}
}

function hide(id){
    $(id).style.display="none";
}

function mainMenu(){
    $("gameContainer").style.display="none";
    $('startMenu').style.display="";
    $('afterGame').style.display="none";
    $('results').style.display="none";
    
}

function restart(){
    window.location.reload();
}

function volume(id){
    if(id == "soundBtn"){
        if(playingSounds==true){$(id).innerHTML= "Sounds &#128264;";soundMode=false;playingSounds=false;stopSounds();$('soundMode').checked=false;}
        else{$(id).innerHTML= "Sounds &#128266;";soundMode=true;playingSounds=true;$('soundMode').checked=true;}
    }
    else if(id == "musicBtn"){
        if(playingMusic==true){$(id).innerHTML= "Music &#128264;";bgMusic.pause();playingMusic=false;$('musicMode').checked=false;}
        else{$(id).innerHTML= "Music &#128266;";bgMusic.play();playingMusic=true;$('musicMode').checked=true;}
    }
    
    
}

function nextRound(){
    newRound();
    $('results').style.display="none";
}

function stopSounds(){
    hurrySound.pause();
    hurrySound.currentTime=0;
}

function playAgain(){
    timeMode=$('timerMode').checked;
    soundMode=$('soundMode').checked;
    musicMode=$('musicMode').checked;
    if(timeMode==true){timeV=Number($('timeAmount').value);if(timeV<10 || timeV>90){alert("Invalid time amount"); return;}}
    gameMode = $('gameMode').value;
    $('results').style.display="none";
    let validate = validatePairs();
    if(validate == -1){alert("Invalid pairs number");return;}
    $('startMenu').style.display="none";
    $('gameContainer').style.display="";
    table=$('table');
    round=$('round');
    time=$('time');
    tries = $('tries');
    matches = $('matches');
    score = $('score');
    playersWay = $('players').value;
    moving=$('moving');
    roundV=1;
    totalScore=0;
    player1=false;
    selectAble=true;
    matchfound=false;
    triesV=0;
    matchesPlayer1=0;
    tries.innerHTML= triesV;
    matches.innerHTML= matchesPlayer1;
    gameDeckArray=[];

    if(playersWay=="2players" || playersWay=="vspc"){
        showSecondPlayer=$('showSecondPlayer');
        showSecondPlayer.style.display="";
        secondPlayer = $('secondPlayer');
        tries2 = $('tries2');
        matches2 = $('matches2');
        score2 = $('score2');
        totalScore2=0;
        triesV2=0;
        matchesPlayer2=0;
        tries2.innerHTML= triesV2;
        matches2.innerHTML= matchesPlayer2;
        if(playersWay=="2players"){secondPlayer.innerHTML="Player 2";}else{secondPlayer.innerHTML="Pc";}
    }

    if(gameMode == "single"){
        let radio = document.querySelector('input[name="imageWay"]:checked').value;
        if(radio==0){
            imagetype=$('imagetype').value;
            if(imagetype=="random"){pairsAmount= Number( $('pairsRandom').value );gameDeckArray=deckArray;}  
            else{
                for(let i=0; i<deckArray.length; i++){
                    if(deckArray[i]["family"] == imagetype){
                        gameDeckArray.push({name: deckArray[i]["name"]});
                    }
                }
                pairsAmount= gameDeckArray.length}
        }else{
            pairsAmount= selectedCards.length;
            for(let i=0; i<pairsAmount; i++){
                gameDeckArray.push({name: selectedCards[i]});
            }
        }
        
    }else{pairsAmount=roundV;gameDeckArray=deckArray;}

    displayRound();
}