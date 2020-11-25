// scheduler javascript

var tasks = [];

var saveTasks = function(event) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

$(".time-slot").on("click", ".time-block", function() {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("col-10 form-control").val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus")
});

// save button function
$(".saveBtn").on("click", function() {
    var textArea = $(this).closest(".time-slot").find(".form-control")

    // updates task text
    var text = textArea.val().trim();
    var taskP = $("<div>").addClass("col-10 time-block").text(text);
    textArea.replaceWith(taskP);

    // updates tasks array
    var index = $(this).closest(".time-slot").index();

    var taskTime = $(this).closest(".time-slot").attr("id");
    var taskObj = {
        time: taskTime,
        task: text
    }

    tasks[index] = taskObj;
    saveTasks();
})

// loadTasks;