width = window.innerWidth / 16;
height = window.innerHeight / 16;

var div = document.querySelector( "#game" );
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( -width, width, height, -height, -30, 30 );

var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
div.appendChild( renderer.domElement );

camera.position.set( -1, 2.8, -2.9 );
camera.zoom = 8;
camera.updateProjectionMatrix();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    width = window.innerWidth / 16;
    height = window.innerHeight / 16;
    renderer.setSize( width * 16, height * 16 );
    camera.left = -width;
    camera.right = width;
    camera.top = height;
    camera.bottom = -height;
    camera.updateProjectionMatrix();
}

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enabled = false;

var pause = false;
var score = 0;
var scoreDiv = document.querySelector( "#score" );
var resetDiv = document.querySelector( "#reset" );

function endScore() {
    scoreDiv.style.transition = "top 2s, width 2s, left 2s, font-size 2s";
    scoreDiv.style.top = "50%";
    scoreDiv.style.width = "100%";
    scoreDiv.style.left = "0px";
    scoreDiv.style.fontSize = "300px";
    resetDiv.style.visibility = "visible";
}

function newScore() {
    scoreDiv.style.transition = "top 2s, width 2s, left 2s, font-size 2s";
    scoreDiv.style.top = "40px";
    scoreDiv.style.width = "0px";
    scoreDiv.style.left = "10px";
    scoreDiv.style.fontSize = "80px";
    resetDiv.style.visibility = "hidden";
    pause = false;
    init();
}


var pause = false;
document.addEventListener( "keyup", keyUp );
LEFT = 37;
UP = 38;
RIGHT = 39;
DOWN = 40;

function keyUp( e ) {
    e.preventDefault();
    onLog = false;
    if ( !pause ) {
        switch ( e.keyCode ) {
            case UP:
                hero.position.x = Math.round( hero.position.x );
                if ( !treeCollision( "up" ) ) {
                    hero.position.z++;
                }
                break;
            case DOWN:
                hero.position.x = Math.round( hero.position.x );
                if ( !treeCollision( "down" ) ) {
                    hero.position.z--;
                }
                break;
            case LEFT:
                if( !treeCollision ( "left" ) ) {
                    if( hero.position.x !== 4 ) {
                        hero.position.x++;
                    }
                }
                break;

            case RIGHT:
                if( !treeCollision ( "right" ) ) {
                    if( hero.position.x !== -4 ) {
                        hero.position.x--;
                    }
                }
                break;
        }
    } else {
        if ( e.keyCode == 13 ) {
            newScore();
        }
    }
}

var grass = [],
    grassCount = 0;
var water = [],
    waterCount = 0;
var road = [],
    roadCount = 0;

var deadTrees = [],
    deadCount = 0;
var trees = [],
    treeCount = 0;
var logs = [],
    logCount = 0;

var cars = [],
    carCount = 0;
var logSpeed = [],
    carSpeed = [];
var onLog = true;

var rowCount = 0;
var camCount = 0,
    camSpeed = .02;
    

var heroWidth = .7,
    carWidth = 1.5,
    logWidth = 2;
var cCollide = heroWidth / 2 + carWidth / 2 - .1;
var lCollide = ( heroWidth / 4 + logWidth / 4 ) + .5;

heroGeometry = new THREE.BoxGeometry( heroWidth, .69, heroWidth );
heroMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.FrontSide
});
heroGeometry.faces[2].color = new THREE.Colot(0xCC6C78);
heroGeometry.faces[3].color = new THREE.Colot(0xCC6C78);
heroGeometry.faces[4].color = new THREE.Colot(0xDD7C89);
heroGeometry.faces[5].color = new THREE.Colot(0xDD7C89);
heroGeometry.faces[10].color = new THREE.Colot(0xee8C99);
heroGeometry.faces[11].color = new THREE.Colot(0xee8C99);

terrain_geometry = new THREE.PlaneGeometry( 19, 1 );
grass_material = new THREE.MeshBasicMaterial({
    color: 0x55cc5f
});
water_material = new THREE.MeshBasicMaterial({
    color: 0x2Fe0e9
});
road_material = new THREE.MeshBasicMaterial({
    color: 0x777777
});

