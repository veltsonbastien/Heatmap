# Heatmap: 3D Path Visualization Tool

**Problem:** It's hard being able to tell how to make the most out of a 3D environment that you want people to travel through. What places in that environment are people travelling through the most, and what items are they looking at? 

Introducing, the **Heatmap** tool! Imagine laying down a mat in your 3D world that keeps track of where people went. The more visitors go through an area of a 3D space, the "hotter" it gets, and that "heat" is displayed on the Heatmap. 

The way Heatmap works is pretty simple. A Heatmap is made out of a grid of **Heatcubes** (where all the magic happens).

In each Heatcube, I make use of [SpacesVR's](https://github.com/spacesvr) limiter function, and R3F's `useFrame` hook to update a local variable `hits` of each cube. 

Each cube is basically asking "how long is a visitor standing within my proximity" and that `hits` counter gets translated to a color. 

That translates into a grid of Heatcubes looking something like this: 
![MuseHQ home page](https://pbs.twimg.com/media/FaeFXb-VEAAFp9W?format=jpg&name=4096x4096)

Making a Heatmap that tells a story of where visitors have been on your site!
