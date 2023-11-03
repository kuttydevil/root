from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route("/send-email", methods=["POST"])
def send_email():
  to = request.json["to"]
  subject = request.json["subject"]
  message = request.json["message"]

  # Send the email using your preferred email service provider
  # For example, to send an email using Gmail:

  import smtplib

  gmail_username = "your_gmail_username"
  gmail_password = "your_gmail_password"

  server = smtplib.SMTP("smtp.gmail.com", 587)
  server.starttls()
  server.login(gmail_username, gmail_password)

  server.sendmail(gmail_username, to, f"Subject: {subject}\n\n{message}")
  server.quit()

  return jsonify({
    "message": "Email sent successfully."
  })

if __name__ == "__main__":
  app.run(debug=True)
