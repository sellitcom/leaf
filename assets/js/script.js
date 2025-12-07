function navigate(url) {
	// _blank iss liyy likhte he taake new tab me open ho
	window.open(url, "_blank");
}
function isPWA() {
	return (
		window.matchMedia("(display-mode: standalone)").matches ||
		window.navigator.standalone === true

		// uper wala normal check (window/android)
		// neche wala iOS ke liyy
		// kyu ke iOS/Safari window.navigator me rakhta he ye value..
	);
}
