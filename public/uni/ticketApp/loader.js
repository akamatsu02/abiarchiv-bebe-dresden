var config = {
    apiKey: "AIzaSyCn3uS98kS11RWDi_eB0ok8PtFaf5Hk5NE",
    databaseURL: "https://abiarchiv-bebe-dresden-2021-default-rtdb.firebaseio.com/",
    projectId: "abiarchiv-bebe-dresden-2021",
    appId: "1:512935170916:web:397616ac6eae8821542071",
    authDomain: "abiarchiv-bebe-dresden-2021.firebaseapp.com",
    storageBucket: "abiarchiv-bebe-dresden-2021.appspot.com"
};
firebase.initializeApp(config);
var storage = firebase.storage();
var loggedIn = false;
var pw = "";
var tkey = "";
var onlyMe = false;
var formvisible = false;
var last = "";
var sending = false;
var users = ["--"];
var suchbegriff = "";
var zustaende = ["TODO","New","In Progress","Resolved","On Hold"];
var wsearch = window.location.search;
var ticketID = "";
clearData();
checker();

if (wsearch.includes("?")) {
	ticketID = wsearch.split("?")[1].replace("?","");
}

var unsubscribeStateListener = firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	    console.debug('onAuthStateChanged: User session is available');
		loggedIn = true;
	} else {
	    console.debug('onAuthStateChanged: User session is not available');
		loggedIn = false;
		autoLogin();
	}
	loginChangeText();
});

function autoLogin() {
	if (localStorage.getItem("email","")!=""&&localStorage.getItem("pw","")!="") {
        email = localStorage.getItem("email","");
        pw = localStorage.getItem("pw","");
        firebase.auth().signInWithEmailAndPassword(email, pw).then(() => {
            getName(false);
			setTimeout(function () {
				loginChangeText();
			}, 500);
        })
        .catch(() => {});
    }
}

function loginChangeText() {
	try{
    if (loggedIn) {
		document.getElementById("loginButton").value = "Logout";
	} else {
		document.getElementById("loginButton").value = "Login";
	}
	}finally{ladeTickets();}
}


function ladeTickets() {
	document.getElementById("zugewiesen").innerHTML = "<option onclick=\"document.getElementById('zustand').selectedIndex = 0;\">--</option>";
	firebase.database().ref("users2").once('value').then((snapshot) => {
		snapshot.forEach((data) => {
			var name = "";
			data.forEach((detailData) => {
				if (detailData.key == "name"){
					users.push(detailData.val());
					name = detailData.val();
				}
			});
			document.getElementById("zugewiesen").innerHTML += "<option>"+name+"</option>";
		});
    });
	document.getElementById("dataContent").innerHTML = "<table><tr><td><strong>Ticketname</strong></td><td><strong>Zustand</strong></td><td><strong>Zugewiesen an</strong></td><td><strong>Fortschritt</strong></td><td></br></td></tr></table>";
	firebase.database().ref("tickets").once('value').then((snapshot) => {
		snapshot.forEach((data) => {
			var name = "";
			var zustand = "";
			var zugewiesen = "";
			var fortschritt = "";
			data.forEach((detailData) => {
				if (detailData.key == "name")
					name = detailData.val();
				if (detailData.key == "zustand")
					zustand = detailData.val();
				if (detailData.key == "zugewiesen")
					zugewiesen = detailData.val();
				if (detailData.key == "fortschritt")
					fortschritt = detailData.val();
			});
			if (suchbegriff != "" && name.toLowerCase().includes(suchbegriff.toLowerCase())) {
				if (!onlyMe)
					document.getElementById("dataContent").innerHTML += "<tr><td><a href='#top' onclick=\"edit('"+name+"','"+zustand+"','"+zugewiesen+"','"+fortschritt+"','"+data.key+"')\">"+name+"</a></td><td>"+zustand+"</td><td>"+zugewiesen+"</td><td>"+fortschritt+"%</td><td><a onclick=\"copy('"+data.key+"')\">Copy</a> | <a onclick=\"deletes('"+data.key+"')\">Delete</a></td></tr>";
				else
					if (zugewiesen.includes(localStorage.getItem("name","").toString()))
						document.getElementById("dataContent").innerHTML += "<tr><td><a href='#top' onclick=\"edit('"+name+"','"+zustand+"','"+zugewiesen+"','"+fortschritt+"','"+data.key+"')\">"+name+"</a></td><td>"+zustand+"</td><td>"+zugewiesen+"</td><td>"+fortschritt+"%</td><td><a onclick=\"copy('"+data.key+"')\">Copy</a> | <a onclick=\"deletes('"+data.key+"')\">Delete</a></td></tr>";
			} else {
				if (suchbegriff == "")
					if (!onlyMe)
						document.getElementById("dataContent").innerHTML += "<tr><td><a href='#top' onclick=\"edit('"+name+"','"+zustand+"','"+zugewiesen+"','"+fortschritt+"','"+data.key+"')\">"+name+"</a></td><td>"+zustand+"</td><td>"+zugewiesen+"</td><td>"+fortschritt+"%</td><td><a onclick=\"copy('"+data.key+"')\">Copy</a> | <a onclick=\"deletes('"+data.key+"')\">Delete</a></td></tr>";
					else
						if (zugewiesen.includes(localStorage.getItem("name","").toString()))
							document.getElementById("dataContent").innerHTML += "<tr><td><a href='#top' onclick=\"edit('"+name+"','"+zustand+"','"+zugewiesen+"','"+fortschritt+"','"+data.key+"')\">"+name+"</a></td><td>"+zustand+"</td><td>"+zugewiesen+"</td><td>"+fortschritt+"%</td><td><a onclick=\"copy('"+data.key+"')\">Copy</a> | <a onclick=\"deletes('"+data.key+"')\">Delete</a></td></tr>";
			}
			
			if (data.key == ticketID) {
				edit(name,zustand,zugewiesen,fortschritt,data.key);
			}
		});
    });
}

