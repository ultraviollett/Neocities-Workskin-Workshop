var prevName = ""; //stores value of prev name to compare it to current
var prevInOut = ""; //stores val of prev in/out to compare it to current
var prev = ""; //holds code (minus surrounding div) to be added to
childCount = 0; //counts how many times add is clicked
var isChange = false; //switches name

$(document).ready(function(){
//header-div and textbar-div will be revealed when their checkboxes are checked
$('#header-div').hide();
$('#textbar-div').hide();

//will be revealed when someone other than 'you' is chosen for messenger-choose
$("#contact-div").hide();

//all the various text inputs, default is message
$('#link-text-div').hide();

$('#secondary-text-div').hide();
$('#timestamp-div').hide();

$('#time-timestamp-div').hide();
$('#custom-timestamp-div').hide();

//you cant have typing dots from your side
$("#message-type option[val='typing-dots']").hide();


//hide read receipt, will show when checkbox is checked
$('#read-receipt-div').hide();
$('#custom-read-receipt-div').hide();
$('#time-read-div').hide();

});

function switchGroupChatDm(){
    if ( $("#group-dm-type").val() == 'DM' ){
        $('[id$=header-choose-label]').text("Add contact's name for header?");
        $("#input-header").attr("placeholder","Insert contact's name");
        $('[id$=contact-choose-label]').text("Your contact");
        $("#input-contact").attr("placeholder","Insert name for alt text");


    }else{

        $('[id$=header-choose-label]').text("Add groupchat's name for header?");
        $("#input-header").attr("placeholder","Insert groupchat's name");
        $('[id$=contact-choose-label]').text("Someone else");
        $("#input-contact").attr("placeholder","Insert name");
}}

function addNameForDm(){
    if ( $("#group-dm-type").val() == 'DM' ){
        const x = $("#input-header").val();
        $("#input-contact").text(x)
    }
}


function chooseMessenger(){
    if ( $('input[id="you"]:checked').val() ){
        $("#contact-div").hide();
        $("#message-type option[val='typing-dots']").hide();
        $("#read-receipt-choose-div").show();

    }else{
        $("#contact-div").show();
        $("#read-receipt-choose-div").hide();
        $("#message-type option[val='typing-dots']").show();

}}


function chooseMessageType(){

    //resets the read receipt
    $('#read-receipt-choose').prop('checked', false);
    $('#read-receipt-div').hide();

    switch ( $("#message-type").val() ){

        case "Message":
            $("#messenger-choose-div").show();

            $("#input-text-div").show();
            $("#link-text-div").hide();
            $("#secondary-text-div").hide();
            $("#timestamp-div").hide();
            $("#read-receipt-choose-div").show();

            break;

        case "Timestamp":
            $("#messenger-choose-div").hide();

            $("#input-text-div").hide();
            $("#link-text-div").hide();
            $("#secondary-text-div").hide();
            $("#timestamp-div").show();
            $("#read-receipt-choose-div").hide();
            break;

        case "Image":
            $("#messenger-choose-div").show();

            $("#input-text-div").hide();
            $("#link-text-div").show();
            $("#secondary-text-div").show();
            $("#timestamp-div").hide();
            $("#read-receipt-choose-div").show();
            
            $("#input-link-text").attr("placeholder","Insert Image URL");
            $("#input-secondary-text").attr("placeholder","Insert alt text");
            break;

        case "Link":
            $("#messenger-choose-div").show();

            $("#input-text-div").hide();
            $("#link-text-div").show();
            $("#secondary-text-div").show();
            $("#timestamp-div").hide();
            $("#read-receipt-choose-div").show();
            
            $("#input-link-text").attr("placeholder","Insert link");
            $("#input-secondary-text").attr("placeholder","Insert text for link");            
            break;

           
        case "Typing Dots":
            $("#messenger-choose-div").show();

            $("#input-text-div").hide();
            $("#link-text-div").hide();
            $("#secondary-text-div").hide();
            $("#timestamp-div").hide();
            $("#read-receipt-choose-div").hide();
            break;
        

        default:
            $("#messenger-choose-div").show();

            $("#input-text-div").show();
            $("#link-text-div").hide();
            $("#secondary-text-div").hide();
            $("#timestamp-div").hide();
            $("#read-receipt-choose-div").show();
            break;           

    
    }
}


