

// Requires resources.js

GetTopics();
function GetTopics(){

    ajaxer(API_URL + "/entrytypes", "GET", "", LoadTopics_cb, log_cb);
}

var hiddenTopics=0,
    discoveredTopics=0;

var totalTopics=0,
    receivedTopics=0,
    topicslist=[],
    progressxtopic=0;

function updateProgressBar(progress){
    console.log(progress);


    var prevProgress = $("#topics-progress").val();


    updateProgressBarColor(prevProgress, progress);

    $("#topics-progress").val(progress);
}

function updateProgressBarColor(prevProgress, curProgress){
    var firstQuarter = "",
    secondQuarter = "is-error",
    thirdQuarter = "is-primary",
    fourthQuarter = "is-success";

    if (prevProgress>=25 && prevProgress <50){
        $("#topics-progress").removeClass(secondQuarter);
    }else if (prevProgress>=50 && prevProgress <75){
        $("#topics-progress").removeClass(thirdQuarter);
    }else if (prevProgress>=75 ){
        $("#topics-progress").removeClass(fourthQuarter);
    }

    if (curProgress>=25 && curProgress <50){
        $("#topics-progress").addClass(secondQuarter);
    }else if (curProgress>=50 && curProgress <75){
        $("#topics-progress").addClass(thirdQuarter);
    }else if (curProgress>=75 ){
        $("#topics-progress").addClass(fourthQuarter);
    }

}


function LoadTopics_cb(response){
    console.log(response.body);
    var parsed = parseData(response.body);
    for (x in parsed){
        addTopic(parsed[x].entryType);
        totalTopics++;
    }

    progressxtopic=100/totalTopics;
    console.log(progressxtopic);
}
function addTopic(entry){
    var id="topic"+entry;
    if (entry=="???"){
        id="hidden"+hiddenTopics;
        hiddenTopics++;
    }
    var html = "<li id=\""+ id +"\">"+ entry +"</li>";
    $("#topics-list").append(html);   
}

function strikeTopic(topic){
    console.log("topic" + topic);

    topicslist.push(topic);
    receivedTopics++;
    updateProgressBar(progressxtopic*receivedTopics);

    $("#topic"+topic).empty();
    $("#topic"+topic).append("<s>"+topic+"</s>");
}
function discoverTopic(topic){

    $("#hidden"+discoveredTopics).remove();
    addTopic(topic);
    strikeTopic(topic);
    discoveredTopics++;
}

$("#textarea_field").keyup(function (event) {
    if (event.keyCode === 13) {

        var content = $("#textarea_field").val();

        $("#textarea_field").val("");

        console.log("content ."+ content +".");
        if (content!="\n"){
            AskQuestion(content);
        }
    }
});


var user_id_str = Math.random().toString();


function wait(state, timeout=500) {
    if (state) {
        numQuestions++;
        $("#waiting").show(timeout);
    } else{
        numQuestions--;
        if (numQuestions==0){
            $("#waiting").hide();
        }
    }
}

var numQuestions=0;
function AskQuestion(question, show=true) {
    wait(true);

    if (show) {
        var html = '<section class="message -right container separate-element"> \
                    <div class="row justify-content-end" > <div class="nes-balloon from-right col-sm-9 my-auto"> \
                    <p>' + question + '</p> \
                    </div> \
                    <div class="col-sm-2  my-auto"> \
                    <i class="nes-bcrikko"></i> \
                    </div> \
                    </div > \
                    </section >';

        $("#conversation-list").append(html);

        $("#scrollable-conversation").animate({ scrollTop: $('#conversation-list').prop("scrollHeight") }, 1000);
    }

    var
        params = {
            "message_str": question,
            "user_id_str": user_id_str
        };

    ajaxer(API_URL + "/conversation", "POST", params, ok_cb, error);

}

function error() {
    addReceivedMsg("I think something went wrong, why don't you try again?", "balloon");

    wait(false);
}

