// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIMUTrI21xr6S3raX4U_o3opClC5T9FrI",
    authDomain: "api-exploration-838a6.firebaseapp.com",
    databaseURL: "https://api-exploration-838a6.firebaseio.com",
    projectId: "api-exploration-838a6",
    storageBucket: "api-exploration-838a6.appspot.com",
    messagingSenderId: "526245276523"
  };

firebase.initializeApp(config);
var database = firebase.database();

var topicInit = [
    {
      name: "NYtimes"
    , description: "NYtimes"
    , owner: "Gilles"     
    , authors: ""
    , docurl: "www"
    , url: "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    , param: "&q=trump&facet_field=source&begin_date=20180101&end_date=20181231"
    , sample: "file:///Users/gillesleroy/Documents/Gilles/UCB/06-%20API%20and%20AJAX/Day-02/09-ClickJSON/Unsolved/nytimes-4.html"
    }
];
// database.ref().set({
//     apis: topicInit
//     });  
var topics = [];
var apiIndex = -1;
  var namesInit = [{
    name: "dummy"
  , value: ""
  }];
  var names = [];

function isValid(inputVal)
{
    var isGood = true;
    if (inputVal.trim() != "" )
    {
      for (var i=0;i<topics.length;i++)
      {
       //   alert("array index="+i);
          if(topics[i].name.toLowerCase() === inputVal.toLowerCase())
          {
            isGood = false;
            break;
          }
      }
    }  
    else
    {
        isGood = false;
    }   
return (isGood);
}

function displayApiInfo(apiNameVal) {
    // var limit = 10;
   // var apiName = $(this).attr("api-name");
    // var apiName = $(this).attr("api-name");
//     var apiDescription = $(this).attr("api-description");
//   //  var apiOwner = $(this).attr("api-owner");
//     var apiAuthors = $(this).attr("api-authors");
//     var apiDocurl = $(this).attr("api-docurl");
//     var apiURL = $(this).attr("api-url");
//     var apiParam = $(this).attr("api-param");   
//     var apiSample = $(this).attr("api-sample");   
//     apiIndex = $(this).attr("api-index"); 
    var isFound = false;
    for (var i=0;i<topics.length;i++)
    {
        if (topics[i].name === apiNameVal)
        {
        var apiName = topics[i].name;
        var apiDescription = topics[i].description;
    //  var apiOwner = $(this).attr("api-owner");
        var apiAuthors = topics[i].authors;
        var apiDocurl = topics[i].docurl;
        var apiURL =topics[i].url;
        var apiParam = topics[i].param;   
        var apiSample = topics[i].sample;   
        apiIndex = i;
        isFound = true;
        break;
        }
    }
    if (isFound === false){
        apiIndex = -1;
    } 
    // var apiKey = $("#input-key").val().trim();
   
    names = JSON.parse(localStorage.getItem("names"));
    if (names === null)
    {
        names = namesInit;
        console.log(names[0].name);
    }
    for (var i=0;i<names.length;i++)
    {
        if (names[i].name === apiName)
        {
            var apiKey = names[i].value;
            break;
        }
    }
  
    $("#input-name").val(apiName);
    $("#input-description").val(apiDescription);
  //  $("#input-owner").val(apiOwner);
    $("#input-authors").val(apiAuthors);
    $("#input-docurl").val(apiDocurl);
    $("#input-url").val(apiURL);
    $("#input-param").val(apiParam);
    $("#input-sample").val(apiSample);
    $("#input-key").val(apiKey);
    $("#frameSample").attr("src",apiSample);
    // console.log(apiURL);
    // console.log(apiKey);
    // console.log(apiParam);
    // console.log(queryURLnew);
  };

  $("#add-button").on("click", function(event) {
    event.preventDefault();
    var apiName = $("#input-name").val().trim();
    var apiDescription = $("#input-description").val().trim();
    var apiOwner = localStorage.user; 
    var apiAuthors = $("#input-authors").val().trim();
    var apiDocurl = $("#input-docurl").val().trim();
    var apiUrl = $("#input-url").val().trim();
    var apiParam = $("#input-param").val().trim();
    var apiSample = $("#input-sample").val().trim();
    var apiKey = $("#input-key").val().trim();
    if (isValid(apiName))
    {
        $("#errorMsg").empty();
        names = JSON.parse(localStorage.getItem('names'));
        if (names === null)
        {
            names = namesInit;
            console.log(names[0].name);
        }

        topics.push({name: apiName 
                   , description: apiDescription
                   , owner: apiOwner
                   , authors: apiAuthors
                   , docurl: apiDocurl
                   , url: apiUrl
                   , param: apiParam
                   , sample: apiSample
                }); 
        // topics[0].name = apiName;
        database.ref().set({
        apis: topics
        });           
       // renderButtons(topics);
        names.push({name: apiName,
                    value: apiKey 
              });
        localStorage.setItem('names', JSON.stringify(names));       
        // $("#input-name").val("");
        // $("#input-description").val("");
        // //$("#input-owner").val("");
        // $("#input-authors").val("");
        // $("#input-docurl").val("");
        // $("#input-url").val("");
        // $("#input-param").val("");
        // $("#input-sample").val("");
        // $("#input-key").val("");
    }
    else{
        $("#errorMsg").html("<h2>"+"API NAME ALREADY EXISTS!!!!"+"</h2>");
    }
});

