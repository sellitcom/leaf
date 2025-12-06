// this is a simplest library function to efficiently detect the device type from the given USER-AGENT
// can be found on stackoverflow

function isMobileDevice() {
	const ua = navigator.userAgent || navigator.vendor || window.opera;
	const mobileRegex =
		/android|iphone|ipad|ipod|blackberry|mini|windows phone|mobile/i;
	const isSmallTouchScreen =
		window.innerWidth < 900 && "ontouchstart" in window;
	return mobileRegex.test(ua) || isSmallTouchScreen;
}

// console.log(isMobileDevice());

function redirectAccordingly(currentPage) {
	if (currentPage == "m") {
		if (isMobileDevice()) {
			// mobile device he or page bhi mobile wala he to redirect ki zarurat ni
		} else {
			window.location.href = "../d/index.html";
		}
	} else if (currentPage == "d") {
		if (isMobileDevice()) {
			window.location.href = "../m/index.html";
		} else {
			// desktop device he or page bhi desktop wala he to redirect ki zarurat ni
		}
	} else {
		if (isMobileDevice()) {
			window.location.href = "m/index.html";
		} else {
			window.location.href = "d/index.html";
		}
	}
}
