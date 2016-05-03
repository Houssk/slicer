
var renderer, scene, camera,geometry,controls;

window.onload = init;
 var tibia_bsp;
  var cube_mesh;
  var cube_bsp;
  var subtract_bsp;
  var result=null;

function init() {


    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // ambient light
    var ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    // directional light
    /*var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, -0.5, 1);
    scene.add(directionalLight); */
       var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-5,69,8.6);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(10,15,15);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-10,-51,-2);
     var light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    light2.position.set(15,-9,10);
     scene.add( light2 );
      var axisHelper = new THREE.AxisHelper( 100 );
    scene.add( axisHelper );


    // camera
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.z = 400;
        camera.position.y = 0;
        camera.position.x = 0;
    renderer.setClearColor( 0x0e99ee );
    scene.add(camera);
    // controls
     
       //  controls = new THREE.OrbitControls( camera );
      var gui = new dat.GUI();
      parametres = {  taille : 0 };
      var cube = gui.addFolder('Tibiale'); 
      var cube2 = gui.addFolder('Sagittale');
      var cube3 = gui.addFolder('Pente_tibiale');
      var changeTibiale = cube.add(parametres,'taille').min(20).max(50);
      var changeSagittale = cube2.add(parametres,"taille").min(50).max(100);
      var changePente = cube3.add(parametres,"taille").min(0).max(90);
     cube.open();
     cube2.open();
     cube3.open();
      
    var manager = new THREE.LoadingManager();
                manager.onProgress = function ( item, loaded, total ) {
                    console.log( item, loaded, total );
                };
   
    var onProgress = function ( xhr ) {
                    if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round(percentComplete, 2) + '% downloaded' );
                    }
                };

    var onError = function ( xhr ) {
                };
   controls = new THREE.OrbitControls( camera , renderer.domElement); 
   var loader = new THREE.OBJLoader(manager);
   var coupe_tibiale = 0;
   var coupe_sagittale = 0;

 loader.load('img/cote_tibia4.obj',function(object){
          var material = new THREE.MeshPhongMaterial({color:0x3F3F3F});
             object.traverse( function ( child ) {
              var texture =THREE.ImageUtils.loadTexture('texture2.png') ;
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                  console.log(child.geometry.vertices);
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                mesh = new THREE.Mesh(geometry, child.material );
                tibia_bsp = new ThreeBSP( mesh );
                ////////////////////tibiale//////////////////////////////////
                changeTibiale.onChange(function(z){
                  console.log("z",z);
                  console.log("coupe_sagittale",coupe_sagittale);
                  coupe_tibiale = z-20;
                    if(result!=null){                      
                        scene.remove(result);
                    }
                     var cube_geometry = new THREE.BoxGeometry( 40+coupe_sagittale, 67, z+20);                 
                     cube_mesh = new THREE.Mesh( cube_geometry );                    
                    cube_mesh.position.x = 19.8 ;
                    cube_mesh.position.z = 20;
                cube_mesh.name ="cube";
                cube_bsp = new ThreeBSP( cube_mesh );
                subtract_bsp = tibia_bsp.subtract( cube_bsp );
                result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
               //result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading }) );
                result.geometry.computeVertexNormals();
                console.log("debut d'ajout de la scene");
                scene.add( result );
                result.rotation.set(-1.3,0,0);
                })  

                ////////////////////////sagittale//////////////////////////
                changeSagittale.onChange(function(x){
                  console.log("x",x);
                  console.log("coupe_tibiale",coupe_tibiale);
                  coupe_sagittale = x-50;
                    if(result!=null){                      
                        scene.remove(result);
                    }
                     var cube_geometry = new THREE.BoxGeometry( x+50, 67, 80 + coupe_tibiale );
                     cube_mesh = new THREE.Mesh( cube_geometry );
                    cube_mesh.position.z = 39.9 ;
                    cube_mesh.position.x = 50;
                cube_mesh.name ="cube";
                cube_bsp = new ThreeBSP( cube_mesh );
                subtract_bsp = tibia_bsp.subtract( cube_bsp );
                result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
               
               //result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading }) );
                result.geometry.computeVertexNormals();
                console.log("debut d'ajout de la scene");
                scene.add( result );
                result.rotation.set(-1.3,0,0);

                })  
                /////////////////////////////////////////////////////////////////////////////

                changePente.onChange(function(x){                              
                    if(result!=null){                      
                        scene.remove(result);
                    }
                     var cube_geometry = new THREE.BoxGeometry(50, 100, 40 );
                     cube_mesh = new THREE.Mesh( cube_geometry );
                    cube_mesh.position.x = 25;
                    cube_mesh.position.z =  20;
                    cube_mesh.rotation.x = (x*Math.PI)/180;
                 //   scene.add(cube_mesh); 
                cube_mesh.name ="cubePente";
                cube_bsp = new ThreeBSP( cube_mesh );
                subtract_bsp = tibia_bsp.subtract( cube_bsp );
                result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
             //   result.rotation.set(-1.3,0,0);
               //result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading }) );
                result.geometry.computeVertexNormals();
                console.log("debut d'ajout de la scene");
                scene.add( result );
                result.rotation.set(-1.3,0,0);
                })  
               

             }                   
           } ); 
       });  

    render();

}

// render

function render() {
     
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
// animate

