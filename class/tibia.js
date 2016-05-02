 function coupeTibiale(geometry,valeur,valeurSagittale,valeurVarus,valeurPenteTibiale){
      	    var  valeurNeg= - valeur;       	     
	 	    var conversion = (valeurVarus*Math.PI)/180; 	     
           	 	for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z> valeurNeg && geometry.vertices[i].x>= -valeurSagittale ) {				 
				       geometry.vertices[i].z= valeurNeg;			    
			           } 			           
			       } 


			  if (valeurSagittale!=0) {    
			       for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].x<=0.0001 && geometry.vertices[i].x > - valeurSagittale && geometry.vertices[i].z >= - valeur) {
				       geometry.vertices[i].x = - valeurSagittale;
			           } 			           
			       } 
			       } 
             if(valeurVarus!=0) {


			  var max = MaxX(geometry) + valeurSagittale;
              valeurmax_z = max*Math.tan(conversion);
              for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z>= - (valeurmax_z + valeur) && geometry.vertices[i].x>= -valeurSagittale ) {				 
                       geometry.vertices[i].z= - geometry.vertices[i].x *Math.tan(conversion) - valeur; 				  
			           } 	
			     }  
			  }

			  if (valeurPenteTibiale!=0) {
              var conversion2 = (valeurPenteTibiale*Math.PI)/180;
              var max = MaxX(geometry) + valeurSagittale;    
              valeurmax_z2 = max*Math.tan(conversion2);    
      	      for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z>= -(valeurmax_z2 + valeur) && geometry.vertices[i].x>= -valeurSagittale) {
                      geometry.vertices[i].z =  geometry.vertices[i].y * Math.tan(conversion2)- valeur;                       
				     } 	
			       }    
			     } 	   		
}

function coupeSagittale(geometry,valeur,valeurTibiale,valeurVarus,valeurPenteTibiale){

      	     var valeurNeg= - valeur;
      	     var conversion = (valeurVarus*Math.PI)/180; 	 
           	 	for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].x<=0.0001 && geometry.vertices[i].x > valeurNeg && geometry.vertices[i].z >= - valeurTibiale) {				     
				       geometry.vertices[i].x = valeurNeg;
			           } 			           
			       }
			   if (valeurTibiale!=0) {
			     	for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z> -valeurTibiale && geometry.vertices[i].x>= -valeur ) {    
				       geometry.vertices[i].z= -valeurTibiale;				       			     				       
			           } 			           
			     } 
			     } 
                 var max = MaxX(geometry) + valeur;
			   if(valeurVarus!=0) {		    
                  valeurmax_z = max*Math.tan(conversion);
                   for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z>= - (valeurmax_z + valeurTibiale) && geometry.vertices[i].x>= -valeur ) {				 
                       geometry.vertices[i].z= - geometry.vertices[i].x *Math.tan(conversion) - valeurTibiale; 				  
			           } 	
			       }  
			      } 
               if(valeurPenteTibiale){
			  var conversion2 = (valeurPenteTibiale*Math.PI)/180;     
              valeurmax_z2 = max*Math.tan(conversion2);    
      	      for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z>= -(valeurmax_z2 + valeurTibiale) && geometry.vertices[i].x>= -valeur) {
                      geometry.vertices[i].z  = geometry.vertices[i].z + geometry.vertices[i].y * Math.tan(conversion2) ;                       
				     } 	
			       } 
			    }       	     
    }


 function coupeVarus(geometry,valeur,valeurTibiale,valeurSagittale,valeurPenteTibiale){  

	 	      var conversion = (valeur*Math.PI)/180;
	 	      console.log(conversion);

	 	      if(valeurTibiale!=0) {


              for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z> -valeurTibiale && geometry.vertices[i].x>= -valeurSagittale ) {				 
				       geometry.vertices[i].z= -valeurTibiale;			    
			           } 			           
			       } 
			        }
			  if(valeurSagittale!=0) {
			       
			       for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].x<=0.0001 && geometry.vertices[i].x > - valeurSagittale && geometry.vertices[i].z >= - valeurTibiale) {
				       geometry.vertices[i].x = - valeurSagittale;
			           } 			           
			       }  
			        }  
			    var max = MaxX(geometry) + valeurSagittale;
              valeurmax_z = max*Math.tan(conversion);		
      	      for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z>= - (valeurmax_z + valeurTibiale) && geometry.vertices[i].x>= -valeurSagittale ) {				 
                       geometry.vertices[i].z= - geometry.vertices[i].x *Math.tan(conversion) - valeurTibiale  ; 				  
			          } 	
			     }         	            
              if(coupePenteTibiale !=0) {

			  var conversion2 = (valeurPenteTibiale*Math.PI)/180;
              var max = MaxX(geometry)+ valeurSagittale;     
              valeurmax_z2 = max*Math.tan(conversion2);    
      	      for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.0001 && geometry.vertices[i].z>= -(valeurmax_z2 + valeurmax_z + valeurTibiale) && geometry.vertices[i].x> -valeurSagittale) {
                      geometry.vertices[i].z=  geometry.vertices[i].y * Math.tan(conversion2) - valeurTibiale - geometry.vertices[i].x *Math.tan(conversion) ;                       
				     } 	
			       }   
			     } 

			    
 } 
 function coupePenteTibiale(geometry,valeur){        
 	          var conversion = (valeur*Math.PI)/180;
              var max = MaxX(geometry);     
              valeurmax_z = max*Math.tan(conversion);           
      	      for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].z<=0.001 && geometry.vertices[i].z>= -valeurmax_z && geometry.vertices[i].x> -0.001) {
                      geometry.vertices[i].z=  geometry.vertices[i].y * Math.tan(conversion);                       
				     } 	
			       }   
 }

 function MaxX (geometry) {
          	var max = geometry.vertices[0].x;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		 if (geometry.vertices[i].x > max )
          			max = geometry.vertices[i].x;
          	}
          	return max;
          
  }

 function exportTOSTL(object) {
        var exporter = new THREE.STLBinaryExporter();
        var objtext;
        objtext = exporter.parse(object);
        return objtext;

     }  
     function exportTOOBJ(object) {
        var exporter = new THREE.OBJExporter();
        var objtext;
        objtext = exporter.parse(object);
        return objtext;

     }  


    function saveDataToStl(data,fileName) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
              
            blob = new Blob([data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
           window.URL.revokeObjectURL(url);

           console.log(data,fileName);
        
     }

     function MinMaxX (geometry) {
          	var min = geometry.vertices[0].x;
          	var max = geometry.vertices[0].x;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		if (geometry.vertices[i].x < min) 
          			min = geometry.vertices[i].x;
          		else if (geometry.vertices[i].x > max )
          			max = geometry.vertices[i].x;
          	}
        
          	console.log("la longueur de l'axe x est de :" ,-min+max);
          }
     function MinMaxY (geometry) {
         	var min = geometry.vertices[0].y;
          	var max = geometry.vertices[0].y;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		if (geometry.vertices[i].y < min) 
          			min = geometry.vertices[i].y;
          		else if (geometry.vertices[i].y > max )
          			max = geometry.vertices[i].y;
          	}
          	
          	console.log("la longueur de l'axe y est de :" ,-min+max);
          }
     function MinMaxZ (geometry) {
         	var min = geometry.vertices[0].z;
          	var max = geometry.vertices[0].z;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
        		if (geometry.vertices[i].z < min) 
          			min = geometry.vertices[i].z;
          		else if (geometry.vertices[i].z > max )
          			max = geometry.vertices[i].z;
          	}
         
          	console.log("la longueur de l'axe z est de :" ,-min+max);
          } 