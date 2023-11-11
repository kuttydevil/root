$(document).ready(function() {
  // Load the employees from the JSON file
  $.getJSON("employees.json", function(employees) {
    // Display the employees on the page
    $("#employees").html("");
    for (var i = 0; i < employees.length; i++) {
      var employee = employees[i];
      var html = "<p>" + employee.qid + " - " + employee.expiry_date + "</p>";
      $("#employees").append(html);
    }
  });

  // Add an employee to the JSON file
  $("#add-employee-form").submit(function(event) {
    event.preventDefault();

    var qid = $("#add-employee-form input[name='qid']").val();
    var expiry_date = $("#add-employee-form input[name='expiry_date']").val();

    // Add the employee to the JSON file
    $.ajax({
      url: "employees.json",
      type: "POST",
      data: JSON.stringify({
        qid: qid,
        expiry_date: expiry_date
      }),
      contentType: "application/json",
      success: function() {
        // Reload the employees from the JSON file
        $.getJSON("employees.json", function(employees) {
          // Display the employees on the page
          $("#employees").html("");
          for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];
            var html = "<p>" + employee.qid + " - " + employee.expiry_date + "</p>";
            $("#employees").append(html);
          }
        });
      }
    });
  });

  // Edit an employee's expiry date
  $("#employees p").click(function() {
    var qid = $(this).text().split(" - ")[0];

    // Open a modal dialog to edit the expiry date
    $("#edit-employee-modal").modal("show");

    // Set the QID of the employee to edit
    $("#edit-employee-modal input[name='qid']").val(qid);

    // Load the current expiry date of the employee
    $.getJSON("employees.json", function(employees) {
      var employee = employees.find(function(employee) {
        return employee.qid === qid;
      });

      $("#edit-employee-modal input[name='expiry_date']").val(employee.expiry_date);
    });
  });

  // Save the employee's expiry date
  $("#edit-employee-modal form").submit(function(event) {
    event.preventDefault();

    var qid = $("#edit-employee-modal input[name='qid']").val();
    var expiry_date = $("#edit-employee-modal input[name='expiry_date']").val();

    // Update the employee's expiry date in the JSON file
    $.ajax({
      url: "employees.json",
      type: "PUT",
      data: JSON.stringify({
        qid: qid,
        expiry_date: expiry_date
      }),
      contentType: "application/json",
      success: function() {
        // Reload the employees from the JSON file
        $.getJSON("employees.json", function(employees) {
          // Display the employees on the page
          $("#employees").html("");
          for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];
            var html = "<p>" + employee.qid + " - " + employee.expiry_date + "</p>";
            $("#employees").append(html);
          }
        });

        // Close the modal dialog
        $("#edit-employee-modal").modal("hide");
      }
    });
  });
});
