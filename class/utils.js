function onWindowResize(camera,renderer) {

		    windowHalfX = window.innerWidth / 2;
		    windowHalfY = window.innerHeight / 2;
		    camera.aspect = window.innerWidth / window.innerHeight;
		    camera.updateProjectionMatrix();
		    renderer.setSize(window.innerWidth, window.innerHeight);
		    var body = document.getElementById("body");
		    body.appendChild(renderer.domElement);

		}


function saveValueTibialPlanification(){

	 var valeur_embase = parseInt(document.getElementById('valeur_embase').innerHTML);
     var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML);
     var valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML);
     var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
     var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML);
     sessionStorage.setItem("valeur_embase",valeur_embase);
     sessionStorage.setItem("valeur_coupeSagittale",valeur_coupeSagittale);
     sessionStorage.setItem("valeur_coupeTibiale",valeur_coupeTibiale);
     sessionStorage.setItem("valeur_varus",valeur_varus);
     sessionStorage.setItem("valeur_penteTibiale",valeur_penteTibiale);

}
function saveValueFemurPlanification(){

	 //var valeur_condyle = parseInt(document.getElementById('valeur_embase').innerHTML);
     var valeur_coupeFemorale = parseInt(document.getElementById('valeur_coupeFemorale').innerHTML);
     var valeur_deplacementCondyle = parseInt(document.getElementById('valeur_deplacer').innerHTML);    
     sessionStorage.setItem("valeur_coupeFemorale",valeur_coupeFemorale);
     sessionStorage.setItem("valeur_deplacementCondyle",valeur_deplacementCondyle);
}
function getCondyle(){

	return parseInt(sessionStorage.getItem("valeur_condyle"));
}
function getDeplacement(){
	return parseInt(sessionStorage.getItem("valeur_deplacementCondyle"));
}
function getCoupeFemorale(){
	return parseInt(sessionStorage.getItem("valeur_coupeFemorale"));
}

function getVarus(){
	return parseInt(sessionStorage.getItem("valeur_varus"));
}
function getEmbase(){
	return parseInt(sessionStorage.getItem("valeur_embase"));
}
function getCoupeSagittale(){
	return parseInt(sessionStorage.getItem("valeur_coupeSagittale"));
}

function getCoupeTibiale(){
	return parseInt(sessionStorage.getItem("valeur_coupeTibiale"));
}
function getPenteTibiale(){
	return parseInt(sessionStorage.getItem("valeur_penteTibiale"));
}