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
ladeBild("public/main.jpg", "main_img", false);
var unsubscribeStateListener = firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	    console.debug('onAuthStateChanged: User session is available');
		loggedIn = true;
		try {init()}catch{}
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
            getAutoLoginName();
			setTimeout(function () {
				loginChangeText();
			}, 500);
        })
        .catch(() => {});
    }
}

function loginChangeText() {
    if (loggedIn) {
		document.getElementById("loginButton").innerHTML = "Logout";
		try{
			document.getElementById("ptext1").classList.toggle("nodisplay");
			document.getElementById("ptext2").classList.toggle("nodisplay");
		}catch{}
	} else {
		document.getElementById("loginButton").innerHTML = "Login";
	}
}

function ladeSteckbriefe(kurs) {
	firebase.database().ref("steckbriefe_list/"+kurs).once('value').then((snapshot) => {
        var size = snapshot.val().length;
        for(var i = 0; i < size; i++) {
            var name = snapshot.val()[i];
            name = name.replace(" ", "_").replace("ä","ae").replace("ö","oe").replace("ü","ue").replace("Ä","ae").replace("Ö","oe").replace("Ü","ue").replace("ß","ss");
            var button = document.createElement('a');
            button.setAttribute("href","steckbrief.html?"+name.replace(" ", "_").replace("%20", "_"));
            button.setAttribute("class","button");
            var text = document.createElement('span');
            text.innerHTML=snapshot.val()[i];
            button.appendChild(text);
            document.getElementById("steckbrief_liste").appendChild(button);
        }
    }).catch((error) => {
        document.getElementById("steckbrief_liste").innerHTML = "<p>Du hast keine Berechtigung die Steckbriefe einzusehen.</p>";
		document.getElementById("commentInput").value = "Du hast keine Berechtigung Kommentare zu schreiben.";
		document.getElementById("commentInput").readOnly = true;
		document.getElementById("commentInput").disabled = true;
    });
	ladeKommentare(kurs);
}

var item = "";
var geladeneKommentare = [];

function ladeKommentare(unit) {
	item = unit;
	firebase.database().ref("kommentare/"+unit).once('value').then((snapshot) => {
		console.log(snapshot.val());
        snapshot.forEach((datam) => {
			if (!geladeneKommentare.includes(datam.key)) {
				geladeneKommentare.push(datam.key);
				var data = datam.val().split("<split>");
				var comment = "<tr><td>"+data[0]+"</td><td>"+data[1]+"</td></tr><tr><td><p style=\"padding-left:10px;\">"+data[2]+"</p></td></tr>";
				document.getElementById("kommentarbereich").innerHTML += comment;
			}
        });
    });
}

function ladeBild(file, inId, hasLargePicture, largeId) {
	storage.ref("pictures/"+file).getDownloadURL().then((url1) => {
		document.getElementById(inId).src = url1;
		if (hasLargePicture)
			document.getElementById(largeId).hurl1;
	}).catch((error) => {
		console.log(error);
	});
}

function ladeContent() {
	var loaded = false;
	setTimeout(function () {
		if(!loaded)
			alert("Error: Timeout");
	}, 10000);
	var schueler = window.location.search.split("?")[1].replace("?","").replace("%20", "_");
	ladeBild("locked/"+schueler+".jpg", "data16_2", true, "data16_1");
	ladeKommentare(schueler);
	storage.ref("steckbriefe/"+schueler+".txt").getDownloadURL().then((url1) => {
		fetch(url1).then((r)=>{
			r.text().then((d)=>{
				try{
					var data = d.split("<split>");
					document.getElementById("data0").innerHTML = data[0];
					document.getElementById("data1").innerHTML = data[1];
					document.getElementById("data2").innerHTML = data[2];
					document.getElementById("data3").innerHTML = data[3];
					document.getElementById("data4").href = data[4];
					document.getElementById("data5").innerHTML = data[5];
					document.getElementById("data6").innerHTML = data[6];
					document.getElementById("data7").innerHTML = data[7];
					document.getElementById("data8").innerHTML = data[8];
					document.getElementById("data9").innerHTML = data[9];
					document.getElementById("data10").innerHTML = data[10];
					document.getElementById("data11").innerHTML = data[11];
					document.getElementById("data12").innerHTML = data[12];
					document.getElementById("data13").innerHTML = data[13];
					document.getElementById("data14").innerHTML = data[14];
					document.getElementById("data15").innerHTML = data[15];
					loaded = true;
				}catch{}
			})
		})
	}).catch((error) => {
		alert("Error: Laden der Daten fehlgeschlagen, entweder hast du nicht ausreichend Berechtigungen oder es ist ein Datenbankfehler passiert.");
	});
}