$("#upd-button").on("click", function(event) {
    event.preventDefault();
    var apiName = $("#input-name").val().trim();
    var apiDescription = $("#input-description").val().trim();
    //var apiOwner = $("#input-owner").val().trim();
    var apiOwner = localStorage.user;
    
    var apiAuthors = $("#input-authors").val().trim();
    var apiDocurl = $("#input-docurl").val().trim();   
    var apiUrl = $("#input-url").val().trim();
    var apiParam = $("#input-param").val().trim();
    var apiSample = $("#input-sample").val().trim();
    var apiKey = $("#input-key").val().trim();
    var isFound = false;
    // if (isValid(apiName))
    // {
        names = JSON.parse(localStorage.getItem('names'));
        if (names === null)
        {
            names = namesInit;
            // console.log(names[0].name);
        }

        topics[apiIndex].description = apiDescription;
        topics[apiIndex].owner = apiOwner;
        topics[apiIndex].authors = apiAuthors;
        topics[apiIndex].docurl = apiDocurl;
        topics[apiIndex].url = apiUrl;
        topics[apiIndex].param = apiParam;
        topics[apiIndex].sample = apiSample;
        // topics.push({name: apiName 
        //            , url: apiUrl
        //            , param: apiParam
        //            , sample: apiSample
        //         }); 
        // topics[0].name = apiName;
        database.ref().set({
                            apis: topics
                            });           
        // renderButtons(topics);
        // names[apiIndex+1].name;
        for (var i=0;i<names.length;i++)
        {
            if (names[i].name === apiName)
            {
                names[i].value = apiKey;
                isFound = true;
                break;
            }
        }        
        if (!isFound){
            names.push({name: apiName,
                        value: apiKey 
                });
        }

        localStorage.setItem('names', JSON.stringify(names));       
 });

 $("#del-button").on("click", function(event) {
    event.preventDefault();
    // alert("This button is disabled for now");
    // alert("apiIndex="+apiIndex);
    if (apiIndex !=-1 && apiIndex != "")
    {
        var apiName = $("#input-name").val().trim();
        names = JSON.parse(localStorage.getItem('names'));
        if (names === null)
        {
            names = namesInit;
            // console.log(names[0].name);
        }
        topics.splice(apiIndex,1);
        database.ref().set({
                            apis: topics
                            });           
        for (var i=0;i<names.length;i++)
        {
            if (names[i].name === apiName)
            {
                names.splice(i,1);
                break;
            }
        }        
        localStorage.setItem('names', JSON.stringify(names));       
    }
    else {
        alert("There is no index defined for deletion");
    }
});

function getUrlParam(param)
{
    var url = window.location.search.substring(1);
    var urlVar = url.split('&');
    // alert("urlVar="+urlVar);
    for (var i = 0; i < urlVar.length; i++) 
        {
            var urlParam = urlVar[i].split('=');
            if (urlParam[0] == param) 
            {
                return urlParam[1];
            }
        }   
}

database.ref().on("value", 
function(snapshot) {
    // console.log(snapshot.val());
    topics = snapshot.val().apis; 
    // console.log(topics[0].name);    
    displayApiInfo(getUrlParam("p_apiname"));
    // renderButtons(topics);
    //  renderButtons(snapshot.val().names);
    },

    function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });

// $( document ).ready(function() {
//     // console.log( "ready!" );
//     // alert(getUrlParam("p_apiname"));

//     // alert(getUrlParam(topics[0].name));
//     displayApiInfo(getUrlParam("p_apiname"));
//  });

// $(document).on("click", ".classApi", displayApiInfo);