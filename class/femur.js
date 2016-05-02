function coupeFemorale(geometry,valeur){
                

                var minz = MinZ(geometry);
                var miny = MinY(geometry);
                var condition =   valeur + 15 ;
                var taille_z = MinMaxZ(geometry);
                var hauteur_coupeTibiale = 15;
                
           	 	for(var i = 0; i < geometry.vertices.length ;++i) {	                    
        	        if(geometry.vertices[i].x> 0 && geometry.vertices[i].z <= condition)  {			    
				            geometry.vertices[i].z =  15 + valeur;                  			  
			           } 			           
			       } 
             hauteur_coupeTibiale = hauteur_coupeTibiale + valeur;  
             var hauteur = 11.09 + hauteur_coupeTibiale;
			       for(var i = 0; i < geometry.vertices.length ;++i) {	
        	        if(geometry.vertices[i].x> 0 && geometry.vertices[i].z <= hauteur && geometry.vertices[i].y <-8 && geometry.vertices[i].z >= (condition) )  {     	          				    
				              if(geometry.vertices[i].z <= 26.1 ){
                            geometry.vertices[i].y =  geometry.vertices[i].y + valeur;  
                      }
                      else if (geometry.vertices[i].z > 26.1  ){
                             console.log("z'",(geometry.vertices[i].z));        
                              geometry.vertices[i].y =  geometry.vertices[i].y + (hauteur - geometry.vertices[i].z)/0.7812 ;  
                      } 			      				  
			           } 			           
			       } 


			     
             console.log("Condition",condition);
             console.log("hauteur_coupeTibiale",hauteur_coupeTibiale);
             console.log("hauteur",hauteur);
}
 function MaxX (geometry) {
          	var max = geometry.vertices[0].x;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		 if(geometry.vertices[i].x> 0 && geometry.vertices[i].y>=0) {				 
				    
				    if (geometry.vertices[i].x > max )
         			max = geometry.vertices[i].x;           
			       } 
          		
          	}
          	return max;       
  }
   function MaxY (geometry) {
          	var max = geometry.vertices[0].y;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		 if(geometry.vertices[i].x> 0 ) {				 
				    
				    if (geometry.vertices[i].y > max )
         			max = geometry.vertices[i].y;           
			       } 
          		
          	}
          	return max;       
  }
   function MinY (geometry) {
          	var min = geometry.vertices[0].y;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		 if(geometry.vertices[i].x> 0 ) {				 
				    
				    if (geometry.vertices[i].y < min )
         			min = geometry.vertices[i].y;           
			       } 
          		
          	}
          	return min;       
  }
   function MinZ (geometry) {
          	var min = geometry.vertices[0].z;
          	var y = 0;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){
          		if(geometry.vertices[i].x>0 && geometry.vertices[i].x<9){
          		 if(geometry.vertices[i].z> 0) {				 
				     if (geometry.vertices[i].z < min)
         			min = geometry.vertices[i].z; 
                    y = geometry.vertices[i].y;
			       } 
			      }        		
          	}
          	console.log("y: ",y)
          	return min;       
  }
  function MinMaxZ (geometry) {
         	var min = geometry.vertices[0].z;
          	var max = geometry.vertices[0].z;
          	for( var i = 0 ; i < geometry.vertices.length ; i++){

          		if(geometry.vertices[i].x>0)
	          	 {	
	        		if (geometry.vertices[i].z < min) 
	          			min = geometry.vertices[i].z;
	          		else if (geometry.vertices[i].z > max )
	          			max = geometry.vertices[i].z;
	          		}	
          	}        
          	 return (-min+max) ;
          } 