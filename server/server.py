from flask import Flask, request, redirect, Response
import time
import database
import random
from validations.ParkingInfoValidation import validate
from dateutil import parser
from datetime import datetime


APP_ROOT_URL = "http://localhost:3000"
app = Flask(__name__)

db = database.Database()


@app.route("/", methods=["GET"])
def hello_world():
    print("hi there")
    return {"msg": "hi there"}


@app.route("/api/submit", methods=["POST"])
def parking_info_submit():
    data = request.get_json()
    print(data)

    errors = validate(db, data)
    if errors:
        return {"status": "error", "errors": errors}
    else:
        session_id = str(random.randint(0, 10000))
        db.set(
            ["parking_spots", data["parkingSpot"], data["parkingLocation"]],
            {
                "name": data["name"],
                "phoneNumber": data["phoneNumber"],
                "departureTime": data["departureTime"],
                "session_id": session_id,
            },
        )
        return {
            "status": "success",
            "session_id": session_id,
            "expires_at": parser.isoparse(data["departureTime"]).strftime("%s"),
        }


@app.route("/api/session", methods=["GET"])
def session_info():
    session_id = request.args.get("session_id")
    session_info = db.find_in_parking_spots_by("session_id", session_id)
    print(session_info)
    return session_info or {}


@app.route("/stream")
def stream():
    def get_data():
        while True:
            yield "data: {datetime.now()} \n\n"

    return Response(get_data(), mime="text/event-stream")


if __name__ == "__main__":
    app.run(port=5001, debug=True)
