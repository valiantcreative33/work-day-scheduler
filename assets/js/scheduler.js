// scheduler javascript

var tasks = [];
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = [{
            time: "",
            task: ""
        }]
    } 
    
    // fills null array indices 
    for (var i = 0; i < tasks.length; i++) {
        if (!tasks[i]) {
            tasks[i] = {
                time: "",
                task: ""
            }
        }
    }
    tasks.forEach(function(task) {
        addTask(task.time, task.task);
    })
}

var addTask = function(taskTime, taskText) {
    var taskItem = $("<p>").addClass("m-2 task-item").text(taskText)

    $("#hr-" + taskTime).find(".time-block").append(taskItem)
}
var saveTasks = function(event) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// edit task item on click
$(".time-slot").on("click", ".time-block", function() {
    var text = $(this).text().trim();
    var textInput = $("<textarea>")
        .addClass("col-10 form-control")
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus")
});

// save button function
$(".save-btn").on("click", function() {
    var textArea = $(this).closest(".time-slot").find(".form-control")

    // updates task text
    var text = textArea.val().trim();

    var taskP = $("<div>")
        .addClass("col-10 time-block")
        .html("<p class='m-2 task-item'>" + text + "</p>");

    textArea.replaceWith(taskP);

    // updates tasks array
    var index = $(this).closest(".time-slot").index();
    
    var taskTime = $(this)
        .closest(".time-slot")
        .attr("id")
        .replace("hr-", "");
    var taskObj = {
        time: taskTime,
        task: text
    }
    tasks[index] = taskObj;
    saveTasks();
    auditTime();
})
var auditTime = function() {
    var currentHr = moment().hour();
    for (i = 9; i < 18; i++) {
        var timeSlotEl = $("#hr-" + i).find(".time-block");
        timeSlotEl.removeClass("past present future");
        if (currentHr < i) {
            timeSlotEl.addClass("future");
        }
        else if (currentHr > i) {
            timeSlotEl.addClass("past");
        }
        else {
            timeSlotEl.addClass("present");
        }
    }
}

// clear scheduler
$(".reset-btn").on("click", function() {
    localStorage.clear();
    $(".task-item").remove(); 
});

// displays current time
$("#currentDay").text(moment().format("h:mm A on dddd, MMMM D, YYYY"))
setInterval(function() {
    $("#currentDay").text(moment().format("h:mm A on dddd, MMMM D, YYYY"))
}, 60000)
setInterval(auditTime, 300000); 
loadTasks();
auditTime();