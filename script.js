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
});
