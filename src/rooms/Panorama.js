import * as THREE from 'three';
import { Text, Position, ParentObject3D } from '../components/index.js';

var pano = null, context, panel, panelText;

const NUM_PANOS = 5;

const DATA = [
  'Sea floor with corals of Lakshadweep Islands, India.',
  'Tea Plantation of Happy Valley Tea Estate in Darjeeling, India.',
  'Rampura Agucha Mine of Rajasthan, India.',
  'A museum of antique artifacts, Europe',
  'The Archaeological Site of Jerash, Jordan',
];

var panoMaterials = [];

export function setup(ctx) {
  const assets = ctx.assets;
  const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  for (var i = 0; i < NUM_PANOS; i++) {
    const panoName = 'pano'+(i + 2);
    panoMaterials[i] = new THREE.MeshBasicMaterial( { map: assets[panoName], side: THREE.BackSide });
  }
  pano = new THREE.Mesh(geometry, panoMaterials[0]);

  panel = assets['hall_model'].scene.getObjectByName('infopanel');
  panel.material = new THREE.MeshBasicMaterial({color: 0x040404});
  panel.position.set(0, 0.1, 0);
  panel.parent.remove(panel);

  panelText = ctx.world.createEntity();
  panelText
    .addComponent(Text, {
      color: '#ffffff',
      fontSize: 0.03,
      anchor: 'left',
      textAlign: 'left',
      baseline: 'center',
      maxWidth: 0.34,
      lineHeight: 1.3,
      text: DATA[i],
    })
    .addComponent(ParentObject3D, {value: panel})
    .addComponent(Position, {x: -0.17, y: 0.003, z: 0.01});

  ctx.raycontrol.addState('panorama', {
    raycaster: false,
    onSelectEnd: onSelectEnd
  });
}

export function enter(ctx) {
  ctx.renderer.setClearColor(0x000000);

  const room = ctx.room - 5;
  panelText.getMutableComponent(Text).text = DATA[room];
  pano.material = panoMaterials[room];

  ctx.scene.add(pano);
  if (ctx.renderer.xr.getSession().inputSources[0].targetRayMode === "tracked-pointer") {
     ctx.controllers[1].add(panel);
  }
  else {
      panel.position.set(0, -0.25, -0.65);
      ctx.controllers[0].add(panel);
  }

  ctx.raycontrol.activateState('panorama');

  context = ctx;
}

export function exit(ctx) {
  ctx.scene.remove(pano);
  if (ctx.renderer.xr.getSession().inputSources[0].targetRayMode === "tracked-pointer") {
      ctx.controllers[1].remove(panel);
  }
  else {
      ctx.controllers[0].remove(panel);
  }

  ctx.raycontrol.deactivateState('panorama');
}

export function execute(ctx, delta, time) {
}

export function onSelectEnd(evt) {
  context.goto = 0;
}