function addSurroundingDiv(x){ //adds surrounding div depending on whats been selected
    
    //if groupchat has been chosen, this will equal grouptext
    const groupchat = $("#group-dm-type").val() == 'Groupchat' ? " grouptext" : "";
    
    //if you want to add header, will add one with the name you inputed

    const header = $('input[id="header-choose"]:checked').val() ? `<h1 class="contact">
<span class="screenreader">Groupchat: </span>${$("#input-header").val() } 
</h1>`: "";

    //if you have text for te
    var textbarText = $("#input-textbar").val() ? `
<span class="screenreader">You are typing: </span>
${$("#input-textbar").val()}
` : "";

    var textbar = $('input[id="textbar-choose"]:checked').val() ? `
<br>
<div class="footer"><span class="typebar">${textbarText}</span></div>
` : "";


    const fullThing = `<dl class="imessage${groupchat}">${header} <hr>
${x}${textbar}
<hr></dl>`

    return fullThing;

}

function switchName(){ 
    //finds out if someone different is texting.
    //then uses new name and figures out if text is in or out

    const currentInOut = $('input[id="contact-choose"]:checked').val() ? "in" : "out";

    var currentName;
    if (currentInOut == "in"){
        currentName = $("#input-contact").val() ? $("#input-contact").val() : "contact";
    }else{
        currentName = "You";
    }

    //if the message type is a timestamp, or both inout and name have remained the same, isChange is false
    isChange = ((currentInOut == prevInOut && currentName == prevName) || $("#message-type").val() == 'Timestamp') ? false : true;

    //if this is the first message, or if there have been any changes, as well as the message type not being a timestamp, a <dl> for the name will be added

    addSlashDiv = childCount == 0 ? "" : "</div>"

    const x = childCount == 0 || isChange ? `${addSlashDiv}
<div class = "${currentInOut}">
<dt><b>${currentName}</b></dt>` : "";

    isChange = false;
    childCount += 1;

    prevInOut = currentInOut;
    prevName = currentName;

    return x;

}

function addNewText(){
    //adds text of message
    return `<dd>${ $("#input-text").val()}</dd>`;

}

function addTimestamp(){
    //finds what info has been inputted for the timestamp and adds it

    const timestamp =  $("#timestamp-choose").val();

    var x;
    switch (timestamp){
        case "custom-time-choose]":
            x = $("#time-timestamp").val();
            break;

        case "custom-choose":
            x = $("#custom-timestamp").val();
            break;

        default:
            x = timestamp;
    }

    x = `<h4 class="time">${timestamp}</h4>`;

    return x;

}


function addImage(){
    //adds image
    const x = `
<dd class="pic">
<img width="400" src="${$("#input-link-text").val()}" alt="${ $("#input-secondary-text").val() }">
</dd>`;
    return x;

}
/*
function addRichLink(x){
    //adds rich link
    x = x + '<dd class="richlink"><a href="'+$("#linktext").val()+'">';
    x = x + '<iframe src="'+$("#link-text").val()+'" frameborder="0"></iframe>';
    
    if( $("#rich-link").val() ){
        x = x + '<p class="caption"><b>'+$("#richlink").val()+'</b></p>';
    }
    x = x + '</a></dd>';

    return x;
}
    
<dd class="richlink">
	<a href="https://www.youtube.com/watch?v=DdRrXZoQ8wo">
		<iframe src="https://www.youtube.com/embed/DdRrXZoQ8wo" frameborder="0"></iframe>
		<p class="caption"><b>Forging a Roman Gladius Sword</b> youtube.com </p>
        </a>
</dd>

*/



function addLink(){
    //if there is text for the link, that text will be used. If not, the link will be used as text
    text = $("#input-secondary-text").val() ? $("#input-secondary-text").val() : $("#input-link-text").val();

    const x = `
<dd><a href=" ${$("#input-link-text").val()} ">
${text}
</a></dd>`;
    return x;

}

