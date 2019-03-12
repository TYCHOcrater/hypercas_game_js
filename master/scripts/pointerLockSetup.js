var pointerLock = ( function () {
    var controls;

    function init( camera, scene ) {
        this.controls = new THREE.PointerLockControls( camera );
        scene.add( this.controls.getObjects() );

        document.addEventListener( 'click', function( event ) {
            var element = document.getElementsByTagName( "canvas" )[0];

            function pointerLock( event ) {
                if( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                    pointerLock.controls.enabled = true;
                } else {
                    pointerLock.controls.enabled = false;
                }
            }

            document.addEventListener( 'pointerlockchange', lointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

            element.requestPointerLock = element.requestPointerLock || 
                element.mozRequestPointerLock ||
                element.webkitRequestPointerLock;

            element.requestPointerLock();
            
        }, false); 
    }

    return {
        init: init,
        controls: controls
    }
})(); 