shade_geometry = new THREE.PlaneGeometry( 5, 500 );
shade_material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: .3
});

blind_material = new THREE.MeshBasicMaterial({
    color: 0xADD8E6
});

tree_geometry = new THREE.BoxGeometry( .6, 1, .6 );
tree_material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.FrontSide
});
tree_geometry.faces[2].color = new THREE.Color(0x006400);
tree_geometry.faces[3].color = new THREE.Color(0x006400);
tree_geometry.faces[4].color = new THREE.Color(0x008800);
tree_geometry.faces[5].color = new THREE.Color(0x008800);
tree_geometry.faces[10].color = new THREE.Color(0x009900);
tree_geometry.faces[11].color = new THREE.Color(0x009900);

car_geometry = new THREE.BoxGeometry( carWidth, .5, .7 );
car_material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.FrontSide
});

car_geometry.faces[2].color = new THREE.Color(0x0077FF);
car_geometry.faces[2].color = new THREE.Color(0x1177FF);
car_geometry.faces[2].color = new THREE.Color(0x3388FF);
car_geometry.faces[2].color = new THREE.Color(0x3388FF);
car_geometry.faces[2].color = new THREE.Color(0x5599FF);
car_geometry.faces[2].color = new THREE.Color(0x5599FF);

log_geometry = new THREE.BoxGeometry( logWidth, .25, .6 );
log_material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.FrontSide
});

log_geometry.faces[2].color = new THREE.Color(0x7F4D48);
log_geometry.faces[3].color = new THREE.Color(0x7F4D48);
log_geometry.faces[4].color = new THREE.Color(0x8F5C59);
log_geometry.faces[5].color = new THREE.Color(0x8F5C59);
log_geometry.faces[10].color = new THREE.Color(0x9F6D6A);
log_geometry.faces[11].color = new THREE.Color(0x9F6D6A);

hero = new THREE.Mesh( heroGeometry, heroMaterial );
hero.position.y = .25;
scene.add();

leftShade = new THREE.Mesh( shade_geometry, shade_material);
rightShade = new  THREE.Mesh( shade_geometry, shade_material );
leftBlind = new THREE.Mesh( shade_geometry, shade_material );
rightBlind = new THREE.Mesh( shade_geometry, shade_material );

grass[0] = new THREE.Mesh( terrain_geometry, grass_material );
water[0] = new THREE.Mesh( terrain_geometry, water_material );
road[0] = new THREE.Mesh( terrain_geometry, road_material );

trees[0] = new THREE.Mesh( terrain_geometry, grass_material );
cars[0] = new THREE.Mesh( car_geometry, car_material );
logs[0] = new THREE.Mesh( log_geometry, log_material );

leftShade.rotation.x = 270 * Math.PI / 180;
leftShade.position.set( 6.65, 1, 248.47 );
rightShade.rotation.x = 270 * Math.PI / 180;
rightShade.position.set( -7.35, 1, 248.47 );
leftBlind.rotation.x = 270 * Math.PI / 180;
leftBlind.position.set( 11.8, .6, 248.9 );
rightBlind.rotation.x = 270 * Math.PI / 180;
rightBlind.position.set( -12.2, .6, 248.9 );

scene.add( leftShade );
scene.add( rightShade );
scene.add( leftBlind );
scene.add( rightBlind );

grass[0].rotation.x = 270 * Math.PI / 180;
water[0].rotation.x = 270 * Math.PI / 180;
road[0].rotation.x = 270 * Math.PI / 180;

grass[0].position.z = -30;
water[0].position.z = -30;
road[0].position.z = -30;

trees[0].position.set( 0, .5, -30 );
cars[0].position.set( 0, .25, -30 );
logs[0].position.set( 0, 0, -30 );

for ( i = 0; i < 15; i++ ) {
    grass[i] = grass[0].clone();
    water[i] = water[0].clone();
    road[i] = road[0].clone();

    scene.add( grass[i] );
    scene.add( water[i] );
    scene.add( road[i] );
}

for( i = 0; i < 55; i++ ) {
    trees[i] = trees[0].clone();
    scene.add( trees[i] );
}

