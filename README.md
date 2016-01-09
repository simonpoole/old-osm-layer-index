# OSM Layer Index "OLI"

The goal of this project is to maintain a canonical representation of the layers available to [OpenStreetMap](http://www.openstreetmap.org/) editors with correct attribution and uptodate URLs.

Some sources in this list are usable in OpenStreetMap because permission 
was specifically given to use them with OpenStreetMap and this 
permission does not extend to other projects. 

See [CONTRIBUTING.md](CONTRIBUTING.md) for help on how to contribute.

## Using this index

If you are using Vespucci, you are already using this index!

For JOSM you can add `http://simonpoole.github.io/osm-layer-index/imagery_all.xml` 
to the preference key `imagery.layers.sites` in advanced preferences. You probably
want to remove the `https://josm.openstreetmap.de/maps` entry or you'll get the 
same imagery listed twice.

The pre-generated files are currently (re-create by running "make"):

* imagery_all.json - all the sources in json format
* imagery_all.geojson - all the sources in geojson format
* imagery_all.xml - all the sources in xml format
* imagery_tms.json - only sources with type=tms (aka tileservers and not WMS) in json format
* imagery_id.json - as above and further excluding anything directly derived from OSM (if the content attribute has been set to "osm")
