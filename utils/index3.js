var scene ;
var camera ;
var renderer;
var controls;
var geometry;
var mesh = null;


function init() {

	console.log("let's start");
	scene = new THREE.Scene();
	var scene_globale = document.getElementById("scene_globale");
	console.log(scene_globale);
  var valeur_coupeTibiale = getCoupeTibiale();
  var valeur_penteTibiale = getPenteTibiale();
  var valeur_varus = getVarus();
  var valeur_coupeSagittale = getCoupeSagittale();
  var valeur_embase = getEmbase();

     var gui = new dat.GUI();
	   parametres = {  translatex : 0 , translatey : 0 , translatez : 0 , rotationx : 88 , rotationy : 10 , rotationz :  50 ,};
	   var tibia = gui.addFolder('Femur'); 
	   var rotatex = tibia.add(parametres,"rotationx").min(-200).max(200).step(1);	
	   var rotatey = tibia.add(parametres,"rotationy").min(-200).max(200).step(1);	
	   var rotatez = tibia.add(parametres,"rotationz").min(-200).max(200).step(1);	 
	   var translatex = tibia.add(parametres,"translatex").min(-5).max(5).step(0.01);	
	   var translatey = tibia.add(parametres,"translatey").min(-5).max(5).step(0.01);	
	   var translatez = tibia.add(parametres,"translatez").min(-5).max(5).step(0.01);                         
	    gui.open();
	    //tibia.open(); 
    	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
    	camera.position.z = 200;
        camera.position.y = 0;
        camera.position.x = 0;

   
   var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-5,69,8.6);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(10,15,15);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-10,-51,-2);
    scene.add(light);
    var light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    scene.add( light );

    //////////////////////////////////
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(scene_globale.clientWidth , 500);
	renderer.setClearColor( 0x0e99ee );
	document.getElementById("scene_globale").appendChild(renderer.domElement);
  var axisHelper = new THREE.AxisHelper( 100 );
  scene.add( axisHelper );
	controls = new THREE.OrbitControls( camera , renderer.domElement); 
	var manager = new THREE.LoadingManager();
	manager.onProgress = function(item,loaded,total) {
	console.log(item, loaded , total);
	};
	var onProgress = function(xhr){
		if (xhr.lenghtComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete,2) + '% downloaded');
		}
	};
	var onError = function(xhr){
	};


//////////////////////////////////////////
     var loader = new THREE.OBJLoader(manager);
     var loader2 = new THREE.OBJLoader(manager);
     var loader3 = new THREE.OBJLoader(manager);
     var loader4 = new THREE.OBJLoader(manager);
loader.load('img/femur3.obj',function(object){  
          if (mesh==null) {
             var material = new THREE.MeshPhongMaterial({color:0xfff4c9});
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                mesh = new THREE.Mesh( geometry, material );
                mesh.rotation.set(-1.3,0,0);                       
               }
            } ); 
             scene.add(mesh); 
              } 
                loader2.load("img/Condyle_GT1.obj",function(object2) {
                     object2.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                     
                          object2.rotation.set(0.4,4.72,1.73);                            
                          object2.position.x = 21; 
                          object2.position.y = -37;/// remplacer le -4 par -3 peut être un  probleme de précision
                          object2.position.z = 29 ;
                          child.material.color.setHex(0x5B5B5B);        
                          scene.add(object2);                                                              
                       }
                     });
               },onProgress,onError);
            } ,onProgress,onError);
        loader3.load('img/tibia.obj',function(object3){  
                   console.log("la");
             var material = new THREE.MeshPhongMaterial({color:0xfff4c9});
             object3.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                coupeTibiale(geometry,valeur_coupeTibiale,valeur_coupeSagittale,valeur_varus,valeur_penteTibiale);
                mesh_tibia = new THREE.Mesh( geometry, material );
                mesh_tibia.rotation.set(-1.3,0,0);
                scene.add(mesh_tibia);    
             }                   
           } ); 

               loader4.load('img/T'+valeur_embase+'.obj',function( object4 ){  
                object4.traverse( function ( child ){
                if ( child instanceof THREE.Mesh ) {

                  object4.rotation.set(3.4,4.71,-3.155);                            
                  object4.position.x = -0 ;
                  object4.position.y = -0.8;
                  object4.position.z = 22 ;
                  child.material.color.setHex(0x5B5B5B);
                  scene.add(object4);
                  
                  console.log("this is the opacity of object",child.material.opacity)
                  }
                } );
                } ,onProgress,onError);
          } ,onProgress,onError);


}

function render(){

	requestAnimationFrame(render);
	renderer.render(scene,camera); 

}
init();
render();