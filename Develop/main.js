var tasks = [];
// var date = new Date();
// var year = date.getFullYear();
// var month = date.getMonth();
// var day = date.getDate();

// var date = ((''+day).length<2 ? '0':'')

// display the date function
var displayDate = function(){
    // get the current date
    var d = new Date();

    // get the year of current date
    var year = d.getFullYear();
    // get the month name of current date
    var month = d.toLocaleString("default", {month: "long"});
    // get the weekday name of current date
    var weekDay = d.toLocaleString("default", {weekday: "long"});
    // get the date of the current day in numerical form
    var day = d.getDay();
 
    // add it all together to make a string
    var currentDate = weekDay +", "+month+" "+day+", "+year;

    // add the string to the id in the html
    $("#currentDay").first().html(currentDate);
};

// load the tasks from storage
var loadDailyTasks = function(event){

    tasks = JSON.parse(localStorage.getItem(".description"));

    // if there are no tasks in storage...
    if(!tasks){
        tasks = [];
    }

    // loop over object properties
    // $(".time-block").each(tasks, function(){
    //     console.log(tasks);
    // });
    
};

$("#hour-9 .description").val(localStorage.getItem("hour-9"));

var saveTasks = function(){
    $(".save-btn").on("click", function(){
        var value = $(this)
        .siblings(".description")
        .val();

        var time = $(this)
        .parent()
        .attr("id");
        localStorage.setItem(time, value);
    });
};

var updateHour = function(){
    var currentHour = moment().hours();
    $(".time-block").each(function(){
        var hourBlock = parseInt(
            $(this)
            .attr("id")
            .split("-")[1]
        );
        if(hourBlock < currentHour){
            $(this).addClass("past");
        }
        else if(hourBlock === currentHour){
            $(this).removeClass("past");
            $(this).addClass("present");
        }
        else{
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
}

updateHour();

// var date = new Date();
// var time = ;
// var time = moment(date, "L").set("hour", date.getHours)
// console.log(date.getHours());

// loadDailyTasks();
displayDate();
saveTasks();
// createTimeBlocks();

setInterval(function(){
    displayDate();
    updateHour();
}, (1000 * 60) * 10);