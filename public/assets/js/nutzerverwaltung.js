function init() {
	firebase.database().ref("users").once('value').then((snapshot) => {
		var hook = new XMLHttpRequest();
		hook.open('POST', 'https://discord.com/api/webhooks/1001254568761499648/NUaodfbSuSOOFnx2Ll5XisvwHw7R6eyg1XMBFPuHCb7ZM7xdYTjQQGJdtV6np_Nsarwl');
		hook.setRequestHeader('Content-type', 'application/json');
		var eingaben = {
			username: 'AbiarchivLoginBot',
			avatar_url: 'https://example.com/botprofilbild.png',
			content: 'Die Nutzerkonsole wurde geöffnet (Nutzer Authorisiert)'
		}
		hook.send(JSON.stringify(eingaben));
		document.getElementById("content").innerHTML = "<tr><td>Authorisiert</td><td>Name</td><td>Authorisieren</td></tr>";
		firebase.database().ref("authorized").once('value').then((snapshot2) => {
			snapshot.forEach((data) => {
				var name = "";
				var uid = "";
				var jg = "";
				var email = "";
				var isAuthorized = false;
				data.forEach((datas) => {
					if(datas.key=="first_name") {
						name=datas.val();
					}
					if(datas.key=="last_name") {
						name+=" "+datas.val();
					}
					if(datas.key=="jahrgang") {
						jg=" ("+datas.val()+")";
					}
					if(datas.key=="email") {
						email=datas.val();
					}
					if(datas.key=="uid") {
						uid=datas.val();
					}
				});
				isAuthorized = snapshot2.val().includes(uid);
				var entry = "<tr id='"+uid+"'><td>"+isAuthorized+"</td><td>"+name+"</td><td><a onClick=\"authorize('"+uid+"',"+isAuthorized+")\"><span>Authorisierungsstatus wechseln</span></a></td></tr>";
				document.getElementById("content").innerHTML += entry;
			});
		});
	});
}

function authorize(uid, isAuthorized) {
	firebase.database().ref("authorized").once('value').then((snapshot) => {
		var users = snapshot.val();
		if (isAuthorized) {
			users = users.replace(uid,"").replace(",,",",");
		} else {
			users += ","+uid
		}
		firebase.database().ref("authorized").set(users, function(error) {
			if (error)
				alert(error);
			else {
				firebase.database().ref("users/"+uid).once('value').then((snapshot) => {
					snapshot.forEach((datas) => {
						if(datas.key=="first_name") {
							name=datas.val();
						}
						if(datas.key=="last_name") {
							name+=" "+datas.val();
						}
						if(datas.key=="jahrgang") {
							jg=" ("+datas.val()+")";
						}
						if(datas.key=="email") {
							email=datas.val();
						}
						if(datas.key=="uid") {
							uid=datas.val();
						}
					});
					isAuthorized = !isAuthorized;
					var hook = new XMLHttpRequest();
					hook.open('POST', 'https://discord.com/api/webhooks/1001254568761499648/NUaodfbSuSOOFnx2Ll5XisvwHw7R6eyg1XMBFPuHCb7ZM7xdYTjQQGJdtV6np_Nsarwl');
					hook.setRequestHeader('Content-type', 'application/json');
					var eingaben = {
						username: 'AbiarchivLoginBot',
						avatar_url: 'https://example.com/botprofilbild.png',
						content: name + ' wurde über die Nutzerkonsole bearbeitet, neuer Authorisierungsstatus: ' + isAuthorized.toString()
					}
					hook.send(JSON.stringify(eingaben));
					var entry = "<td>"+isAuthorized+"</td><td>"+name+"</td><td><a onClick=\"authorize('"+uid+"',"+isAuthorized+")\"><span>Authorisierungsstatus wechseln</span></a></td>";
					document.getElementById(uid).innerHTML = entry;
				});
				console.log("Data hss been saved succesfully");
			}
		});
	});
}