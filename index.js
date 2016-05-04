
var renderer, scene, camera,geometry,controls;

window.onload = init;
 var tibia_bsp;
 var femur_bsp;
  var cube_mesh;
  var cube_bsp;
  var subtract_bsp;
  var result=null;
var result2=null;

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
      var cube4 = gui.addFolder('Varus');
      var cube5 = gui.addFolder('Femoral');
      var changeTibiale = cube.add(parametres,'taille').min(0.1).max(8);
      var changeSagittale = cube2.add(parametres,"taille").min(0.2).max(8);
      var changePente = cube3.add(parametres,"taille").min(0).max(15);
      var changeVarus= cube4.add(parametres,"taille").min(0).max(15);
     var changeFemoral= cube5.add(parametres,"taille").min(0).max(5);
     cube.open();
     cube2.open();
     cube3.open();
     cube4.open();
    cube5.open();
      
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
    var loader2 = new THREE.OBJLoader(manager);
   var coupe_tibiale = 0;
   var coupe_sagittale = 0;
   var pente = 0;
   var varus = 0 ;

    loader2.load('img/femur2.obj',function(object){
        var material = new THREE.MeshPhongMaterial({color:0x3FFFFF});
        object.traverse( function ( child ) {
            var texture =THREE.ImageUtils.loadTexture('texture2.png') ;
            if ( child instanceof THREE.Mesh ) {
                child.material = material;
                var geometry2 = new THREE.Geometry().fromBufferGeometry(child.geometry);
               var mesh2 = new THREE.Mesh(geometry2, child.material );
                femur_bsp = new ThreeBSP( mesh2 );
                changeFemoral.onChange(function(z){
                    coupe_tibiale = z;
                    if(result2!=null){
                        scene.remove(result2);
                    }
                    var cube_geometry = new THREE.BoxGeometry( 60, 80, 15 );
                    cube_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 30 , 40 , 7.5 ) );
                    cube_mesh = new THREE.Mesh( cube_geometry );
                    cube_mesh.position.z = z;
                    cube_mesh.position.y = -25;
                    cube_mesh.position.x = -3;
                    var cube_geometry2 = new THREE.BoxGeometry( 60, 40, 10 );
                    cube_geometry2.applyMatrix( new THREE.Matrix4().makeTranslation( 30 , 20 , 5 ) );
                    var cube_mesh2 = new THREE.Mesh( cube_geometry );
                    cube_mesh2.position.z = z+23;
                    cube_mesh2.position.y = -29;
                    cube_mesh2.position.x = -3;
                    cube_mesh2.rotation.x = -(38*Math.PI)/180;
                    cube_mesh2.rotation.y = 0.08;
                   // scene.add(cube_mesh);
                    cube_mesh.name ="cube_femur";
                    var cube_bsp2 = new ThreeBSP( cube_mesh2 );
                    cube_bsp = new ThreeBSP( cube_mesh );
                    var union_cube = cube_bsp2.union(cube_bsp);
                    subtract_bsp = femur_bsp.subtract( union_cube );
                    result2 = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
                    result2.geometry.computeVertexNormals();
                    console.log("debut d'ajout de la scene");
                    scene.add( result2 );
                   result2.rotation.set(-1.3,0,0);
                    cube_geometry.dispose();
                   scene.remove(cube_mesh);
                    scene.remove(cube_mesh2);
                })


            }
        } );
    });


    loader.load('img/cote_tibia4.obj',function(object){
          var material = new THREE.MeshPhongMaterial({color:0x3F3F3F});
             object.traverse( function ( child ) {
              var texture =THREE.ImageUtils.loadTexture('texture2.png') ;
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                mesh = new THREE.Mesh(geometry, child.material );
                tibia_bsp = new ThreeBSP( mesh );
                ////////////////////tibiale////////////////////////////////////////////////////////////////////////////
                changeTibiale.onChange(function(z){
                    coupe_tibiale = z;
                    if(result!=null){
                        scene.remove(result);
                    }
                    var cube_geometry = new THREE.BoxGeometry( 60, 80, 40 );
                    cube_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 30 , 40 , 20 ) );
                    cube_mesh = new THREE.Mesh( cube_geometry );
                    cube_mesh.position.z = -z;
                    cube_mesh.position.x = -coupe_sagittale;
                    cube_mesh.position.y = -30;
                    // scene.add(cube_mesh);
                    // cube_mesh.rotation.y = (varus*Math.PI)/180;
                    cube_mesh.name ="cube";
                    var cube_mesh2 = cube_mesh.clone();
                    cube_mesh2.rotation.x = -(pente*Math.PI)/180;
                    var cube_mesh3 = cube_mesh2.clone();
                    cube_mesh3.rotation.y = (varus*Math.PI)/180;

                    cube_bsp = new ThreeBSP( cube_mesh );
                    var cube_bsp2 = new  ThreeBSP( cube_mesh2 );
                    var cube_bsp3 = new  ThreeBSP( cube_mesh3 );
                    var union_cube = cube_bsp.union(cube_bsp2);
                    var union_cube2 = union_cube.union(cube_bsp3);
                    subtract_bsp = tibia_bsp.subtract( union_cube2 );

                    result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
                    //result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading }) );
                    result.geometry.computeVertexNormals();
                    scene.add( result );
                    result.rotation.set(-1.3,0,0);
                    cube_geometry.dispose();
                    scene.remove(cube_mesh);
                    scene.remove(cube_mesh2);
                    scene.remove(cube_mesh3);
                })  

                ////////////////////////sagittale////////////////////////////////////////////////////////////////////////
                changeSagittale.onChange(function(x){
                  coupe_sagittale = x;
                    if(result!=null){                      
                        scene.remove(result);
                    }
                     var cube_geometry = new THREE.BoxGeometry( 60, 80, 40 );
                     cube_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 30 , 40 , 20 ) );
                     cube_mesh = new THREE.Mesh( cube_geometry );
                    cube_mesh.position.z = -coupe_tibiale;
                    cube_mesh.position.x = -x;
                    cube_mesh.position.y = -30;
                     
                    // cube_mesh.rotation.y = (varus*Math.PI)/180;
                    cube_mesh.name ="cube";
                    var cube_mesh2 = cube_mesh.clone();
                    cube_mesh2.rotation.x = -(pente*Math.PI)/180;
                    var cube_mesh3 = cube_mesh2.clone();
                    cube_mesh3.rotation.y = (varus*Math.PI)/180;

                    cube_bsp = new ThreeBSP( cube_mesh );
                    var cube_bsp2 = new  ThreeBSP( cube_mesh2 );
                    var cube_bsp3 = new  ThreeBSP( cube_mesh3 );
                    var union_cube = cube_bsp.union(cube_bsp2);
                    var union_cube2 = union_cube.union(cube_bsp3);
                    subtract_bsp = tibia_bsp.subtract( union_cube2 );
                    result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
                result.geometry.computeVertexNormals();
                scene.add( result );
                result.rotation.set(-1.3,0,0);
                    cube_geometry.dispose();
                    scene.remove(cube_mesh);
                    scene.remove(cube_mesh2);
                    scene.remove(cube_mesh3);

                })  
                ////////////////////////////// Pente tibiale ///////////////////////////////////////////////

                changePente.onChange(function(x){


                   pente = x;
                    if(result!=null){
                        scene.remove(result);
                    }
                    var cube_geometry = new THREE.BoxGeometry( 60, 80, 40 );
                    cube_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 30 , 40 , 20 ) );
                    cube_mesh = new THREE.Mesh( cube_geometry );
                    cube_mesh.position.z = -coupe_tibiale;
                    cube_mesh.position.x = -coupe_sagittale;
                    cube_mesh.position.y = -30;

                    // cube_mesh.rotation.y = (varus*Math.PI)/180;
                    cube_mesh.name ="cube";
                    var cube_mesh2 = cube_mesh.clone();
                    cube_mesh2.rotation.x = -(x*Math.PI)/180;
                   // scene.add(cube_mesh2);
                    var cube_mesh3 = cube_mesh2.clone();
                    cube_mesh3.rotation.y = (varus*Math.PI)/180;

                    cube_bsp = new ThreeBSP( cube_mesh );
                    var cube_bsp2 = new  ThreeBSP( cube_mesh2 );
                    var cube_bsp3 = new  ThreeBSP( cube_mesh3 );
                    var union_cube = cube_bsp.union(cube_bsp2);
                    var union_cube2 = union_cube.union(cube_bsp3);
                    subtract_bsp = tibia_bsp.subtract( union_cube2 );
                    result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
                    result.geometry.computeVertexNormals();
                    scene.add( result );
                    result.rotation.set(-1.3,0,0);
                    cube_geometry.dispose();
                    scene.remove(cube_mesh);
                    scene.remove(cube_mesh2);
                    scene.remove(cube_mesh3);

                })  


                //////////////////////////////////////Varus //////////////////////////////////////////////
                  changeVarus.onChange(function(x){

                      varus = x;
                      if(result!=null){
                          scene.remove(result);
                      }
                      var cube_geometry = new THREE.BoxGeometry( 60, 80, 40 );
                      cube_geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 30 , 40 , 20 ) );
                      cube_mesh = new THREE.Mesh( cube_geometry );
                      cube_mesh.position.z = -coupe_tibiale;
                      cube_mesh.position.x = -coupe_sagittale;
                      cube_mesh.position.y = -30;

                      // cube_mesh.rotation.y = (varus*Math.PI)/180;
                      cube_mesh.name ="cube";
                      var cube_mesh2 = cube_mesh.clone();
                      cube_mesh2.rotation.x = -(pente*Math.PI)/180;
                      var cube_mesh3 = cube_mesh2.clone();
                      cube_mesh3.rotation.y = (x*Math.PI)/180;

                      cube_bsp = new ThreeBSP( cube_mesh );
                      var cube_bsp2 = new  ThreeBSP( cube_mesh2 );
                      var cube_bsp3 = new  ThreeBSP( cube_mesh3 );
                      var union_cube = cube_bsp.union(cube_bsp2);
                      var union_cube2 = union_cube.union(cube_bsp3);
                      subtract_bsp = tibia_bsp.subtract( union_cube2 );
                      result = subtract_bsp.toMesh( new THREE.MeshPhongMaterial({ shading: THREE.SmoothShading ,map: texture }) );
                      result.geometry.computeVertexNormals();
                      scene.add( result );
                      result.rotation.set(-1.3,0,0);
                      cube_geometry.dispose();
                      scene.remove(cube_mesh);
                      scene.remove(cube_mesh2);
                      scene.remove(cube_mesh3);

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

