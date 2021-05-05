function displayFeedbackScreen() {
    let screen = document.getElementById("dark-screen");
    let container = document.getElementById("feedback-container");

    let oldDisplayValue = screen.style.display;
    if( oldDisplayValue != "block" ) {
        screen.style.display = "block";
        container.style.display = "block";
    } else {
        screen.style.display = "none";
        container.style.display = "none";
    }
}


function sendFeedback() {
    const messageContent =  document.getElementById("messageContent").value;
    const timeStamp = new Date().getTime();

    var db = firebase.firestore();
    db.collection("messages").add({
        content: messageContent,
        time: timeStamp
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        hideFeedbackContainer();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        hideFeedbackContainer();
    });
}

function hideFeedbackContainer() {
    document.getElementById("dark-screen").style.display = "none";
    document.getElementById("feedback-container").style.display = "none";
}

function stopEvent() {
    event.stopPropagation();
}

function scrollToChapter(selectObject) {
    if( selectObject.value == "top" ) {
        window.scroll(0,0);
        hideNavbar();
    } else {
        document.getElementById(selectObject.value).scrollIntoView();
    }
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos && currentScrollPos != 0) {
    document.getElementById("navbar").style.top = "0";
  } else {
    hideNavbar();
  }
  prevScrollpos = currentScrollPos;
  document.getElementById("list").value = "";
} 

function hideNavbar() {
    document.getElementById("navbar").style.top = "-" + document.getElementById("navbar").offsetHeight + "px";
}