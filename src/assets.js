import * as THREE from 'three';

export default {
  // hall
  foxr_tex: { url: 'foxr.png', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  hall_model: { url: 'hall.glb' },
  generic_controller_model: { url: 'generic_controller.glb' },
  lightmap_tex: { url: 'lightmap.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  controller_tex: { url: 'controller.basis' },
  doorfx_tex: { url: 'doorfx.basis', options: { wrapT: THREE.RepeatWrapping, wrapS: THREE.RepeatWrapping }},
  sky_tex: { url: 'sky.png', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  clouds_tex: { url: 'clouds.basis', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  teleport_model: { url: 'teleport.glb' },
  beam_tex: { url: 'beamfx.png' },
  glow_tex: { url: 'glow.basis', options: { encoding: THREE.sRGBEncoding} },
  newsticker_tex: { url: 'newsticker.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  zoomicon_tex: { url: 'zoomicon.png', options: { encoding: THREE.sRGBEncoding } },

  // panoramas
  panoballfx_tex: { url: 'ballfx.basis', options: { wrapT: THREE.RepeatWrapping, wrapS: THREE.RepeatWrapping } },

  stereopanoL: { url: 'stereopanoL.basis', options: { encoding: THREE.sRGBEncoding }},
  stereopanoR: { url: 'stereopanoR.basis', options: { encoding: THREE.sRGBEncoding }},
  pano1: { url: 'stereopano_small.basis', options: {encoding: THREE.sRGBEncoding} },

  pano2: { url: 'Ocean.jpg', options: { encoding: THREE.sRGBEncoding, flipY: true} },
  pano3: { url: 'Tea_plantation.jpg', options: { encoding: THREE.sRGBEncoding, flipY: true} },
  pano4: { url: 'Mine.jpg', options: { encoding: THREE.sRGBEncoding, flipY: true} },
  pano5: { url: 'Museum.jpg', options: { encoding: THREE.sRGBEncoding, flipY: true} },
  pano6: { url: 'Ancient_Rome.jpg', options: { encoding: THREE.sRGBEncoding, flipY: true} },

  // graffiti
  spray_model: { url: 'paintingBrush.glb' },

  // vertigo
  animationRoom_model: { url: 'animation_room.glb' },
  animationRoom_panel_tex: { url: 'animationRoom_panel_tex.png', options: { encoding: THREE.sRGBEncoding, flipY: false} },

  // photogrammetry object
  pg_floor_tex: { url: 'travertine2.basis', options: { encoding: THREE.sRGBEncoding, flipY: false, wrapT: THREE.RepeatWrapping, wrapS: THREE.RepeatWrapping} },
  pg_door_lm_tex: { url: 'pg_door_lm.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  pg_object_model: { url: 'buddha.glb' }, // TODO: try draco version, angel.min.gl
  pg_bg_tex: { url: 'pg_bg.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  pg_flare_tex: { url: 'flare.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  pg_panel_tex: { url: 'panel_tex.png', options: { encoding: THREE.sRGBEncoding, flipY: false} },

  // paintings
  painting_seurat_tex: { url: 'paintings/Bull.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  painting_sorolla_tex: { url: 'paintings/bird.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  painting_bosch_tex: { url: 'paintings/Battleship.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  painting_degas_tex: { url: 'paintings/Parrot.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  painting_rembrandt_tex: { url: 'paintings/Mars rover.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  painting_alps_tex: { url: 'paintings/Alps.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },
  painting_blackBird_tex: { url: 'paintings/Blackbird.jpg', options: { encoding: THREE.sRGBEncoding, flipY: false} },

  // sounds
  video_snd: { url: 'ogg/Video.ogg' },
  underwater_snd: { url: 'ogg/underwater.ogg' },
  plantation_snd: { url: 'ogg/plantation.ogg' },
  mining_snd: { url: 'ogg/mining.ogg' },
  museum_snd: { url: 'ogg/museum.ogg' },
  monument_snd: { url: 'ogg/monument.ogg' },
  teleport_a_snd: { url: 'ogg/teleport_a.ogg' },
  teleport_b_snd: { url: 'ogg/teleport_b.ogg' }
};