deadTreeGeo = new THREE.Geometry();
for( x = 0; x < 5; x++ ) {
    trees[0].position.set( x + 5, .4, 0 );
    THREE.GeometryUtils.merge( deadTreeGeo, trees[0] );
    trees[0].position.set( -( x + 5 ), .4, 0 );
    THREE.GeometryUtils.merge( deadTreeGeo, trees[0] );
} 

deadTrees[0] = new THREE.Mesh( deadTreeGeo, tree_material );

for( x = 0; x < 15; x++ ) {
    deadTrees[x] = deadTrees[0].clone();
    scene.add( deadTrees[x] );
}

for( i = 0; i < 48; i++ ) {
    cars[i] = cars[0].clone();
    scene.add( cars[i] );
}

for( i = 0; i < 40; i++ ) {
    logs[i] = logs[0].clone();
    scene.add( logs[i] );
}

function init() {
    score = 0;
    camera.position.z = -2.9;
    hero.position.set( 0, .25, 0 );
    hero.scale.y = 1;
    grassCount = 0;
    waterCount = 0;
    roadCount = 0;

    deadCount = 0;
    treeCount = 0;
    roadCount = 0;
    rowCount = 0;

    for( i = 0; i < 15; i++ ) {
        grass[i].position.z = -30;
        water[i].position.z = -30;
        road[i].position.z = -30;
        deadTrees[i].position.z = -30;
    }

    for( i = 0; i < 55; i++ ) {
        trees[i].position.z = -30;
        carSpeed[i] = 0;
        
        logs[i].position.z = -30;
        logSpeed[i] = 0;
    }

    tree_geometry();
    grass[grassCount].position.z = rowCount;
    deadTrees[grassCount].position.z = rowCount;
    grassCount++;
    rowCount++;
    for( i = 1; i < 15; i++ ) {
        newRow();
    }
}

function newRow() {
    if ( grassCount == 15 ) {
        grassCount = 0;
    }
    if ( roadCount == 15 ) {
        roadCount = 0;
    }
    if ( waterCount == 15 ) {
        waterCount = 0;
    }

    switch ( Math.floor( Math.random() * ( 4 - 1 ) ) + 1 ) {
        case 1:
            tree_geometry();
            grass[grassCount].position.z = rowCount;
            deadTrees[grassCount].position.z = rowCount;
            grassCount++;
            break;
        case 2:
            car_geometry();
            road[roadCount].position.z = rowCount;
            roadCount++;
            break;
        case 3:
            log_geometry();
            water[waterCount].position.z = rowCount;
            waterCount++;
            break;
    }

    rowCount++;
}

function tree_geometry() {
    for ( x = 0; x < 9; x++ ) {
        if ( x !== 4 && Math.random() > .6 ) {
            if ( treeCount < 54 ) {
                treeCount++;
            } else {
                treeCount = 0;
            }
            trees[treeCount].position.set( x - 4, .4, rowCount );
        }
    }
}

function car_geometry() {
    speed = ( Math.floor( Math.random() * ( 5 - 1 ) ) + 1 ) / 80;
    num_cars = Math.floor( Math.random() * ( 4 - 2 ) ) + 2;
    x_dir = 1;

    if ( Math.random() > .5 ) {
        x_dir = -1;
    }

    x_pos = -6 * x_dir;

    for ( x = 0; x < num_cars; x++ ) {
        if ( carCount < 39 ) {
            carCount++;
        } else {
            carCount = 0;
        }

        cars[carCount].position.set( x_pos, .25, rowCount );
        carSpeed[carCount] = speed * x_dir;

        x_pos -= 5 * x_dir;
    }
}

function log_geometry() {
    speed = ( Math.floor( Math.random() * ( 3 - 1 ) ) + 1 ) / 70;
    num_logs = Math.floor( Math.random() * ( 4 - 3 ) ) + 3;
    x_dir = 1;
    
    if ( Math.random() > .5 ) {
        x_dir = -1;
    }
    if ( logSpeed[logCount] = speed * x_dir ) {
        speed /= 1.5;
    }

    x_pos = -6 * x_dir;

    for ( x = 0; x < num_logs; x++ ) {
        if ( logCount < 39 ) {
            logCount++;
        } else {
            logCount = 0;
        }

        logs[logCount].position.set( x_pos, 0, rowCount );
        logSpeed[logCount] = speed * x_dir;

        x_pos -= 5 * x_dir;
    }
}

