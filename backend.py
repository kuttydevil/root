from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route("/login", methods=["POST"])
def login():
  email = request.json["email"]
  password = request.json["password"]

  # Validate the email and password

  if email == "kuttydevilz@gmail.com" and password == "password":
    return jsonify({
      "message": "Login successful."
    })
  else:
    return jsonify({
      "error": "Invalid email or password."
    })

@app.route("/update-profile", methods=["GET", "POST"])
def update_profile():
  if request.method == "GET":
    # Get the employee data from the JSON file
    with open("employees.json", "r") as f:
      employees = json.load(f)

    # Get the employee's email address
    email = request.args.get("email")

    # Find the employee in the JSON file
    employee = next(e for e in employees if e["Employee Email"] == email)

    return jsonify(employee)
  else:
    # Update the employee's data in the JSON file
    with open("employees.json", "w") as f:
      employees = json.load(f)

    # Get the employee's data from the request
    employee_data = request.json

    # Find the employee in the JSON file
    employee = next(e for e in employees if e["Employee Email"] == employee_data["Employee Email"])

    # Update the employee's data
    employee.update(employee_data)

    # Save the updated JSON file
    json.dump(employees, f, indent=4)

    return jsonify({
      "message": "Profile updated successfully."
    })

if __name__ == "__main__":
  app.run(debug=True)
