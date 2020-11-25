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

// calendar datepicker
$( function() {
    $( "#datepicker" ).datepicker();
  } );

var addTask = function(taskTime, taskText) {
    var taskItem = $("<p>").addClass("m-2").text(taskText)

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
$(".saveBtn").on("click", function() {
    var textArea = $(this).closest(".time-slot").find(".form-control")

    // updates task text
    var text = textArea.val().trim();
    var taskP = $("<div>")
        .addClass("col-10 time-block")
        .html("<p class='m-2'>" + text + "</p>");

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
})

loadTasks();