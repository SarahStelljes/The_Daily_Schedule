var tasks = [];

// display the date function
var getDate = function(){
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
var loadDailyTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if there are no tasks in storage...
    if(!tasks){
        tasks = {
            AM_9: [],
            AM_10: [],
            AM_11: [],
            PM_12: [],
            PM_1: [],
            PM_2: [],
            PM_3: [],
            PM_4: [],
            PM_5: []
        };
    }
};

loadDailyTasks();
getDate();
setInterval(function(){
    getDate();
}, (1000 * 60) * 10);