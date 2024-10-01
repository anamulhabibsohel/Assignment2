

"use strict"; 


let index = window.location.search.substring(1).split('=')[1];


function pageSetup() {
    document.getElementById("newImage").src = index;
    createEventListener();
}


function closeWin() {
    window.close();
}


function addToFavs() {
    window.opener.postMessage(index, '*');
}

function createEventListener() {
    let closeWindowDiv = document.getElementsByTagName("p")[0];
    if (closeWindowDiv.addEventListener) {
        closeWindowDiv.addEventListener("click", closeWin, false);
    } else if (closeWindowDiv.attachEvent) {
        closeWindowDiv.attachEvent("onclick", closeWin);
    }


    let addToFavsDiv = document.getElementsByTagName("p")[1];
    if (addToFavsDiv.addEventListener) {
      addToFavsDiv.addEventListener("click", addToFavs, false);
    } else if (addToFavsDiv.attachEvent) {
      addToFavsDiv.attachEvent("onclick", addToFavs);
    }
}

window.onload = pageSetup;