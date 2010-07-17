

	function clear(elem){
		if ( elem.hasChildNodes() )
		{
		  while ( elem.childNodes.length >= 1 )
		  {
		      elem.removeChild( elem.firstChild );       
		  } 
		}



	}

function drawchip(h,v){
	var svgNamespace = 'http://www.w3.org/2000/svg';
	var svg;
	var container =  document.getElementById("chipdisplay");
 	var svgRoot = container.getElementsByTagName("svg")[0];
	if(!svgRoot){
		svgRoot=container.ownerDocument.createElementNS(svgNamespace, "svg");
		container.appendChild(svgRoot);
	}
	var chipG = 	svgRoot.getElementsByTagName("g")[0];
	if(!chipG){
		chipG=container.ownerDocument.createElementNS(svgNamespace, 'g');
		svgRoot.appendChild(chipG);
	}
  clear(chipG);

  var y=20
	var start=10;
	var hor=h*10;
	var pincount=1;
	
	if(h==0)
	{
	hor=30;
	y=10;
	start=0;
	}

	svg = container.ownerDocument.createElementNS(svgNamespace, 'rect');
  svg.setAttributeNS(null, 'x', 10);
  svg.setAttributeNS(null, 'y', start);	
  svg.setAttributeNS(null, 'width', hor+10);
  svg.setAttributeNS(null, 'height', v*10+10);
  svg.setAttributeNS(null, 'style',"fill:white;stroke:#000000;stroke-width:2px;");
  chipG.appendChild(svg);
	for(var x=20;x<h*10+20;x+=10){
		svg = container.ownerDocument.createElementNS(svgNamespace, 'line');
		svg.setAttributeNS(null, 'x1',x );
		svg.setAttributeNS(null, 'y1', 0);
		svg.setAttributeNS(null, 'x2', x);
		svg.setAttributeNS(null, 'y2', 10);
		svg.setAttributeNS(null, 'stroke', 'black');
		svg.setAttributeNS(null, 'stroke-width', 2);
		chipG.appendChild(svg);
			
	/*	
		svg = container.ownerDocument.createElementNS(svgNamespace, 'text');
		svg.setAttributeNS(null, 'x', 50);
		svg.setAttributeNS(null, 'y', 50);
		svg.setAttributeNS(null, 'font-size', 12);
		svg.appendChild(container.ownerDocument.createTextNode(pincount));
		chipG.appendChild(svg);
*/
		svg = container.ownerDocument.createElementNS(svgNamespace, 'line');
		svg.setAttributeNS(null, 'x1',x);
		svg.setAttributeNS(null, 'y1',v*10+20);
		svg.setAttributeNS(null, 'x2',x);
		svg.setAttributeNS(null, 'y2',v*10+30);
		svg.setAttributeNS(null, 'stroke', 'black');
		svg.setAttributeNS(null, 'stroke-width', 2);

		chipG.appendChild(svg);
	}
	for(;y<(v*10+start+10);y+=10){
		svg = container.ownerDocument.createElementNS(svgNamespace, 'line');
		svg.setAttributeNS(null, 'x1',0 );
		svg.setAttributeNS(null, 'y1', y);
		svg.setAttributeNS(null, 'x2', 10);
		svg.setAttributeNS(null, 'y2', y);
		svg.setAttributeNS(null, 'stroke', 'black');
		svg.setAttributeNS(null, 'stroke-width', 2);
		chipG.appendChild(svg);
		svg = container.ownerDocument.createElementNS(svgNamespace, 'line');
		svg.setAttributeNS(null, 'x1',hor+20 );
		svg.setAttributeNS(null, 'y1',y);
		svg.setAttributeNS(null, 'x2',hor+30);
		svg.setAttributeNS(null, 'y2',y);
		svg.setAttributeNS(null, 'stroke', 'black');
		svg.setAttributeNS(null, 'stroke-width', 2);
		chipG.appendChild(svg);
	}

	svg=container.ownerDocument.createElementNS(svgNamespace,'circle');
  svg.setAttributeNS(null, 'cx', 20);
  svg.setAttributeNS(null, 'cy', start+10);	
	svg.setAttributeNS(null, 'r', 3);
	svg.setAttributeNS(null, 'stroke', 'black');
	svg.id = 'shape:' + createUUID();
	chipG.appendChild(svg);	}
