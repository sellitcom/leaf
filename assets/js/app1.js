function createAccoutForm() {
	document.querySelector(".signup-screen").style.marginTop = "16vh";
}
function signUpGoBack() {
	document.querySelector(".signup-screen").style.marginTop =
		"calc(100vh + 50px)";
}
function loginForm() {
	document.querySelector(".login-screen").style.marginTop = "16vh";
}
function logInGoBack() {
	document.querySelector(".login-screen").style.marginTop =
		"calc(100vh + 50px)";
}
function removeBlueScreen() {
	document.querySelector(".blue-screen").style.scale = "1.5";
	document.querySelector(".blue-screen").style.opacity = "0%";
	setTimeout(() => {
		let screen = document.querySelector(".blue-screen");
		screen.remove();
		loginForm();
	}, 500);

	if (!isPWA()) {
		// PWA nahi he.. browser he..
		console.log("pwa nahi he");
		document.querySelector(".app-install-screen").style.display = "flex";
	}

	let tempEventStore;
	let installBtn = document.querySelector(".install-app-btn");

	// install prompt ka intzaar karo or usse pakr kar temp me store karo
	window.addEventListener("beforeinstallprompt", (e) => {
		e.preventDefault(); // automatic prompt ko rok lo
		tempEventStore = e; // usse temp var me store kar lo
	});

	installBtn.addEventListener("click", async () => {
		if (!tempEventStore) return; // agar event ruka hi nai to function yehi end kar do

		tempEventStore.prompt(); // roka hua prompt show karo
		const { outcome } = await tempEventStore.userChoice;

		if (outcome === "accepted") {
			document.querySelector(
				".app-install-screen-app-name-heading"
			).style.fontSize = "0.95rem";
			document.querySelector(
				".app-install-screen-app-slogan-txt"
			).style.display = "none";
			document.querySelector(".install-app-btn").style.display = "none";
			document.querySelector(
				".app-install-screen-app-name-heading"
			).innerHTML = "App will be installed shortly!";
		} else {
			console.log("User dismissed the install.");
		}

		tempEventStore = null; // Reset
	});
}
function changeGender(gender) {
	let currentGender = document.querySelector("#selectedGender").innerHTML;
	if (currentGender == gender) {
		// do nothing
	} else {
		document.querySelector("#selectedGender").innerHTML = gender;
		document.querySelector("#" + gender + "GenderField").style.border =
			"1px solid var(--green-2)";
		if (gender == "male") {
			oppositeGender = "female";
		} else {
			oppositeGender = "male";
		}
		document.querySelector(
			"#" + oppositeGender + "GenderField"
		).style.border = "none";
	}
}
function isValid(str) {
	return /^[A-Za-z0-9_]+$/.test(str);

	// ^ string ka start he
	// [] ke andar vo values likhte he jo allowed he
	// A-Z allowed he
	// a-z allowed he
	// 0-9 allowed he
	// _ underscore allowed he
	// + iss liyy lgate he to make sure kam se kam ek character he
	// $ end of string
}
function signup() {
	let name = document.querySelector("#signupFieldFullName");
	let username = document.querySelector("#signupFieldUsername");
	let password = document.querySelector("#signupFieldPassword");
	let gender = document.querySelector("#selectedGender");
	let informer = document.querySelector("#signupInformer");

	if (name.value == "") {
		name.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Do you have a name?";
		return;
	}
	if (username.value == "") {
		username.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "A unique username is important!";
		return;
	}
	if (isValid(username.value) == false) {
		username.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML =
			"Username can only have letters, numbers and underscores!";
		return;
	}
	if (db_exists("users." + username.value)) {
		username.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Username already exists!";
		return;
	}
	if (password.value == "") {
		password.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Password???";
		return;
	}
	if (password.value.length < 12) {
		password.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Password should be atleast 12 characters?";
		return;
	}
	if (gender.innerHTML == "") {
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Code me pange na len!";
		return;
	}

	// all set
	// store the user to db
	db_set("users." + username.value + ".name", name.value);
	db_set("users." + username.value + ".password", password.value);
	db_set("users." + username.value + ".gender", gender.innerHTML);

	localStorage.setItem("currentLogin", username.value);

	// enter the main screen
	document.querySelector(".signup-screen").style.marginTop =
		"calc(100vh + 50px)";
	document.querySelector(".welcome-screen").style.borderBottomLeftRadius =
		"33px";
	document.querySelector(".welcome-screen").style.borderBottomRightRadius =
		"33px";
	setTimeout(() => {
		document.querySelector(".welcome-screen").style.marginTop = "-100vh";
	}, 200);
}
function login() {
	let username = document.querySelector("#loginFieldUsername");
	let password = document.querySelector("#loginFieldPassword");
	let informer = document.querySelector("#loginInformer");

	if (username.value == "") {
		username.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "A unique username is important!";
		return;
	}
	if (isValid(username.value) == false) {
		username.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML =
			"Username can only have letters, numbers and underscores!";
		return;
	}
	if (!db_exists("users." + username.value)) {
		username.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Username does'nt exists!";
		return;
	}
	if (password.value == "") {
		password.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Password???";
		return;
	}
	if (password.value.length < 12) {
		password.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Incorrect Password!";
		return;
	}
	let actualPassword = db_get("users." + username.value + ".password");
	if (!(password.value == actualPassword)) {
		password.focus();
		informer.style.fontSize = "0.9rem";
		informer.style.color = "var(--red)";
		informer.innerHTML = "Incorrect Password!";
		return;
	}

	// all set
	// allow login
	localStorage.setItem("currentLogin", username.value);

	// enter the main screen
	document.querySelector(".login-screen").style.marginTop =
		"calc(100vh + 50px)";
	document.querySelector(".welcome-screen").style.borderBottomLeftRadius =
		"33px";
	document.querySelector(".welcome-screen").style.borderBottomRightRadius =
		"33px";
	setTimeout(() => {
		document.querySelector(".welcome-screen").style.marginTop = "-100vh";
	}, 400);
}

