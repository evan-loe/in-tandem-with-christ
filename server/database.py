import json


def nested_get(dic, keys):
    for key in keys:
        if key not in dic:
            return None
        dic = dic[key]
    return dic


def nested_set(dic, keys, value):
    for key in keys[:-1]:
        dic = dic.setdefault(key, {})
    dic[keys[-1]] = value


def nested_del(dic, keys):
    for key in keys[:-1]:
        dic = dic[key]
    del dic[keys[-1]]


class Database:
    def __init__(self, database_file="database.json") -> None:
        self._database_file = database_file
        with open(self._database_file, "r") as f:
            self._database = json.load(f)
        self._tables = self._database.keys()

    def flush(self):
        with open(self._database_file, "w") as f:
            json.dump(self._database, f)

    def get(self, path):
        return nested_get(self._database, path)

    def set(self, path, attributes):
        nested_set(self._database, path, attributes)
        self.flush()

    def find_in_parking_spots_by(self, key, value):
        for parking_space in self._database["parking_spots"].values():
            if (
                parking_space["front"]
                and parking_space["front"].get(key, None) == value
            ):
                return parking_space["front"]
            if parking_space["rear"] and parking_space["rear"].get(key, None) == value:
                return parking_space["rear"]
        return None