function ok_cb(response) {

    wait(false);

    console.log(response);

    if (response.messageFormat == "CustomPayload") {
        var parsed = parseData(response.message);

        var introEntry= parsed[parsed.length - 1];

        if (!topicslist.includes(introEntry.entryType)){
            if (introEntry.hide == true){
                discoverTopic(introEntry.entryType);
            }else
                strikeTopic(introEntry.entryType);
        }

        var intro = introEntry["introduction"];
        if (intro!="")
            addReceivedMsg(intro, "balloon");
        parsed.splice(parsed.length - 1, 1);

        for (x in parsed) {
            for (y in parsed[x].conversationContent) {
                var msg = parsed[x].conversationContent[y],
                    type = parsed[x].conversationContent[y].type;

                if (type == "balloon" || type == "container") {
                    msg = msg.content;
                } else if (msg.content == "")
                    msg = "";



                if (msg!="")
                    addReceivedMsg(msg, type);
            }
        } curBadges = 0;
    }
    else {
        addReceivedMsg(response.message, "balloon");
    }
    ScrollDown();
}


var dicInteractiveMsg = {};
var interactionIndex = 1;

function archiveExtraFromInteractive(type, extra) {

    var hidden = { "type": type, "extra": extra };

    dicInteractiveMsg["interactive" + interactionIndex] = hidden;
}

function addReceivedMsg(msg, type) {

    var div = "";

    switch (type) {
        case "balloon":
            div = '<div class="col-sm-9 nes-balloon from-left align-middle">' + msg + '</div>';
            div = formatMsg(div);
            break;
        case "container":
            div = '<div class="col-sm-9 nes-container is-rounded bg-light from-left align-middle" style="border-radius:5px;">' + msg + '</div>';
            div = formatMsg(div);
            break;
        case "badge":
            var sColor = msg.splited ? msg.second_color : "";
            var sText = msg.splited ? msg.second_text : "";
            div = formatbadge(msg.main_color, msg.content, sColor, sText);
            break;
        default:
            archiveExtraFromInteractive(type, msg.content);

            div = '<button type="button" class="nes-btn" id="interactive' + interactionIndex + '">' + msg.content + '</button>';
            div = formatMsg(div);
            var butId = "interactive" + interactionIndex.toFixed();
            console.log(butId);
            console.log(dicInteractiveMsg[butId]["type"]);

            $(document).ready(function () {
                $("#" + butId).click(function (e) {
                    e.preventDefault();

                    var inter = dicInteractiveMsg[butId];
                    AddClass(butId, "is-disabled");
                    if (inter["type"] == "interactive") {
                        ShowMsg(formatMsg('<div class="col-sm-9 nes-balloon from-left align-middle">' + inter.extra + '</div>'));
                    } else
                        AskQuestion(inter.extra);
                });
            });

            interactionIndex++;
            break;
    }

    ShowMsg(div);
}

var maxBadgesXLine = 3,
    curBadges = 0,
    lastIsBadge = false;

function formatbadge(firstColor, firstContent, secondColor, secondContent) {
    var splitted = secondColor == "" ? "" : "is-splited";
    var second = "";
    if (splitted != "") {
        second = ' <span class="is-' + secondColor  + '" style="font-size:100%"> '  + secondContent + '</span > ';
    }

    var html = '<div class="nes-badge separate-element ' + splitted + '" style="width:25%; margin:3%;">  \
                    <span class="is-'+ firstColor + '" style="font-size:100%"> ' + firstContent +'</span >' +
                    second +                     
                '</div >';




    if (lastIsBadge == true) {
        if (curBadges % maxBadgesXLine == 0) {
            ShowMsg("<br>");
        }
    } 
    lastIsBadge = true;

    curBadges++;

    ShowMsg(html);
}

function formatMsg(content) {

    if (lastIsBadge==true) {
        ShowMsg("<br>");
        lastIsBadge = false;
    }

    var html = '<section class="message -left align-middle separate-element container"> \
                <div class="row"> \
                <div class="col-sm-2 my-auto"> \
                <img src="Cuadrada.jpg" class="" style=" max-width:100%; border-style: solid ;border-width:4px; border-radius:5px; border-color:rgb(40,40,40)" /> \
                </div>' +
        content +
        '</div > \
                </section >';
    return html;
}
function ShowMsg(html, animate=false) {
    $("#conversation-list").append(html);
    if (animate)
        ScrollDown();
}

function ScrollDown() {
    $("#scrollable-conversation").animate({ scrollTop: $('#conversation-list').prop("scrollHeight") }, 500);
}

function Hide(id) {
    $("#"+id).hide();
}
function AddClass(id, newClass) {
    $("#" + id).addClass(newClass);
}

$("#AskHelpButton").click(function (e) {
    AskQuestion("I need help");
});



AskQuestion("hello", false);