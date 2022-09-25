var login = document.querySelector(".login");
var errorAlert = document.querySelector(".alert");
var nameInput = document.getElementById("myName");
var messages = document.getElementById("messages");
messages.innerHTML = "";
var myName = "";

firebase
  .database()
  .ref("messages")
  .on("child_added", (snapshot) => {
    var html = "";
    if (snapshot.val().sender == myName) {
      html += ' <li class="message mine">';
      html += '   <p class="text">' + snapshot.val().message + "</p>";
      html +=
        '   <span class="date">' +
        translateDate(snapshot.val().time) +
        "</span>";
      html += " </li>";
    } else {
      html += ' <li class="message">';
      html += '   <p class="text">' + snapshot.val().message + "</p>";
      html +=
        '   <span class="date">' +
        translateDate(snapshot.val().time) +
        "</span>";
      html += '   <span class="sender">' + snapshot.val().sender + "</span>";
      html += " </li>";
    }
    messages.innerHTML += html;
    messages.scroll({ behavior: "smooth", top: 999999999999999999999999 });
  });

function startChat() {
  myName = nameInput.value;
  if (myName.length > 0) {
    console.log(myName);
    login.classList.add("hidden");
  } else {
    errorAlert.classList.add("visible");
    errorAlert.innerHTML = "Lütfen Kullanıcı Adınızı Yazınız"
  }
}

function translateDate(stamp) {
  var date = new Date();
  var hours = "" + date.getHours();
  var second = "" + date.getMinutes();
  var format = hours.substring(-2) + ":" + second.substring(-2);
  return format;
}

function sendMessage() {
  var msg = document.getElementById("myInput").value;
  if (msg.length > 0) {
    firebase.database().ref("messages").push().set({
      sender: myName,
      message: msg,
      time: firebase.database.ServerValue.TIMESTAMP,
    });
  }
  document.getElementById("myInput").value = "";
}
