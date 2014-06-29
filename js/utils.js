function log(type, mex) {
	Console.log(type + ": " + mex);
}

// sovrascrive la funzione precedente
function log(type, mex, divId) {
	var date = new Date();
	data = date.getMinutes()+":"+date.getSeconds()+":"+date.getMilliseconds();
	// potre fare anche solo
	// var newInnerHTML = "<div class='"+type+"'>"+ mex + "</div>";
	// docuemnt.getElementById(divId).innerHTML.append(newInnerHTML);
	// devo avere una classe nel css che sia esattamente nominata come
	// il type definito (i, w, e)

	// soluzione piÃ¹ disaccoppiata
	if (divId) {
		var newInnerHTML = null;
		if (type == 'w') {
			// warning
			newInnerHTML = "<div class='warn'>" + data +": "+ mex + "</div>";
		} else if (type == 'e') {
			// error
			newInnerHTML = "<div class='error'>" + data +": "+ mex + "</div>";
		} else if (type == 'i') {
			// info
			newInnerHTML = "<div class='info'>" + data +": "+ mex + "</div>";
		}
		document.getElementById(divId).innerHTML += (newInnerHTML);
	}else{
		console.log(type + ": " + data +" - "+ mex);
	}
}