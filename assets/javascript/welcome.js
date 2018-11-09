var user = [];
//get user info and store locally
$("#button-submit").on("click", function(event) {
    event.preventDefault();
    var userName = $("#input-username").val().trim();
    var firstName = $("#input-firstname").val().trim();
    var lastName = $("#input-lastname").val().trim();

    localStorage.setItem("user", userName);
    localStorage.setItem("first", firstName);
    localStorage.setItem("last", lastName);
    
    window.location.href = "welcome.html";
 });

//click on api buttons to show or hide update button if its the owner or not
 $(".classApi").on("click", function(event){
    var checker = $(this).attr("owner");
    if(localStorage.getItem("user") === checker){
        $("#upd-button").hide();
        $("#del-button").hide();
    }
    else{
        $("#upd-button").show();
        $("#del-button").show();  
    }
 });

 $("#api_search").on("click", function(event){
    window.location.href= "search.html" ;
 });
 
//when page loads, check localSorage for user if it has any input or not
 window.onload = function(){
    if(localStorage.user) {
        // this will only work if the token is set in the localStorage
        $("h3").text("Welcome Back " + localStorage.user);
        $("#input-username").hide();
        $("#input-firstname").hide();
        $("#input-lastname").hide();
        $("label").hide();
        $("#button-submit").hide();
    }
 }
 