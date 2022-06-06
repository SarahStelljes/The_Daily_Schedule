// tasks array
var tasks = [];

var hourNum = document.querySelectorAll(".time-block");


// display the date function
var displayDate = function(){
    // get the date using moment.js
    var getDate = moment().format('dddd, MMMM Do YYYY');

    // add the string to the id in the html
    $("#currentDay").first().html(getDate);

};

// load the tasks from storage
var loadDailyTasks = function(){
    var taskInStorage = JSON.parse(localStorage.getItem("theDailySchedule-tasks"));
    // if there are no tasks in storage...
    if(!taskInStorage){
        tasks = [];
    }
    // if there are tasks in storage...
    else{
        // set tasks equal to the items in storage
        tasks = taskInStorage;
        // for however many time blocks there are in the html...
        for(var i = 0; i < hourNum.length; i++){
            // get the number of what the
            var v = i + 9;
            var theTime = "hour-"+v;
            for(var e = 0; e < tasks.length; e++){
                if(tasks[e].time === theTime){
                    $("#"+theTime+" .description").val(tasks[e].value);
                }
            }
        }
    }
};

var saveTasks = function(){
    $(".saveBtn").on("click", function(){
        // creating an object to save
        var savingTask = {
            time: $(this).parent().attr("id"),
            day: moment().year()+"/"+moment().month()+"/"+ moment().date(),
            value: $(this).siblings(".description").val()
        };

        // iterates through the tasks array
        for(var i = 0; i < tasks.length; i++){
            // if the tasks array already has the same time, delete it
            if(savingTask.time === tasks[i].time){
                var removeTask = tasks.indexOf(tasks[i].time, 0);
                tasks.splice(removeTask, 1);
            }
        }

        tasks.push(savingTask);
        localStorage.clear();
        localStorage.setItem("theDailySchedule-tasks", JSON.stringify(tasks));
    });
};

var updateHour = function(){
    $(".time-block").each(function(){
        var currentHour = moment().hours();
        var hourBlock = parseInt(
            $(this)
            .attr("id")
            .split("-")[1]
        );
        if(hourBlock < currentHour){
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        }
        else if(hourBlock === currentHour){
            $(this).removeClass("future")
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
loadDailyTasks();
displayDate();
saveTasks();

setInterval(function(){
    displayDate();
    updateHour();
    console.log("updated");
}, (1000 * 60) * 10);