function edit(n,z,zg,f,key) {
	if (!formvisible)
		changeForm();
	var zustand = zustaende.indexOf(z);
	var zugewiesen = users.indexOf(zg);
	document.getElementById("zustand").selectedIndex = zustand;
	document.getElementById("zugewiesen").selectedIndex = zugewiesen;
	document.getElementById("tname").value = n + "[EDIT]";
	document.getElementById("fortschritt").value = f;
	console.log(key);
	firebase.database().ref("tickets/"+key).once('value').then((snapshot) => {
		console.log(snapshot.key);
		console.log(snapshot.val());
		snapshot.forEach((data) => {
			console.log(data.key);
			console.log(data.val());
			if (data.key == "detail")
				document.getElementById("tdetail").value = data.val();
		});
    });
	tkey = key;
}

function copy(key) {
	var url = window.location.href + "?" + key;
	url = url.replace("#top","");
	copyStringToClipboard(url);
}

function copyStringToClipboard (str) {
   var el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
   alert("Kopiert");
}

function deletes(key) {
	var check = confirm('Wollen Sie dieses Element wirklich löschen?'); 
	if (check == true) {
		firebase.database().ref("tickets/"+key).remove()
		ladeTickets();
	}
}

function header(type) {
	var dataq = document.getElementById("tname").value;
	dataq = dataq.replace("Konzept - ", "").replace("Scripte - ", "").replace("UI - ", "")
	if (type == 1) dataq = "Konzept - "+dataq;
	if (type == 2) dataq = "Scripte - "+dataq;
	if (type == 3) dataq = "UI - "+dataq;
	document.getElementById("tname").value = dataq;
}

function ladeMeine() {
	onlyMe = !onlyMe;
	if (onlyMe)
		document.getElementById("onlyme").value = "Alle Tickets anzeigen";
	else
		document.getElementById("onlyme").value = "Nur mir zugewiesene Tickets anzeigen";
	ladeTickets();
}

function checker() {
	var data = document.getElementById("search").value;
	if (data != last) {
		last = data;
		suchbegriff = data;
		ladeTickets();
	}
	setTimeout(function () {
		checker();
	}, 500);
}

function sendEdit() {
	if (!sending) {
		sending = true;
		var zsindex = document.getElementById("zustand").selectedIndex;
		var zgindex = document.getElementById("zugewiesen").selectedIndex;
		if (zsindex >= 0 && zgindex >= 0) {
			var zustand = zustaende[zsindex];
			var zugewiesen = users[zgindex];
			var name = document.getElementById("tname").value;
			var fortschritt = document.getElementById("fortschritt").value+"";
			if (fortschritt == "")
				fortschritt = "0";
			var detail = document.getElementById("tdetail").value;
			if (name.includes("[EDIT]")) {
				firebase.database().ref("tickets/"+tkey).set({
				name: name.replace("[EDIT]",""),
				zustand : zustand,
				fortschritt : fortschritt,
				detail : detail,
				zugewiesen : zugewiesen
			}, function(error) {
				if (error)
					alert("Du bist nicht angemeldet oder hast keine Berechtigungen dies zu tun.");
				else {
					tkey = "";
					console.log("Data hss been saved succesfully");
					if (ticketID != "")
						window.location.href = window.location.href.replace("#top","").replace("?","").replace(ticketID,"");
					else
						ladeTickets();
					clearData();
					changeForm();
				}
			});
			sending = false;
			} else {
				firebase.database().ref("tickets").push({
				name: name,
				zustand : zustand,
				fortschritt : fortschritt,
				detail : detail,
				zugewiesen : zugewiesen
			}, function(error) {
				if (error)
					alert("Du bist nicht angemeldet oder hast keine Berechtigungen dies zu tun.");
				else {
					console.log("Data hss been saved succesfully");
					if (ticketID != "")
						window.location.href = window.location.href.replace("#top","").replace("?","").replace(ticketID,"");
					else
						ladeTickets();
					clearData();
					changeForm();
				}
			});
			sending = false;
			}
		} else {
			alert("Fehlerhafte Auswahl.");
			sending = false;
		}
	}
}

