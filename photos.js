

"use strict";

let photoOrd = [1,2,3,4,5];
let autoAdvance = setInterval(rightAdvance,5000);
let fig_count = 3;

function populateFigures() {
    let filename;
    let currentFig;
    if (fig_count === 3) {
        for (let i = 1; i < 4; i++) {
            filename = "images/IMG_0" + photoOrd[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i - 1];
           currentFig.src = filename;
        }
    } else {
        for (let i = 0; i < 5; i++) {
            filename = "images/IMG_0" + photoOrd[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i];
            currentFig.src = filename;
        }
    }
}

function rightArrow() {
    clearInterval(autoAdvance);
    rightAdvance();
}

function rightAdvance() {
    for (let i = 0; i < 5; i++) {
        if ((photoOrd[i] + 1) === 6) {
            photoOrd[i] = 1;
        } else {
            photoOrd[i] += 1;
        }
        populateFigures();
    }
}

function leftArrow() {
    clearInterval(autoAdvance);
    for (let i = 0; i < 5; i++) {
        if ((photoOrd[i] - 1) === 0) {
            photoOrd[i] = 5;
        } else {
            photoOrd[i] -= 1;
        }
        populateFigures();
    }
}

function previewFive() {
 
    let article_E = document.getElementsByTagName("article")[0];
    let last_fig = document.createElement("figure");
    last_fig.id = "fig5";
    last_fig.style.zIndex = "5";
    last_fig.style.position = "absolute";
    last_fig.style.right = "45px";
    last_fig.style.top = "67px";
    let last_img = document.createElement("img");
    last_img.width = "240";
    last_img.height = "240";
    last_fig.appendChild(last_img);
   
    article_E.insertBefore(last_fig, document.getElementById("rightarrow"));

    let first_fig = last_fig.cloneNode(true);
    first_fig.id = "fig1";
    first_fig.style.right = "";
    first_fig.style.left = "45px";

    article_E.insertBefore(first_fig, document.getElementById("fig2"));
    fig_count = 5;

    document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrd[0] + "sm.jpg";
    document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrd[4] + "sm.jpg";

    let num_button = document.querySelector("#fiveButton p");
    num_button.innerHTML = "Show fewer images";
    if (num_button.addEventListener) {
        num_button.removeEventListener("click", previewFive, false);
        num_button.addEventListener("click", previewThree, false);
    } else if (num_button.attachEvent) {
        num_button.detachEvent("onclick", previewFive);
        num_button.attachEvent("onclick", previewThree);
    }
}

function previewThree() {
   let article_E = document.getElementsByTagName("article")[0];
   let num_button = document.querySelector("#fiveButton p");
   article_E.removeChild(document.getElementById("fig1"));
   article_E.removeChild(document.getElementById("fig5"));
   fig_count = 3;
   num_button.innerHTML = "Show more images";
   if (num_button.addEventListener) {
       num_button.removeEventListener("click", previewThree, false);
       num_button.addEventListener("click", previewFive, false);
    } else if (num_button.attachEvent) {
        num_button.detachEvent("onclick", previewThree);
        num_button.attachEvent("onclick", previewFive);
    }
}

function zoomFig() {
    let index = (fig_count == 3 ? 1 : 2)
    let main_fig = document.getElementsByTagName("img")[index];
    let zoomWindow = window.open("zoom.htm?index="+main_fig.src, "zoomwin", "width=740,height=800");
    zoomWindow.focus();
}

function createEventListeners() {
    let leftarrow = document.getElementById("leftarrow");
    if (leftarrow.addEventListener) {
        leftarrow.addEventListener("click", leftArrow, false);
    } else if (leftarrow.attachEvent)  {
        leftarrow.attachEvent("onclick", leftArrow);
    }
    let rightarrow = document.getElementById("rightarrow");
    if (rightarrow.addEventListener) {
        rightarrow.addEventListener("click", rightArrow, false);
    } else if (rightarrow.attachEvent)  {
        rightarrow.attachEvent("onclick", rightArrow);
    }
    let main_fig = document.getElementsByTagName("img")[1];
    if (main_fig.addEventListener) {
        main_fig.addEventListener("click", zoomFig, false);
    } else if (main_fig.attachEvent)  {
        main_fig.attachEvent("onclick", zoomFig);
    }
    let showAllButton = document.querySelector("#fiveButton p");
    if (showAllButton.addEventListener) {
        showAllButton.addEventListener("click", previewFive,
        false);
    } else if (showAllButton.attachEvent) {
        showAllButton.attachEvent("onclick", previewFive);
    }

    window.addEventListener('message', function(event) {
        let favs = document.getElementById('favs');

        if (favs.children.length > 5) {
            window.alert('Maximum number of favorites is 5! Remove at least one favorite first.');
            return;
        }

        let div = document.createElement('div');
        favs.appendChild(div);

        let img = document.createElement('img');
        img.src = event.data;
        img.width = 170;
        div.appendChild(img);


        let par = document.createElement('p');
        div.appendChild(par);

        let button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'Remove';
        button.addEventListener('click', function() {
          favs.removeChild(div);
        });
        par.appendChild(button);
       });
}

function setUpPage() {
    createEventListeners();
    populateFigures();
}

if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}