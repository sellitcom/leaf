function createAccoutForm() {
	document.querySelector(".signup-screen").style.marginTop = "16vh";
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
	}, 500);
}
