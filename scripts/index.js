//turn json element to html
function format_entry(element) {

	var html = '<section class="nes-container is-rounded with-title separate-element" style="margin-top: 3%">';

	html += '<h4 class=" ">' + element.title + '</h4>';

	var desc = element.description.split("/c");

	var color = element.color;

	ind = 0;
	desc.forEach(piece => {

		if (ind % 2 == 0) {
			html += '<span>' + piece + '</span>';
		} else {
			html += '<span class="nes-text is-' + color + '">' + piece + '</span>';
		}
		ind++;
	});

	html += '<div class="separate-element">';

	var link = "";

	if (element.color != "disabled")
		link = 'href="' + element.buttonLink + '"';

	html += '<a ' + link + 'class="nes-btn is-' + element.color + '">' + element.buttonText + ' </a>';
	html += '</div>'

	return html;
}

//add the html to the code
function AddEntry(html) {

	$("#entries_container").append(html);

}

//given a string as response, add the corresponding code to the html
function set_entries(response) {

	var parsed = parseData(response.body);
	parsed.sort(function (a, b) { return b.entryid - a.entryid });
	parsed.forEach(element => AddEntry(format_entry(element)));


}

//gets the index entries from the bd
function get_index_entries() {
	ajaxer(API_URL + "/indexentries", "POST", "", set_entries, log_cb);
}
