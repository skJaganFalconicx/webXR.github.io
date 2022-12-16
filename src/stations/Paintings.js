import * as THREE from 'three';
import { Color, Vector3 } from 'three';
import assets from '../assets';

var paintings;
var zoom = {object: null, widget: null, controller: null, animation: 0, icon: null};
const PAINTINGS = ['seurat', 'sorolla', 'bosch', 'degas', 'rembrandt'];
const RATIOS = [1, 1, 0.5, 0.5, 1];
const ZOOMS = [0.4, 0.2, 0.2, 0.4, 0.25];
var paintingsList = [];
var currentpainting = 0;


export function enter(ctx) {
  ctx.raycontrol.activateState('paintings');
  ctx.raycontrol.activateState('previousPainting');
  ctx.raycontrol.activateState('nextPainting');
}

export function setup(ctx, hall) {
  for (let i in PAINTINGS) {
    let painting = PAINTINGS[i];
    let mesh = hall.getObjectByName(painting);
    if (!mesh) { continue; }

    let paintingTexture = ctx.assets[`painting_${painting}_tex`];
    mesh.material = new THREE.MeshBasicMaterial({
      map: paintingTexture
    });
    mesh.userData.paintingId = i;
  }

  paintings = hall.getObjectByName('paintings');

  zoom.widget = new THREE.Mesh(
    new THREE.PlaneGeometry(),
    new THREE.ShaderMaterial({
        uniforms: {
          time: {value: 0},
          tex: {value: null},
          zoomPos: {value: new THREE.Vector2()},
          zoomAmount: {value: 0},
          zoomRatio: {value: 1}
        },
        vertexShader: ctx.shaders.basic_vert,
        fragmentShader: ctx.shaders.zoom_frag,
        transparent: true,
        depthTest: false,
        depthWrite: false
      })
  );
  zoom.widget.geometry.rotateY(-Math.PI / 2);
  zoom.widget.visible = false;

  zoom.icon = new THREE.Mesh(
    new THREE.PlaneGeometry(0.2, 0.2),
    new THREE.MeshBasicMaterial({
      map: ctx.assets['zoomicon_tex'],
      transparent: true
      //side: THREE.DoubleSide
    })
  );
  zoom.icon.geometry.rotateY(-Math.PI / 2);
  zoom.icon.visible = false;

  ctx.scene.add(zoom.icon);
  ctx.scene.add(zoom.widget);

  ctx.raycontrol.addState('paintings', {
    colliderMesh: hall.getObjectByName('paintings'),
    onHover: (intersection, active, controller) => {
      if (intersection.distance > 3) { return; }
      if (active) {
        zoom.painting = intersection.object;
        zoom.controller = controller;
        zoom.widget.material.uniforms.tex.value = zoom.painting.material.map;
        zoom.widget.material.uniforms.zoomRatio.value = RATIOS[intersection.object.userData.paintingId];
        zoom.widget.visible = true;
        refreshZoomUV(intersection);
      } else {
        zoom.icon.visible = true;
        zoom.icon.position.copy(intersection.point);
        zoom.icon.position.x -= 0.01;
      }
    },
    onHoverLeave: (intersection) => {
      zoom.painting = null;
      zoom.animation = 0;
      zoom.widget.visible = false;
      zoom.icon.visible = false;
    },
    onSelectStart: (intersection, controller) => {
      if (intersection.distance < 3) {
        zoom.painting = intersection.object;
        zoom.controller = controller;
        zoom.widget.material.uniforms.tex.value = zoom.painting.material.map;
        zoom.widget.material.uniforms.zoomRatio.value = RATIOS[intersection.object.userData.paintingId];
        zoom.widget.visible = true;
        zoom.icon.visible = false;
        refreshZoomUV(intersection);
      }
    },
    onSelectEnd: (intersection) => {
      zoom.painting = null;
      zoom.animation = 0;
      zoom.widget.visible = false;
    }
  });

    // my code
    paintingsList.push(ctx.assets['painting_rembrandt_tex']);
    paintingsList.push(ctx.assets['painting_alps_tex']);
    paintingsList.push(ctx.assets['painting_blackBird_tex']);
    const paintingToLoop = hall.getObjectByName('rembrandt');

    ctx.raycontrol.addState('previousPainting', {
        colliderMesh: hall.getObjectByName('Arrow__0'),
        onHover: (intersection, active, controller) => {
            if (intersection.distance > 5) { return; }
            intersection.object.material.color = new THREE.Color(0x00ffef);
            intersection.object.scale.x = 1.2;
            intersection.object.scale.y = 1.2;
            intersection.object.scale.z = 1.2;
        },
        onHoverLeave: (intersection) => {
            intersection.object.material.color = new THREE.Color(0xffffff);
            intersection.object.scale.x = 1;
            intersection.object.scale.y = 1;
            intersection.object.scale.z = 1;
        },
        onSelectStart: (intersection, controller) => {
            if (intersection.distance < 5) {
                currentpainting -= 1;
                if (currentpainting < 0) { currentpainting = paintingsList.length - 1; }
                paintingToLoop.material.map = paintingsList[currentpainting];
            }
        },
        onSelectEnd: (intersection) => {

        }
    });
    ctx.raycontrol.addState('nextPainting', {
        colliderMesh: hall.getObjectByName('Arrow__1'),
        onHover: (intersection, active, controller) => {
            if (intersection.distance > 5) { return; }
            intersection.object.material.color = new THREE.Color(0x00ffef);
            intersection.object.scale.x = 1.2;
            intersection.object.scale.y = 1.2;
            intersection.object.scale.z = 1.2;
        },
        onHoverLeave: (intersection) => {
            intersection.object.material.color = new THREE.Color(0xffffff);
            intersection.object.scale.x = 1;
            intersection.object.scale.y = 1;
            intersection.object.scale.z = 1;
        },
        onSelectStart: (intersection, controller) => {
            if (intersection.distance < 5) {
                currentpainting += 1;
                if (currentpainting === paintingsList.length) { currentpainting = 0; }
                paintingToLoop.material.map = paintingsList[currentpainting];
            }
        },
        onSelectEnd: (intersection) => {

        }
    });
}

export function execute(ctx, delta, time) {
  if (zoom.painting) {
      if (zoom.animation < 1) {
        zoom.animation += (1 - zoom.animation) * delta * 4.0;
      }
    zoom.widget.material.uniforms.time.value = time;
  }
}

var minUV = new THREE.Vector2();
var maxUV = new THREE.Vector2();

function refreshZoomUV(hit) {
  zoom.widget.position.copy(hit.point);
  zoom.widget.position.x -= 0.5 * zoom.animation;

  const uvs = zoom.widget.geometry.faceVertexUvs[0];
  zoom.widget.material.uniforms.zoomPos.value.copy(hit.uv);
  zoom.widget.material.uniforms.zoomAmount.value = ZOOMS[hit.object.userData.paintingId];
}
