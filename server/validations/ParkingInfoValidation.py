import phonenumbers
from dateutil import parser
from datetime import datetime, date, time, timezone


def flatten(matrix):
    return [item for row in matrix for item in row]


def validate_name(db, name, fields):
    if len(name) > 128:
        return [{"field": "name", "msg": "Name cannot be longer than 128 characters"}]
    return []


def validate_parking_location(db, location, fields):
    if location != "front" and location != "rear":
        return [{"field": "parkingLocation", "msg": "Invalid parking location"}]
    return []


def validate_parking_spot(db, parking_spot_id, fields):
    parking_spot = db.get(["parking_spots", parking_spot_id])

    # check if valid parking spot
    if not parking_spot:
        return [{"field": "parkingSpot", "msg": "Parking spot does not exist"}]

    # check if parking spot already taken
    parking_location = fields["parkingLocation"]
    if parking_spot[parking_location] is not None:
        return [{"field": "parkingSpot", "msg": "Parking spot already taken"}]
    return []


def validate_phone_number(db, phone_number, fields):
    region = None if phone_number.startswith("+") else "US"
    try:
        cleaned = phonenumbers.parse(phone_number, region)
        new_number = phonenumbers.format_number(
            cleaned, phonenumbers.PhoneNumberFormat.NATIONAL
        ).replace(" ", "")
        if len(new_number) < 10:
            raise "Phone Number length < 10"
        fields["phoneNumber"] = new_number
    except:
        return [{"field": "phoneNumber", "msg": f"Invalid phone number"}]

    return []


def validate_departure_time(db, departure_time, fields):
    departure_as_time = parser.parse(departure_time)
    print(departure_as_time)
    print(datetime.now(timezone.utc))
    if departure_as_time < datetime.now(timezone.utc):
        return [{"field": "departureTime", "msg": "Please enter valid time"}]
    fields["departureTime"] = departure_as_time.isoformat()
    return []


# Note: order is important later validators for some fields may require validated fields
validators = {
    "name": {
        "validator": validate_name,
    },
    "parkingLocation": {
        "validator": validate_parking_location,
    },
    "parkingSpot": {
        "validator": validate_parking_spot,
        "dependencies": ["parkingLocation"],
    },
    "phoneNumber": {
        "validator": validate_phone_number,
    },
    "departureTime": {
        "validator": validate_departure_time,
    },
}


def validate(db, fields):
    errors = {key: [] for key in validators.keys()}
    for key, validate in validators.items():
        validator = validate.get("validator")
        dependencies = validate.get("dependencies", [])

        # check if each field has a value
        if key not in fields or not fields[key]:
            errors[key] += [{"field": key, "msg": "Field is empty"}]
            continue

        # skip validator if there are dependencies AND dependent fields are not valid
        if any(errors.get(dependency, []) != [] for dependency in dependencies):
            continue

        # run validator for each field
        errors[key] += validator(db, fields[key], fields)

    return flatten(errors.values())
