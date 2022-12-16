import * as THREE from 'three';
var scene, doorMaterial, door, mixer;

const objectNames = [
  'Animation',
  'Satellite',
  'GSLV',
];
var objects = {};
objectNames.forEach(i => { objects[i] = { animation: null, mesh: null } })

function createDoorMaterial(ctx) {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: {value: 0},
      selected: {value: 0},
      tex: {value: ctx.assets['doorfx_tex']}
    },
    vertexShader: ctx.shaders.basic_vert,
    fragmentShader: ctx.shaders.door_frag
  });
}

export function setup(ctx) {
  const assets = ctx.assets;
  scene = assets['animationRoom_model'].scene;
  scene.rotation.y = -Math.PI / 2;
        
  scene.getObjectByName('floor').material =
    new THREE.MeshBasicMaterial({map: assets['pg_floor_tex']});
  scene.getObjectByName('bg').material =
    new THREE.MeshBasicMaterial({map: assets['pg_bg_tex']});
  scene.getObjectByName('flare').material =
    new THREE.MeshBasicMaterial({map: assets['pg_flare_tex'], blending: THREE.AdditiveBlending});
  scene.getObjectByName('panel').material =
    new THREE.MeshBasicMaterial({map: assets['animationRoom_panel_tex']});
  scene.getObjectByName('door_frame').material =
    new THREE.MeshBasicMaterial({ map: assets['pg_door_lm_tex'] });

  doorMaterial = createDoorMaterial(ctx);
  door = scene.getObjectByName('door');
  door.material = doorMaterial;

  ctx.raycontrol.addState('doorVertigo', {
    colliderMesh: scene.getObjectByName('door'),
    onHover: (intersection, active) => {
      //teleport.onHover(intersection.point, active);
      const scale = intersection.object.scale;
      scale.z = Math.min(scale.z + 0.02 * (2 - door.scale.z), 0.8);
    },
    onHoverLeave: () => {
      //teleport.onHoverLeave();
    },
    onSelectStart: (intersection, e) => {
      ctx.goto = 0;
      //teleport.onSelectStart(e);
    },
    onSelectEnd: (intersection) => {
      //teleport.onSelectEnd(intersection.point);
    }
  });

  let teleport = scene.getObjectByName('teleport');
  teleport.visible = true;
  teleport.material.visible = false;
  ctx.raycontrol.addState('teleportVertigo', {
    colliderMesh: teleport,
    onHover: (intersection, active) => {
      ctx.teleport.onHover(intersection.point, active);
    },
    onHoverLeave: () => {
      ctx.teleport.onHoverLeave();
    },
    onSelectStart: (intersection, e) => {
      ctx.teleport.onSelectStart(e);
    },
    onSelectEnd: (intersection) => {
      ctx.teleport.onSelectEnd(intersection.point);
    }
  });

  mixer = new THREE.AnimationMixer(scene);
  const animations = assets['animationRoom_model'].animations;

  for (let id in objectNames) {
    var mesh = scene.getObjectByName(objectNames[id]);
      if (!mesh) { return; }
    objects[objectNames[id]].mesh = mesh;
    for ( let i in animations) {
      if (animations[i].name === objectNames[id]) {
        const action = mixer.clipAction(animations[i], mesh);
        action.loop = THREE.LoopRepeat;
        objects[objectNames[id]].animation = action;
      }
    }
  }
}

export function enter(ctx) {    
  ctx.renderer.setClearColor(0x000000);
  //ctx.renderer.setClearColor(0x677FA7);
  ctx.scene.add(scene);
  ctx.scene.parent.fog = new THREE.FogExp2(0x677FA7, 0.004);
  //ctx.cameraRig.position.set(0,0,0);

  ctx.raycontrol.activateState('teleportVertigo');
  ctx.raycontrol.activateState('doorVertigo');

  for (let i in objects) {
    if ( objects[i].animation ) {
      objects[i].animation.play();
    }
  }
}

export function exit(ctx) {
  ctx.scene.remove(scene);
  ctx.scene.parent.fog = null;

  ctx.raycontrol.deactivateState('teleportVertigo');
  ctx.raycontrol.deactivateState('doorVertigo');

    for (let i in objects) {
        if (objects[i].animation) {
            objects[i].animation.stop();
        }
    }
}

export function execute(ctx, delta, time) {
  doorMaterial.uniforms.time.value = time;

  mixer.update(delta);

  if (door.scale.z > 0.2) {
    door.scale.z = Math.max(door.scale.z - delta * door.scale.z, 0.2);
  }
}