function ladeText(url, inId) {
	storage.ref(url).getDownloadURL().then((url1) => {
		fetch(url1).then((r)=>{
			r.text().then((d)=>{
				try{
					var data = d.split("<split>");
					for(var i=0;i<data.length;i++) {
						document.getElementById(inId+i).innerHTML = data[i];
					}
					try {lazyLoad()}catch{}
				}catch{}
			})
		})
	}).catch((error) => {
		console.log(error);
	});
}

var sending = false;
function sendComment(unit) {
	var toUnit = unit;
	if (unit == 'sb') toUnit = item;
	if (!sending) {
		sending = true;
		d = new Date();
		months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		h = d.getHours()+"";
		m = d.getMinutes()+"";
		day = d.getDate()+"";
		if (h.length==1) h = "0"+h;
		if (m.length==1) m = "0"+m;
		if (day.length==1) day = "0"+day;
		var name = localStorage.getItem("first_name")+" "+localStorage.getItem("last_name");
		var com = document.getElementById("commentInput").value;
		if (com != "" && com != "Du hast keine Berechtigung Kommentare zu schreiben.") {
			var msg = name+"<split>"+day+"."+months[d.getMonth()]+"."+d.getFullYear()+" "+h+":"+m+"<split>"+com;
			firebase.database().ref("kommentare/"+toUnit).push(msg, function(error) {
				if (error)
					alert("Du bist nicht angemeldet oder hast keine Berechtigungen dies zu tun.");
				else {
					console.log("Data hss been saved succesfully");
					ladeKommentare(toUnit);
					document.getElementById("commentInput").value = "";
				}
			});
			sending = false;
		}
	}
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

function sendDiscordMessage(name, redirect) {
	var hook = new XMLHttpRequest();
	hook.open('POST', 'https://discord.com/api/webhooks/1001254568761499648/NUaodfbSuSOOFnx2Ll5XisvwHw7R6eyg1XMBFPuHCb7ZM7xdYTjQQGJdtV6np_Nsarwl');
	hook.setRequestHeader('Content-type', 'application/json');
    var eingaben = {
        username: 'AbiarchivLoginBot',
        avatar_url: 'https://example.com/botprofilbild.png',
		content: name+' Logged in, please check: https://abiarchiv-bebe-dresden.de/nutzerverwaltung.html'
    }
    hook.send(JSON.stringify(eingaben));
	setTimeout(function () {
		if (redirect)
			window.history.back()
	}, 1000);
}

function getName() {
    var userId = firebase.auth().currentUser.uid;
	localStorage.setItem("pw", pw);
    firebase.database().ref("users/"+userId).once('value').then((snapshot) => {
		var name = "";
        snapshot.forEach((datam) => {
            localStorage.removeItem(datam.key);
            localStorage.setItem(datam.key,datam.val());
			if (datam.key == "first_name")
				name = datam.val();
        });
		localStorage.setItem("firebase:authUser:AIzaSyCn3uS98kS11RWDi_eB0ok8PtFaf5Hk5NE:[DEFAULT]", JSON.stringify(firebase.auth().currentUser));
		sendDiscordMessage(name, true);
		console.log(userId);
    });
}

function getAutoLoginName() {
    var userId = firebase.auth().currentUser.uid;
	localStorage.setItem("pw", pw);
    firebase.database().ref("users/"+userId).once('value').then((snapshot) => {
		var name = "";
        snapshot.forEach((datam) => {
            localStorage.removeItem(datam.key);
            localStorage.setItem(datam.key,datam.val());
			if (datam.key == "first_name")
				name = datam.val();
        });
		localStorage.setItem("firebase:authUser:AIzaSyCn3uS98kS11RWDi_eB0ok8PtFaf5Hk5NE:[DEFAULT]", JSON.stringify(firebase.auth().currentUser));
		sendDiscordMessage(name, false);
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
    var minjg=2021;
    var maxjg=2021;
    if (!sending&&document.getElementById("registerFN").value !=""&&document.getElementById("registerLN").value !=""&&document.getElementById("registerJg").value >=minjg&&document.getElementById("registerJg").value <=maxjg&&document.getElementById("registerJg").value !=""&&document.getElementById("registerEmail").value !=""&&document.getElementById("registerPassword").value.length>=6 &&document.getElementById("registerPassword").value == document.getElementById("registerPassword_2").value) {
		sending = true;
		email = document.getElementById("registerEmail").value;
        pw = document.getElementById("registerPassword").value;
		firebase.auth().createUserWithEmailAndPassword(email, pw).then((userCredential) => {
            var user = firebase.auth().currentUser.uid;
            var ln = document.getElementById("registerLN").value;
            var fn = document.getElementById("registerFN").value;
            var jg = document.getElementById("registerJg").value;
            setTimeout(function () {
                firebase.database().ref("users/"+user).set({
                    first_name: fn,
                    last_name: ln,
                    uid : user,
                    jahrgang : jg,
                    email : email
                }, function(error) {
					if (error) {
						alert("Ein interner Datenbankfehler ist aufgetreten, bitte kontaktiere einen Administrator. (oder nutze eine andere E Mail und versuche es erneut.)");
						sending = false;
					} else {
						console.log("Data hss been saved succesfully");
						getName();
						sending = false;
					}
				});
            }, 300);
        })
        .catch((e) => {
			console.log(e)
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
	try{
		document.getElementById("ptext1").classList.toggle("nodisplay");
		document.getElementById("ptext2").classList.toggle("nodisplay");
	}catch{}
}

function loginChange() {
    if (document.getElementById("loginButton").innerHTML == "Logout") {
		logout();
		document.getElementById("loginButton").innerHTML = "Login";
		window.location.reload(false);
	} else {
		window.location.href = "login.html";
	}
}

var fullSearch = false;
var suchliste = [];
function suche() {
	document.getElementById("ergebnisse").innerHTML = "";
	var searchInput = document.getElementById("searchInput").value.toLowerCase();
	suchliste.forEach((result) => {
		var name = result;
		var user = name.replace(" ", "_").replace("ä","ae").replace("ö","oe").replace("ü","ue").replace("Ä","ae").replace("Ö","oe").replace("Ü","ue").replace("ß","ss").replace(" ", "_");
		var data = "<tr><td><p><a onClick=\"navigateTo('"+user+"')\"><span>"+name+"</span></a></p></td></tr>";
		console.log(user);
		if (fullSearch && localStorage.getItem(user)) {
			if (result.toLowerCase().includes(searchInput) || localStorage.getItem(user).toLowerCase().includes(searchInput)) {
				document.getElementById("ergebnisse").innerHTML += data;
			}
		} else {
			if (result.toLowerCase().includes(searchInput)) {
				document.getElementById("ergebnisse").innerHTML += data;
			}
		}
    });
}

function navigateTo(user) {
	window.location.href = "steckbrief.html?"+user;
}

function initsuche() {
	firebase.database().ref("steckbriefe_list").once('value').then((snapshot) => {
		snapshot.forEach((datam) => {
			datam.forEach((data2) => {
				suchliste.push(data2.val())
			});
        });
		checker();
    });
}

var last = "null"
function checker() {
	fullSearch = document.getElementById("searchFiles").checked;
	var data = document.getElementById("searchInput").value.toLowerCase();
	if (data != last) {
		last = data;
		suche();
	}
	setTimeout(function () {
		checker();
	}, 500);
}

function initFullSearch() {
	if (!localStorage.getItem("fbdb") && fullSearch) {
		fetchData(0)
	}
}

function fetchData(pos) {
	if (pos != suchliste.length) {
		var size = suchliste.length-1;
		var user = suchliste[pos].replace(" ", "_").replace("ä","ae").replace("ö","oe").replace("ü","ue").replace("Ä","ae").replace("Ö","oe").replace("Ü","ue").replace("ß","ss").replace(" ", "_");
		if (!localStorage.getItem(user)) {
			storage.ref("steckbriefe/"+user+".txt").getDownloadURL().then((url1) => {
				fetch(url1).then((r)=>{
					r.text().then((d)=>{
						try{
							localStorage.setItem(user, d);
							fetchData(pos+1);
							document.getElementById("progress").innerHTML = "Fortschritt: "+pos+"/"+size;
						}catch{}
					})
				})
			}).catch((error) => {
				fetchData(pos+1);
				document.getElementById("progress").innerHTML = "Fortschritt: "+pos+"/"+size;
			});
		} else {
			fetchData(pos+1);
				document.getElementById("progress").innerHTML = "Fortschritt: "+pos+"/"+size;
		}
	} else {
		localStorage.setItem("fbdb", "true");
		document.getElementById("progress").innerHTML = "";
	}
}