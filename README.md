# OSM Layer Index "OLI"

The goal of this project is to maintain a canonical representation of the layers available to [OpenStreetMap](http://www.openstreetmap.org/) editors.

This list is purely targeted at OpenStreetMap and does not include 
layers only useful for other projects such as 
[Open Historical Map](http://www.openhistoricalmap.org/) if the layers 
are not also useful for OpenStreetMap. With the way this list is structured 
it is easy to combine it with additional sources of imagery simply by copying 
the additional sources into their own directory and running `make`. 

Some sources in this list are usable in OpenStreetMap because permission 
was specifically given to use them with OpenStreetMap and this 
permission does not extend to other projects. 

See [CONTRIBUTING.md](CONTRIBUTING.md) for help on how to contribute.

## Using this index

If you are using Vespucci, you are already using this index!

For JOSM you can add `http://simonpoole.github.io/osm-layer-index/imagery.xml` 
to the preference key `imagery.layers.sites` in advanced preferences. You probably
want to remove the `https://josm.openstreetmap.de/maps` entry or you'll get the 
same imagery listed twice.
