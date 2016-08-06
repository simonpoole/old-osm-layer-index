ALL = imagery_all.geojson imagery_all.json imagery_all.xml imagery_tms.json  imagery_id.json imagery_tms_minified.json
SOURCES = $(shell find sources -type f -name '*.json' | LC_ALL="en_US.UTF-8" sort)

all: $(ALL)

check:
	@python scripts/check.py $(SOURCES)

clean:
	rm $(ALL)

imagery_all.xml: $(SOURCES)
	python scripts/convert_xml.py $(SOURCES)

imagery_all.json: $(SOURCES)
	python scripts/concat.py $(SOURCES) > imagery_all.json

imagery_id.json: $(SOURCES)
	python scripts/concat_tms_no_osm.py $(SOURCES) > imagery_id.json

imagery_all.geojson: imagery_all.xml
	python scripts/convert_geojson.py imagery_all.xml > imagery_all.geojson

imagery_tms.json: $(SOURCES)
	python scripts/concat_tms.py $(SOURCES) > imagery_tms.json

imagery_tms_minified.json: $(SOURCES)
	python scripts/concat_tms.py $(SOURCES) | json-minify > imagery_tms_minified.json