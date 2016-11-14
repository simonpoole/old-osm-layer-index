ALL = imagery_all.geojson imagery_all.json imagery_all.xml imagery_tms.json  imagery_id.json imagery_tms_minified.json
SOURCES = $(shell find sources -type f -name '*.geojson' | LC_ALL="C" sort)
PYTHON = python

all: $(ALL)

check:
	@$(PYTHON) scripts/check.py $(SOURCES)

clean:
	rm -f $(ALL)

imagery.xml: $(SOURCES)
	@$(PYTHON) scripts/convert_xml.py $(SOURCES)

imagery_all.json: $(SOURCES)
	@$(PYTHON) scripts/convert_geojson_to_legacyjson.py $(SOURCES) > imagery.json

imagery.geojson: $(SOURCES)
	@$(PYTHON) scripts/concat_geojson.py $(SOURCES) > imagery.geojson

imagery_tms.json: $(SOURCES)
	python scripts/concat_tms.py $(SOURCES) > imagery_tms.json

imagery_tms_minified.json: $(SOURCES)
	python scripts/convert_geojson_to_legacyjson_tms.py $(SOURCES) | json-minify > imagery_tms_minified.json
