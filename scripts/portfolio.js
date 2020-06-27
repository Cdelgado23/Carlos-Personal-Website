var params = {
    "currentIntent": {
        "name": "Projects"
    }
}

function LoadProjects() {
    ajaxer(API_URL + "/projects", "POST", params, load_ok, log_cb);
}
function load_ok(response) {
    console.log(response.dialogAction.message.content);
    var parsed = parseData(response.dialogAction.message.content);
    parsed.forEach(element => { if (element.CVContent != undefined) addEntry(formatEntry(element)) });
}


function formatEntry(project) {

    console.log(project);
    var html =
        '<section class="nes-container is-rounded with-title separate-element" style="margin-top: 3%">\
    <h4 class=" "> ' + project.CVContent.Title + '</h4>\
    <span>' + project.CVContent.Description + '</span>\
    <div class="separate-element">\
    <a href="' + project.CVContent.Resource + '" class="nes-btn is-error">See More</a>\
    </div>\
    </section>';

    return html;
}

function addEntry(html) {
    $("#entriesList").append(html);
}

LoadProjects();