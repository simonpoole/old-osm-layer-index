import json, sys, util, io
from xml.dom.minidom import parse

source_features = []
for file in sys.argv[1:]:
    with io.open(file, 'r') as f:
    	source = json.load(f)
    	properties = source['properties']
    	if properties['type'] != 'wms':
        	source_features.append(source)

collection = {
    "type": "FeatureCollection",
    "features": source_features
}

print(json.dumps(
    collection,
    indent=4,
    sort_keys=True,
    separators=(',', ': ')
))