function addTypingDots(){
    const x = `
<dd class="typing">
<span class="screenreader">typing...</span>
<div></div> <div></div> <div></div> </dd>`;
    return x;

/*
   <div class="in">
		<dt>Numerius</dt>
		<dd class="typing">
			<div></div>
			<div></div>
			<div></div>
		</dd>
	</div>
 */
}

function addReadReceipt(){
    let x;
    //this says if the dropdown is an actual time unit, assign it to this constant
    const timeUnit =  $("#time-read-choose").val();

    switch (timeUnit){
        case "Add Time":
            x = $("#time-read").val();
            break;

        case "Add Custom Text":
            x =$("#custom-read").val();
            break;
        
        case "[Just Read Receipt]":
            x = "";
            break;

        default:
            x = timeUnit;
    }


    return `<dt class="read"><small>
<span class="screenreader">[</span>
Read ${x}<span class="screenreader">]</span>
</small></dt>`;


/*
<dt class="read"><b>Read</b> 5:55</dt>
*/
}


$(function() {
    fetch("CSS/imsg.txt").then(res => res.text()).then(text => {
        const contentDiv = document.getElementById("CSS-to-copy");
        contentDiv.textContent = text;
      });

    $('#add').on('click', function() {
        //compiles the whole code together as is currently
        
        var x;

        x = switchName();

        switch ($("#message-type").val()){
            case "Message":
                //checks if there is required input to add new text
                x = $("#input-text").val() ? x + addNewText() : x;
                break;

            case "Timestamp":
                x = x + addTimestamp();
                isChange = true;
                break;

            case "Image":
                //ensures there is required input to add image
                x = $("#input-link-text").val() ? x + addImage() : x;
                break;

            case "Link":
                //ensures there is required input to add link
                x = $("#input-link-text").val() ? x + addLink() : x;
                break;

            case "Typing Dots":
                x = x + addTypingDots();
                break;

        }
        //if read receipt checkbox checked, add it. if not, keep x the same
        const readReceipt = $('input[id="read-receipt-choose"]:checked').val() ? addReadReceipt() : "";
        x = x + readReceipt;

        x = prev + x;
        prev = x;

        x = addSurroundingDiv(x);

        $('#output-div').html(x);
        $('#html-output').text(x);
        
        

        //now to clear out everythings loll
        $('#input-text').val('');
        $('#input-link-text').val('');
        $('#input-secondary-text').val('');
        
        //timestamp ones
        $('#custom-timestamp').val('');
        $('#time-timestamp').val('');

        //read receipt ones
        $('#custom-read').val('');
        $('#time-read').val('');

    });


    $("#header-choose").on("click", function() {

        if( $('input[id="header-choose"]:checked').val() ){
            $("#header-div").show();
        }else{
            $("#header-div").hide();
        }

        //$("#header-name-div").toggle();
        //$("#dm-contact-name-divdiv").toggle();
    });

    $("#textbar-choose").on("click", function() {
        if( $('input[id="textbar-choose"]:checked').val() ){
            document.getElementById("textbar-div").style.display = "";
        }else{
             document.getElementById("textbar-div").style.display = "none";
        }
    });

    $("#timestamp-choose").on("click", function() {
        if( $("#timestamp-choose").val() == '[Custom Text]' ){
            $('#custom-timestamp-div').show();
            $('#time-timestamp-div').hide();
        }else if( $("#timestamp-choose").val() == '[Custom Time]' ){
            $('#custom-timestamp-div').hide();
            $('#time-timestamp-div').show();
        }else{
            $('#custom-timestamp-div').hide();
            $('#time-timestamp-div').hide();
        }

    });

    $("#read-receipt-choose").on("click", function() {
        if( $('input[id="read-receipt-choose"]:checked').val() ){
            $('#read-receipt-div').show();
        }else{
            $('#read-receipt-div').hide();
        }

    });

    $("#time-read-choose").on("click", function() {
        if( $("#time-read-choose").val() == 'Add Custom Text' ){
            $('#custom-read-receipt-div').show();
            $('#time-read-div').hide();
        }else if( $("#time-read-choose").val() == 'Add Time' ){
            $('#custom-read-receipt-div').hide();
            $('#time-read-div').show();
        }else{
            $('#custom-read-receipt-div').hide();
            $('#time-read-div').hide();
        }

    });

});
