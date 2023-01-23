//enabling strict

"use strict";

// init function

(function () {
    window.addEventListener("load", init);

    //helper functions

    function QS(selector) {
        return document.querySelector(selector);
    }

    function QSA(selector) {
        return document.querySelectorAll(selector);
    }

    function ID(id) {
        return document.getElementById(id);
    }

    function CLASS(className) {
        return document.getElementsByClassName(className);
    }

    function TAGNAME(tagName) {
        return document.getElementsByTagName(tagName);
    }

    //static task data

    let tasks = [
        {
            id: 0,
            title: "Doing Laundary",
            dueDate: new Date(2022, 9, 29),
            completed: false,
            completeDate: null,
            createdDate: new Date(2022, 9, 10),
            deleted: false,
            note: "I need to get quarters first at Kroger.",
        },
        {
            id: 1,
            title: "5774 Assignment 3",
            dueDate: new Date(2022, 9, 28),
            completed: false,
            completeDate: null,
            createdDate: new Date(2022, 9, 10),
            deleted: false,
            note: "I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot.",
        },
        {
            id: 2,
            title: "Getting AAA batteries",
            dueDate: null,
            completed: true,
            completeDate: new Date(2022, 9, 12),
            createdDate: new Date(2022, 9, 10),
            deleted: false,
            note: "for my remote control.",
        },
        {
            id: 3,
            title: "Booking a flight ticket ACM UIST conference",
            dueDate: new Date(2022, 9, 15),
            completed: false,
            completeDate: null,
            createdDate: new Date(2022, 9, 12),
            deleted: false,
            note: "I would have to book a flight ticket to ACM UIST conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the COVID19 outbreak. :( Although flight tickets are getting cheaper.",
        },
    ];

    //Global button
    let deleteFinishedTasksButton;
    let overDueButton;

    //individual functions for each column

    //build checbox
    const buildCheckBox = function (index) {
        let tdELEMCheckBox = document.createElement("td");

        tdELEMCheckBox.classList.add("text-center");

        let checkBox = document.createElement("INPUT");

        checkBox.setAttribute("type", "checkbox");

        checkBox.classList.add("form-check-input");

        checkBox.setAttribute("value", index);

        if (tasks[index].completed == true) {
            checkBox.checked = true;
        } else {
            checkBox.checked = false;
        }

        tdELEMCheckBox.appendChild(checkBox);
        return tdELEMCheckBox;
    };

    //build task
    const buildTask = function (index) {
        let tdELEMTask = document.createElement("td");

        tdELEMTask.classList.add("text-center");

        //truncating the lenght if length > 25
        let title = tasks[index].title;

        if (title.length > 25) {
            title = title.substring(0, 25) + "...";
        }

        if (tasks[index].completed == true) {
            tdELEMTask.innerHTML = `<del>${title}</del>`;
        } else {
            tdELEMTask.innerHTML = title;
        }
        return tdELEMTask;
    };

    //build note
    const buildNote = function (index) {
        let note = document.createElement("td");

        note.classList.add("text-center");

        let span = document.createElement("SPAN");

        span.classList.add("text-right");

        let btn = document.createElement("button");

        btn.classList.add("btn", "btn-xs", "btn-warning");

        let ielement = document.createElement("i");

        ielement.classList.add("bi", "bi-caret-down");

        let textElem = document.createTextNode("Note");

        btn.setAttribute("data-bs-toggle", "collapse");

        btn.setAttribute("data-bs-target", `#note-${index}`);

        btn.appendChild(ielement);

        btn.appendChild(textElem);

        span.appendChild(btn);

        note.appendChild(span);

        return note;
    };

    //build notedropdownelement
    const buildNoteDropDownElement = function (index) {
        let noteElement = document.createElement("td");

        noteElement.setAttribute("colspan", 5);

        const cardElement = document.createElement("div");

        cardElement.classList.add("card");

        const cardBodyElement = document.createElement("div");

        cardBodyElement.classList.add("card-body");

        const noteHElem = document.createElement("h3");

        noteHElem.appendChild(document.createTextNode(tasks[index].title));

        const infoElem = document.createElement("div");

        infoElem.innerHTML = tasks[index].note;

        cardBodyElement.appendChild(noteHElem);

        cardBodyElement.appendChild(infoElem);

        cardElement.appendChild(cardBodyElement);

        noteElement.appendChild(cardElement);

        return noteElement;
    };

    //build duedate
    const buildDueDate = function (index) {
        let dueDateElement = document.createElement("td");

        dueDateElement.classList.add("text-center");

        if (tasks[index].dueDate == null) {
            dueDateElement.innerHTML = "";
        } else {
            dueDateElement.innerHTML =
                tasks[index].dueDate.getMonth() +
                1 +
                "/" +
                tasks[index].dueDate.getDate() +
                "/" +
                tasks[index].dueDate.getFullYear();
        }

        return dueDateElement;
    };

    //build completedate
    const buildCompleteDate = function (index) {
        let completeDateElemenent = document.createElement("td");

        completeDateElemenent.classList.add("text-center");

        if (tasks[index].completeDate == null) {
            completeDateElemenent.innerHTML = "";
        } else {
            completeDateElemenent.innerHTML =
                tasks[index].completeDate.getMonth() +
                1 +
                "/" +
                tasks[index].completeDate.getDate() +
                "/" +
                tasks[index].completeDate.getFullYear();
        }
        return completeDateElemenent;
    };

    //build tools buttons
    const buildTools = function (index) {
        let gapBtns = "     ";
        let toolsElement = document.createElement("td");
        let deleteButton = document.createElement("button");
        let delIcon = document.createElement("i");
        let mailIcon = document.createElement("i");
        let anchorElem = document.createElement("a");
        let emailBtnElem = document.createElement("button");

        toolsElement.classList.add("text-center");

        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("btn", "btn-danger", "btn-xs", "deletetask");
        deleteButton.setAttribute("alt", "Delete the task");
        deleteButton.setAttribute("value", index);

        delIcon.classList.add("bi", "bi-trash");

        deleteButton.appendChild(delIcon);

        anchorElem.setAttribute("target", "_blank");
        anchorElem.href =
            "mailto:?body=" + tasks[index].note + "&subject=" + tasks[index].title;

        emailBtnElem.setAttribute("type", "button");
        emailBtnElem.classList.add("btn", "btn-danger", "btn-xs", "emailtask");
        emailBtnElem.setAttribute("alt", "Send an email");
        emailBtnElem.setAttribute("value", index);

        mailIcon.classList.add("bi", "bi-envelope");

        emailBtnElem.appendChild(mailIcon);
        anchorElem.appendChild(emailBtnElem);
        toolsElement.appendChild(deleteButton);
        toolsElement.appendChild(document.createTextNode(gapBtns));
        toolsElement.appendChild(anchorElem);

        return toolsElement;
    };

    //The main renderPage function that creates the tasks table

    const createTable = function () {
        let tbody = TAGNAME("tbody")[0];
        tbody.innerHTML = "";

        for (let i = 0; i < tasks.length; i++) {
            //skipping if element is deleted
            if (tasks[i].deleted == true) {
                continue;
            }

            // if overdue state is on, displaying only overdue open tasks
            overDueButton = ID("overdue");
            if (overDueButton.classList.contains("active")) {
                if (
                    !(
                        tasks[i].completed != true &&
                        tasks[i].dueDate != null &&
                        new Date() >= tasks[i].dueDate
                    )
                ) {
                    continue;
                }
            }

            //creating row element
            const trELEM = document.createElement("tr");
            trELEM.setAttribute("id", i);

            //creating column elements for each row
            let tdELEMCheckBox = buildCheckBox(i);

            let tdELEMTask = buildTask(i);

            let tdELEMNote = buildNote(i);

            let tdELEMDueDate = buildDueDate(i);

            let tdELEMCompleteDate = buildCompleteDate(i);

            let tdELEMTools = buildTools(i);

            //adding column elements to row
            trELEM.appendChild(tdELEMCheckBox);

            trELEM.appendChild(tdELEMTask);

            trELEM.appendChild(tdELEMNote);

            trELEM.appendChild(tdELEMDueDate);

            trELEM.appendChild(tdELEMCompleteDate);

            trELEM.appendChild(tdELEMTools);

            //adding style when the due date is past present date
            if (tasks[i].dueDate != null && new Date() > tasks[i].dueDate) {
                trELEM.classList.add("table-danger");
            }

            //checking completness and adding the style accordingly
            if (tasks[i].completed == true) {
                trELEM.classList.remove("table-danger");
                trELEM.classList.add("table-success");
            }

            //adding the note drop down elements
            let noteExpandElement = document.createElement("tr");
            let noteDropDownElement = buildNoteDropDownElement(i);

            noteExpandElement.setAttribute("id", `note-${i}`);
            noteExpandElement.classList.add("collapse");
            noteExpandElement.appendChild(document.createElement("td"));
            noteExpandElement.appendChild(noteDropDownElement);

            //adding both rows element to tbody
            tbody.appendChild(trELEM);
            tbody.appendChild(noteExpandElement);
        }
    };

    //Event handler functions

    //handling checkbox element
    const handleCheckBox = function () {
        let checkboxElems = QSA("input[type='checkbox']");
        let finishedTasks = 0;
        for (let i = 0; i < checkboxElems.length; i++) {
            checkboxElems[i].addEventListener("click", function (event) {
                if (event.target.checked) {
                    finishedTasks++;
                    console.log("if value :" + finishedTasks + " ");
                    //console.log("checked");
                    tasks[checkboxElems[i].value].completed = true;
                    tasks[checkboxElems[i].value].completeDate = new Date();
                } else {
                    finishedTasks--;
                    console.log("else value :" + finishedTasks + " ");
                    //console.log("unchecked");
                    tasks[checkboxElems[i].value].completed = false;
                    tasks[checkboxElems[i].value].completeDate = null;
                }
                renderPage();
            });
            if (
                tasks[checkboxElems[i].value].completed == true &&
                tasks[checkboxElems[i].value].deleted == false
            ) {
                finishedTasks++;
            }
        }

        deleteFinishedTasksButton = ID("deleteCompletedTasks");
        console.log("outside value :" + finishedTasks + " ");
        deleteFinishedTasksButton.disabled = finishedTasks == 0 ? true : false;
    };

    //handling delete button
    const handleDeleteEachTask = function () {
        let deleteButtons = CLASS("deletetask");
        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", function () {
                if (window.confirm("Are you sure?")) {
                    tasks[deleteButtons[i].value].deleted = true;
                }
                renderPage();
            });
        }
    };

    //outside buttons functionality

    const deleteFinishedTasks = function (deleteFinishedTasksButton) {
        deleteFinishedTasksButton.addEventListener("click", function (event) {
            deleteFinishedTasksHelper(event, deleteFinishedTasksButton);
        });
    };

    const deleteFinishedTasksHelper = function (
        event,
        deleteFinishedTasksButton
    ) {
        let finishedTasks = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed == true) {
                finishedTasks++;
            }
        }

        if (finishedTasks == 0) {
            deleteFinishedTasksButton.disabled = true;
        }

        if (window.confirm(`Do you want to delete ${finishedTasks} tasks`)) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].completed == true) {
                    tasks[i].deleted = true;
                }
            }
        }
        renderPage();
    };

    const showOverDueTasks = function (overDueButton, deleteFinishedTasksButton) {
        overDueButton.addEventListener("click", function () {
            showOverDueTasksHelper(overDueButton, deleteFinishedTasksButton);
        });
    };

    const showOverDueTasksHelper = function (
        overDueButton,
        deleteFinishedTasksButton
    ) {
        console.log(overDueButton.classList.contains("active"));
        if (overDueButton.classList.contains("active")) {
            overDueButton.classList.remove("active");
            deleteFinishedTasksButton.disabled = false;
        } else {
            overDueButton.classList.add("active");
            deleteFinishedTasksButton.disabled = true;
        }
        renderPage();
    };

    const addNewTaskHelper = function (event, taskTitle, taskDueDate, taskNote) {
        if (taskTitle == "") {
            window.alert("Task title is required");
            return false;
        }

        if (taskDueDate != "") {
            if (isNaN(Date.parse(taskDueDate))) {
                window.alert("Please check the date format");
                return false;
            }
            taskDueDate = new Date(taskDueDate);
        } else {
            taskDueDate = null;
        }

        taskNote = taskNote.replace(/\r\n|\r|\n/g, " <br/> ");

        tasks.push({
            id: tasks.length,
            title: taskTitle,
            dueDate: taskDueDate,
            completed: false,
            completeDate: null,
            createdDate: new Date(),
            deleted: false,
            note: taskNote,
        });
        event.preventDefault();
        return true;
    };

    const addNewTaskFunction = function () {
        let taskTitleElement = ID("task-title");
        let taskTitle = "";

        let taskDueDateElement = ID("due-date");
        let taskDueDate = "";

        let taskNoteElement = ID("task-note");
        let taskNote = "";

        let modalElement = ID("addTaskModal");

        let addTaskButton = CLASS("addtask")[0];

        taskTitleElement.addEventListener("input", function (event) {
            taskTitle = event.target.value;
        });

        taskDueDateElement.addEventListener("input", function (event) {
            taskDueDate = event.target.value;
        });

        taskNoteElement.addEventListener("input", function (event) {
            taskNote = event.target.value;
        });

        let formSubmitButton = QS("form button[type=submit]");

        formSubmitButton.addEventListener("click", function (event) {
            let success = addNewTaskHelper(event, taskTitle, taskDueDate, taskNote);
            event.preventDefault();
            if (success == true) {
                taskTitleElement.value = "";
                taskDueDateElement.value = "";
                taskNoteElement.value = "";
                taskTitle = "";
                taskDueDate = "";
                taskNoteElement = "";
                bootstrap.Modal.getInstance(modalElement).hide();
            }
            renderPage();
        });

        // addTaskButton.addEventListener("click", function (event) {
        //   taskTitleElement.value = "";
        //   taskDueDateElement.value = "";
        //   taskNoteElement.value = "";
        //   taskTitle = "";
        //   taskDueDate = "";
        //   taskNoteElement = "";
        // });
        cancelButton.addEventListener("click", (event) => {
            console.log("cancel button clicked");
            todoItemTitleField.value = "";
            todoItemDueDateField.value = "";
            todoItemNoteField = "";
            bootstrap.Modal.getInstance(
                document.getElementById("addTaskModal")
            ).hide();
            event.preventDefault();
        });
    };

    //main renderPage function which loads the data dynamically without reloading the page
    const renderPage = function () {
        // Main function that created the table
        createTable();

        // All event handler functions for changes inside the table
        handleCheckBox();
        handleDeleteEachTask();
    };

    // This function gets exectued when the page is loaded
    function init() {
        //renderPage function
        renderPage();

        //outside buttons event listeners
        deleteFinishedTasks(deleteFinishedTasksButton);
        /////////////////////////////
        deleteFinishedTasksButton.addEventListener("click", function (event) {
            deleteFinishedTasksHelper(event, deleteFinishedTasksButton);
        });
    };

    // const deleteFinishedTasksHelper = function (
    //     event,
    //     deleteFinishedTasksButton
    // ) {
        let finishedTasks = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed == true) {
                finishedTasks++;
            }
        }

        if (finishedTasks == 0) {
            deleteFinishedTasksButton.disabled = true;
        }

        if (window.confirm(`Do you want to delete ${finishedTasks} tasks`)) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].completed == true) {
                    tasks[i].deleted = true;
                }
            }
        // }
        renderPage();

        ////////////////////////////////
        showOverDueTasks(overDueButton, deleteFinishedTasksButton);

        //handling the new task button
        addNewTaskFunction();
    }
})();
