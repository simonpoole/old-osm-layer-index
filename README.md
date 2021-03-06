# OSM Layer Index "OLI"

The goal of this project is to maintain a canonical representation of the layers available to [OpenStreetMap](http://www.openstreetmap.org/) editors such as [iD](https://github.com/openstreetmap/iD), [JOSM](http://josm.openstreetmap.de/), and [Potlatch 2](https://github.com/systemed/potlatch2).

This list is purely targeted at OpenStreetMap and does not include layers only useful for other projects such as [Open Historical Map](http://www.openhistoricalmap.org/) if the layers are not also useful for OpenStreetMap. With the way this list is structured it is easy to combine it with additional layer sources simply by copying the additional sources into their own directory and running `make`.

Some sources in this list are usable in OpenStreetMap because permission was specifically given to use them with OpenStreetMap and this permission does not extend to other projects.

See [CONTRIBUTING.md](CONTRIBUTING.md) for help on how to contribute.

## Using this index

If you are using Vespucci, you are already using this index!

For JOSM you can add `http://osmlab.github.io/editor-layer-index/imagery.xml` to the preference key `imagery.layers.sites` in advanced preferences. You probably want to remove the `https://josm.openstreetmap.de/maps` entry or you'll get the same layers listed twice.

## Layer Overview

An interactive list of all layers (with a live map preview for most of them) is available at
http://osmlab.github.com/editor-layer-index/.

The pre-generated files are currently (re-create by running "make"):

* imagery_all.json - all the sources in json format
* imagery_all.geojson - all the sources in geojson format
* imagery_all.xml - all the sources in xml format
* imagery_tms.json - only sources with type=tms (aka tileservers and not WMS) in json format
* imagery_id.json - as above and further excluding anything directly derived from OSM (if the content attribute has been set to "osm")
