import json

# Singleton to only load data from JSON file on first
# initiation. This probably isn't the most Pythonic approach..
class ParkRepository:
    _instance = None

    parks = []

    def __new__(cls):
        if cls._instance is None:
            print("Loading Parks Data")

            cls._instance = super(ParkRepository, cls).__new__(cls)

            try:
                f = open("./services/parks/parks.json", "r")

                cls.parks = json.load(f)

                f.close()
            except OSError:
                print("Could not open parks.json")

        return cls._instance

