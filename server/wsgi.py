from server import app
import os

if __name__ == "__main__":
    debug = os.environ["ENABLE_SERVER_DEBUG"] == "true"
    app.run(port=5001, debug=True)
