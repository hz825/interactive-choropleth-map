const map = d3.select("#map");

const requestData7 = async() => {
	const europeData = await d3.json("europe.topojson");
	var countries = topojson.feature(europeData, europeData.objects.europe);

	var projection = d3.geoMercator().fitSize([500,500],countries);
	var pathGen = d3.geoPath().projection(projection);

	const scoreMin = d3.min(countries.features, d => d.properties.pisa);
	const scoreMax = d3.max(countries.features, d => d.properties.pisa);

	const newColorScale = d3.scaleSequential([scoreMin,scoreMax],d3.interpolateViridis);

	map.selectAll("path").data(countries.features)
	   .enter()
	   .append("path")
	   .attr("class","district")
	   .style("fill", d => newColorScale(d.properties.pisa))
	   .style("stroke","none")
	   .on("mouseover",function(d){
	   		d3.select(this).style("stroke","black");
	   		d3.select("#hint")
	   			.append("text")
	   			.attr("id", d.properties.NAME.replace(/ /,""))
	   			.text(d.properties.pisa)
	   })
	   .on("mouseout", function(d){
	   		d3.select(this).style("stroke","none");
	   		d3.select('#'+d.properties.NAME.replace(/ /,"")).remove();
	   })
	   .attr("d",pathGen);
};

requestData7();