function chargementEmbase(taille,scene,coupeTibiale,coupeSagittale,mesh) {
  
  var loader2 = new THREE.OBJLoader();
              
  loader2.load('../img/T'+taille+'.obj',function( object ){     
             if(mesh2!=null){
               	scene.remove(mesh2);
               }          
	         var material = new THREE.MeshPhongMaterial({color:0xffffff});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                 child.material = material;                                   
                 mesh = new THREE.Mesh( geometry, material ); 
                 	 mesh.rotation.set(3.4,4.71,-3.155);                            
					 mesh.position.x = -0 - coupeSagittale;
					 mesh.position.y = -0.8 - coupeTibiale; /// remplacer le -4 par -3 peut être un  probleme de précision
					 mesh.position.z = 22 ;
                scene.add(mesh);
               }
             });		    
     });

}