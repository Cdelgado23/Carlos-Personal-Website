
var API_URL = "https://cxqk60g9o1.execute-api.eu-west-1.amazonaws.com/dev"

//ajax call
function ajaxer(url, type, params, ok_cb, fail_cb) {

	$.ajax({
		url: url,
		type: type,
		crossDomain: true,
		data: JSON.stringify(params),
		contentType: "application/json",
		dataType: "json",
		success: ok_cb,
		error: fail_cb,
		timeout: 6000
	});
}

//logger
function log_cb(data, code) {
	console.log(code);
	console.log(data);
}

//parses a json to dic
function parseData(data) {
	return JSON.parse(data);
}