function drive() {
    for ( d = 0; d < cars.length; d++ ) {
        cars[d].position.x += carSpeed[d];
        logs[d].position.x += logSpeed[d];

        if ( cars[d].position.x > 11 && carSpeed[d] > 0 ) {
            cars[d].position.x = -11;
        } else if ( cars[d].position.x < -11 && carSpeed[d] < 0 ) {
            cars[d].position.x = 11;
        }
        if ( logs[d].position.x > 11 && logSpeed[d] > 0 ) {
            logs[d].position.x = -10;
        } else if ( logs[d].position.x < -11 && logSpeed[d] < 0 ) {
            logs[d].position.x = 10;
        }
    }
}

function treeCollision( dir ) {
    var z_pos = 0;
    var x_pos = 0;
    if ( dir == "up" ) {
        z_pos = 1;
    } else if ( dir == "down" ) {
        z_pos = -1;
    } else if ( dir == "left" ) {
        x_pos = 1;
    } else if ( dir == "right" ) {
        x_pos = -1;
    }

    for ( x = 0; x < trees.length; x++ ) {
        if ( hero.position.z + z_pos == trees[x].position.z ) {
            if ( hero.position.x + x_pos == trees[x].position.x ) {
                return true;
            }
        }
    }
}

function carCollision() {
    for ( c = 0; c < cars.length; c++ ) {
        if ( hero.position.z == cars[c].position.z ) {
            if ( hero.position.x < cars[c].position.x + cCollide && hero.position.x > cars[c].position.x - cCollide ) {
                hero.scale.y = 0;
                hero.position.y = .1;
                gameOver();
            }
        }
    }
}

function logCollision() {
    for ( l = 0; l < logs.length; l++ ) {
        if ( hero.position.z == logs[l].position.z ) {
            if ( hero.position.x < logs[l].position.x + lCollide && hero.position.x > cars[c].position.x - cCollide ) {
                hero.scale.y = 0;
                hero.position.y = .1;
                gameOver();
            }
        }
    }
}

function logCollision() {
    for ( l = 0; l < logs.length; l++ ) {
        if ( hero.position.z == logs[l].position.z ) {
            if ( hero.position.x < logs[l].position.x + lCollide && hero.position.x > logs[l].position.x - lCollide ) {
                onLog = true;
                if ( hero.position.x > logs[l].position.x ) {
                    hero.position.x = logs[l].position.x + .5;
                } else {
                    hero.position.x = logs[l].position.x - .5;
                }
                if ( hero.position.x > 5 || hero.position.x < -5 ) {
                    gameOver();
                }
            }
        }
    }
}

function waterCollision() {
    if ( onLog == false ) {
        for ( w = 0; w < water.length; w++ ) {
            if ( hero.position.z == water[w].position.z ) {
                gameOver();

                y = Math.sin( sineCount ) * .08-.2;
                sineCount += sineInc;
                hero.position.y = y;
                for ( w = 0; w < logSpeed.length; w++ ) {
                    if ( hero.position.z == logs[w].position.z ) {
                        hero.position.x += logSpeed[w] / 3;
                    }
                }
            }
        }
    }
}

function forwardScene() {
    if ( !pause ) {
        if ( Math.floor( camera.position.z ) < hero.position.z - 4 ) {
            camera.position.z += .033;
            if ( camCount > 1.8 ) {
                camCount = 0;
                newRow();
                newRow();
                newRow();
            } else {
                camCount += camSpeed;
            }
        } else {
            camera.position.z += .011;
            if ( camCount > 1.8 ) {
                camCount = 0;
                newRow();
            } else {
                camCount += camSpeed;
            }
        }
    }
}

function gameOver() {
    pause = true;
    endScore();
}

var sineCount = 0;
var sineInc = Math.PI / 50;

function render() {
    requestAnimationFrame( render );
    drive();
    carCollision();
    logCollision();
    waterCollision();
    forwardScene();

    if ( score < hero.position.z ) {
        score = hero.position.z;
    }
    scoreDiv.innerHTML = score;
    renderer.render( scene, camera );
}

init();
render();