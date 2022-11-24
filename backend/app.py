from flask import Flask
from flask import request
from models.Buildings import db
from models.Buildings import BuildingsFromFlask
from utils.processBuildingFromPost import processBuilding, buildingsGenerator
from utils.formatBuilding import formatBuilding
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sumi1107@localhost/SISAdemo'
# db = SQLAlchemy(app)
db.init_app(app)


@app.route('/')
def hello():
    return 'Hey!This data collection local demo'


# Insert post buildings
@app.route('/dataCollectionBuildings', methods=['POST'])
def insertBuildings():
    buildings = request.get_json()
    for building in buildingsGenerator(buildings['buildings']):
        newBuilding = processBuilding(building)
        building_name = building['building_name']
        buildingToInsert = BuildingsFromFlask(**newBuilding)
        deleteABuilding(building_name)
        db.session.add(buildingToInsert)
        db.session.commit()
    return "inserted"


# Find all Buildings
@app.route('/getAllBuildings', methods=['GET'])
def getAllBuildings():
    buildings = BuildingsFromFlask.query.order_by(BuildingsFromFlask.date_created).all()
    res = []
    for building in buildings:
        formatted_buildling = formatBuilding(building)
        print(formatted_buildling)
        res.append(formatted_buildling)
    return {"buildings": res}


# Find a Building
@app.route('/getABuilding/<building_name>', methods=['GET'])
def getABuilding(building_name):
    building = BuildingsFromFlask.query.filter_by(building_name=building_name).one()
    formattedBuilding = formatBuilding(building)
    print(building)
    return formattedBuilding


# Delete a Building
@app.route('/deleteABuilding/<building_name>', methods=['DELETE'])
def deleteABuilding(building_name):
    try:
        building = BuildingsFromFlask.query.filter_by(building_name=building_name).one()
        if (building):
            db.session.delete(building)
            db.session.commit()
    except Exception as e:
        print(e)
    return f"Building has been deleted"


if __name__ == '__main__':
    app.run()