function clearData() {
	document.getElementById("zustand").selectedIndex = -1;
	document.getElementById("zugewiesen").selectedIndex = -1;
	document.getElementById("types").selectedIndex = 0;
	document.getElementById("tname").value = "";
	document.getElementById("fortschritt").value = "";
	document.getElementById("tdetail").value = "";
}

function sendLogin() {
    if (document.getElementById("loginPassword").value.length>=1) {
        email = document.getElementById("loginEmail").value;
        pw = document.getElementById("loginPassword").value;
    }
    if (email!=""&&pw.length>=6) {
        firebase.auth().signInWithEmailAndPassword(email, pw).then(() => {
            getName();
        })
        .catch(() => {
            alert("Anmeldung fehlgeschlagen");
        });
    } else {
        alert(unescape("Ung%FCltige Anmeldeinformationen"));
    }
}

function getName() {
    var userId = firebase.auth().currentUser.uid;
	localStorage.setItem("pw", pw);
    firebase.database().ref("users2/"+userId).once('value').then((snapshot) => {
        snapshot.forEach((datam) => {
            localStorage.removeItem(datam.key);
            localStorage.setItem(datam.key,datam.val());
        });
		localStorage.setItem("firebase:authUser:AIzaSyCn3uS98kS11RWDi_eB0ok8PtFaf5Hk5NE:[DEFAULT]", JSON.stringify(firebase.auth().currentUser));
		window.history.back()
		console.log(userId);
    });
}

function resetpw() {
    firebase.auth().sendPasswordResetEmail(document.getElementById("loginEmail").value).then(() => {
        alert("E-Mail gesendet");
    })
    .catch((error) => {
        alert("Fehlgeschlagen");
    });
}

function sendRegistration() {
	var sending = false;
    if (!sending&&document.getElementById("registerFN").value !=""&&document.getElementById("registerEmail").value !=""&&document.getElementById("registerPassword").value.length>=6 &&document.getElementById("registerPassword").value == document.getElementById("registerPassword_2").value) {
		sending = true;
		email = document.getElementById("registerEmail").value;
        pw = document.getElementById("registerPassword").value;
		firebase.auth().createUserWithEmailAndPassword(email, pw).then((userCredential) => {
            var user = firebase.auth().currentUser.uid;
            var fn = document.getElementById("registerFN").value;
            setTimeout(function () {
                firebase.database().ref("users2/"+user).set({
                    name: fn,
                    uid : user,
                    email : email
                }, function(error) {
					if (error) {
						alert("Ein interner Datenbankfehler ist aufgetreten, bitte kontaktiere einen Administrator. (oder nutze eine andere E Mail und versuche es erneut.)");
					} else {
						localStorage.setItem("name", fn);
						console.log("Data hss been saved succesfully");
						getName();
					}
				});
            }, 300);
        })
        .catch((e) => {
			console.log(e);
			alert("Registrierung fehlgeschlagen");
			sending = false;
        });
    } else {
        alert(unescape("Ung%FCltige Angaben"));
    }
}

function logout() {
	loggedIn = false;
	localStorage.removeItem("firebase:authUser:AIzaSyCn3uS98kS11RWDi_eB0ok8PtFaf5Hk5NE:[DEFAULT]");
	localStorage.removeItem("pw");
	firebase.auth().signOut();
	loginChangeText();
}

function loginChange() {
    if (document.getElementById("loginButton").value == "Logout") {
		logout();
		document.getElementById("loginButton").value = "Login";
		window.location.reload(false);
	} else {
		window.location.href = "login.html";
	}
}

function changeForm() {
	formvisible = !formvisible;
	try {
	if (formvisible) {
		document.getElementById("createForm").classList = "";
	} else {
		document.getElementById("createForm").classList = "nodisplay";
	}}finally{}
}

function loginChangeForm() {
	try {
	    document.getElementById("login").classList.toggle("nodisplay");
		document.getElementById("register").classList.toggle("nodisplay");
	}finally{}
}