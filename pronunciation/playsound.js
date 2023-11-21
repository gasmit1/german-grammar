function playSound(mySound) {
	soundFrame = '<HTML><HEAD></HEAD><BODY>';
	if (navigator.appName=='Netscape') {
		soundFrame += '<EMBED SRC = "' + mySound + '" AUTOSTART=TRUE HIDDEN=TRUE>';
	}
	else {
		if (navigator.appName=='Microsoft Internet Explorer') {
			soundFrame += '<BGSOUND SRC = "' + mySound + '">';
		}
	}
	soundFrame += '</BODY></HTML>';
	parent.hidden.document.write(soundFrame);
	parent.hidden.document.close();
}

var blankFrame = '<HTML></HTML>';
