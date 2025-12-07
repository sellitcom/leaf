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
function removeBlueScreen() {
	document.querySelector(".blue-screen").style.scale = "1.5";
	document.querySelector(".blue-screen").style.opacity = "0%";
	setTimeout(() => {
		let screen = document.querySelector(".blue-screen");
		screen.remove();
		createAccoutForm();
	}, 500);
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
