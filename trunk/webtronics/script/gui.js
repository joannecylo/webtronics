var circuit;

var webtronics=function(){
			docfromtext=function(txt){
			var xmlDoc;
			if (window.DOMParser){
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(txt,"text/xml");
			}
			else{ // Internet Explorer
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async="false";
				xmlDoc.loadXML(txt);
			} 
			return xmlDoc;
		}

/*public*/	
return{
	
		setsize:function(){
		
		var buffer=20;
		var realsize=window.innerHeight-$('webtronics_toolbar').offsetHeight-$('webtronics_status_bar').offsetHeight-buffer;
		$('webtronics_diagram_area').style.height = realsize+'px';
		},

		showMarkup:function() {
		var str="<?xml version='1.0' ?>\n";
		str+="<!--Created by webtronics 0.1-->\n";
		str+=circuit.getMarkup();
		var w=window.open("data:image/svg+xml;base64;charset=utf-8," + Utils.encode64(str) );
	},

		setMode:function(button,mode, status){

		var imgs = $('webtronics_toolbar').getElementsByTagName('img');
			for (var i=0; i<imgs.length; i++) {
				imgs[i].style.backgroundColor = '';
			}
			$(button).style.backgroundColor = 'grey';
			$('webtronics_status_bar').innerHTML = 'Mode: '+status;

		if(mode!='select'){
			if(circuit.selected){
				circuit.unselect();
			}
		}
		circuit.mode=mode;

		},

		changeimage:function(Name){
			
			$('webtronics_part_display').src=Name;
			$('webtronics_part_display').hide();
			$('webtronics_part_display').show();
		},

		openfile:function(Name){
			var xmldoc;
			new Ajax.Request(Name,{
			method:'get',
			asynchronous:false,
			contentType:"image/svg+xml",
			onSuccess: function(transport){
				xmldoc=transport.responseXML;
				},
			onFailure: function(){ alert('Something went wrong...'); }
			//, onException: function(x){alert(" Error name: " + x.name  + ". Error message: " + x.message); }
			});
			return xmldoc;
		},

		returnpart:function(Name){
			var xmlDoc=webtronics.openfile(Name);
			circuit.getgroup(xmlDoc.getElementsByTagName('g')[0]);
			$('webtronics_parts_box').hide();
			webtronics.setMode('webtronics_select','select','Selection');
		},	


		returnsvg:function(){
			if(window.FileReader){
			$('webtronics_open_file_selector').form.reset();
			$('webtronics_open_file').show();
				$('webtronics_open_file_selector').onchange=function(){
					var textReader = new FileReader();
					textReader.onloadend=function(){
						
						var xmlDoc=docfromtext(textReader.result);
						circuit.getfile(xmlDoc.getElementsByTagName('svg')[0]);
					}
				textReader.readAsText($('webtronics_open_file_selector').files[0]);
				$('webtronics_open_file').hide();
				}
			}
			else if((navigator.userAgent.toLowerCase().indexOf('firefox')>-1) &&window.FileList){

			$('webtronics_open_file_selector').form.reset();
			$('webtronics_open_file').show();
				$('webtronics_open_file_selector').onchange=function(){
					var txt =$('webtronics_open_file_selector').files[0].getAsText('');					
					var xmlDoc=docfromtext(txt);
					circuit.getfile(xmlDoc.getElementsByTagName('svg')[0]);
					$('webtronics_open_file').hide();
				}
			}

			/*no file read capability*/

			else {
				$('webtronics_open_text_ok').onclick=function(){
					var xmlDoc=docfromtext($('webtronics_svg_code').value);
					circuit.getfile(xmlDoc.getElementsByTagName('svg')[0]);
					$('webtronics_open_text').hide();
				}
				$('webtronics_open_text').show();

			}
			webtronics.setMode('webtronics_select','select','Selection');
		},


		returnchip:function(){
		circuit.getgroup($('webtronics_chip_display').getElementsByTagName('g')[0]);
		$('webtronics_chips_box').hide();
		webtronics.setMode('webtronics_select','select','Selection');
		}
	}
}(); 





	Event.observe(window, 'load', function() {
		document.oncontextmenu=new Function("return false");
		circuit = new Schematic($('webtronics_diagram_area'));
	 	webtronics.setMode('webtronics_select','select', 'Selection');    
		webtronics.setsize();
/*menu events*/
		Event.observe($('webtronics_file_open'), 'click', function() {
			webtronics.setMode('webtronics_file_open','select','Selection');
			webtronics.returnsvg();
			});
		Event.observe($('webtronics_chips_open'), 'click', function() {
			webtronics.setMode('webtronics_chips_open','select','Selection');
			$('webtronics_chips_box').show();
			});
		Event.observe($('webtronics_parts_open'), 'click', function() {
			webtronics.setMode('webtronics_parts_open','select','Selection');
			$('webtronics_parts_box').show();
			});
		Event.observe($('webtronics_zoom'), 'click', function() {
			circuit.zoom();
			});
		Event.observe($('webtronics_select'), 'click', function() {
			webtronics.setMode('webtronics_select','select', 'Selection');
			});
		Event.observe($('webtronics_zoom'), 'click', function() {
			circuit.zoom();
			});
		Event.observe($('webtronics_rotate'), 'click', function() {
			circuit.rotate();
			});
		Event.observe($('webtronics_wire'), 'click', function() {
			webtronics.setMode('webtronics_wire','line');
			});
		Event.observe($('webtronics_text'), 'click', function() {
			webtronics.setMode('webtronics_text','select', 'Selection');
			$('webtronics_add_text').show();
			});
		Event.observe($('webtronics_delete'), 'click', function() {
			circuit.deleteSelection();
			});
		Event.observe($('webtronics_save'), 'click', function() {
			webtronics.showMarkup();
			});
/*parts box events*/		
		Event.observe($('webtronics_part'), 'change', function() {
			webtronics.changeimage($('webtronics_part').value);
			});
		Event.observe($('webtronics_part_ok'), 'click', function() {
			//webtronics.setMode('webtronics_parts_open','Selection');
			webtronics.returnpart($('webtronics_part').value);
			});
		Event.observe($('webtronics_part_cancel'), 'click', function() {
			//webtronics.setMode('webtronics_parts_open','Selection');
			$('webtronics_parts_box').hide();
			webtronics.setMode('webtronics_select','select','Selection');
			});
/*file open events*/
		Event.observe($('webtronics_open_file_cancel'), 'click', function() {
			$('webtronics_open_file').hide();
			webtronics.setMode('webtronics_select','select','Selection');
		});
/*chip box events*/
		Event.observe($('webtronics_vert_pins'), 'change', function() {
			drawchip($('webtronics_hor_pins').value,$('webtronics_vert_pins').value,$('webtronics_chip_display'));
		});
		Event.observe($('webtronics_hor_pins'), 'change', function() {
			drawchip($('webtronics_hor_pins').value,$('webtronics_vert_pins').value,$('webtronics_chip_display'));
		});
		Event.observe($('webtronics_chip_ok'), 'click', function() {
			webtronics.returnchip();
		});
		Event.observe($('webtronics_chip_cancel'), 'click', function() {
			$('webtronics_chips_box').hide();
			webtronics.setMode('webtronics_select','select','Selection');
		});
/*text add events*/
		Event.observe($('webtronics_text_ok'), 'click', function() {
			circuit.createtext($('webtronics_comment').value);
			$('webtronics_add_text').hide();
			webtronics.setMode('webtronics_select','select','Selection');
		});
		Event.observe($('webtronics_text_cancel'), 'click', function() {
			webtronics.setMode('webtronics_select','select','Selection');

			$('webtronics_add_text').hide();
		});
/*text open events*/
		Event.observe($('webtronics_open_text_ok'), 'click', function() {
			$('webtronics_open_text').hide();
		});
		Event.observe($('webtronics_open_text_cancel'), 'click', function() {
			webtronics.setMode('webtronics_select','select','Selection');

			$('webtronics_open_text').hide();
		});



	
});
	Event.observe(window, 'resize', function() {
		webtronics.setsize();
	});
//	window.addEventListener("oncontextmenu",function(){return false},true);

