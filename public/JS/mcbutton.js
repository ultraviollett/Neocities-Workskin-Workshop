function addText() {
    //updates whenever text is updated, adds text to inside button
    const x = document.getElementById("buttontext").value;
    
    //adds HTML to be copied to textarea
    const fullThing = `<div class="mcbuttondiv">
<p class="screenreader" align="center">
<small> -- Minecraft Button: -- </small>
</p><hr />
<p align="center">
${x}
</p><hr />
</div>
`;    $("#output-div").html(fullThing);
    document.getElementById("html-output").value = fullThing;
}

//textarea is CSS-to-copy
$(function() {

    fetch("CSS/mcbutton.txt").then(res => res.text()).then(text => {
        const contentDiv = document.getElementById("CSS-to-copy");
        contentDiv.textContent = text;
      });
});