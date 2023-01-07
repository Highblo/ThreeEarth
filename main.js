import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, pointLight;

window.addEventListener("load", init);

function init() {
  //シーンを追加
  scene = new THREE.Scene();

  //カメラを追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  //カメラのポジション設定
  camera.position.set(0, 0, 500);
  //レンダラーを作成
  renderer = new THREE.WebGLRenderer({ alpha: true });
  //サイズの設定
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //bodyの配下にレンダラーのDOMを挿入
  document.body.appendChild(renderer.domElement);

  //テクスチャの追加
  const texture = new THREE.TextureLoader().load("images/earth.jpg");

  //ジオメトリの作成
  const ballGeometry = new THREE.SphereGeometry(100, 64, 32);

  //マテリアルの作成
  const ballMaterial = new THREE.MeshPhysicalMaterial({ map: texture });

  //メッシュ化
  const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  //平行光源の追加
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  //ポイント光源
  pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  //ポイント光源ヘルパー
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
  scene.add(pointLightHelper);

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

//ブラウザのリサイズに対応させる
const onWindowResize = () => {
  //レンダラーのサイズを随時更新
  renderer.setSize(window.innerWidth, window.innerHeight);

  //カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const animate = () => {
  //ポイント光源を球体の周りを巡回させる
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
