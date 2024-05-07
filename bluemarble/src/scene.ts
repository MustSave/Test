import * as THREE from 'three';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10); // 카메라의 위치를 (0, 10, 20)으로 설정합니다.
camera.lookAt(0, 0, 0); // 카메라의 시선을 원점을 향하도록 설정합니다.
export const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// 카메라 컨트롤을 위한 변수를 초기화합니다.
const cameraControls = {
    moveSpeed: 0.1,
    rotateSpeed: 0.005
  };

  let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

// 마우스 이벤트를 감지하는 이벤트 리스너를 추가합니다.
document.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - previousMousePosition.x;
  const deltaY = event.clientY - previousMousePosition.y;

  // 마우스 이동에 따라 카메라를 회전시킵니다.
  camera.rotation.y -= deltaX * cameraControls.rotateSpeed;
  camera.rotation.x -= deltaY * cameraControls.rotateSpeed;

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
});
  
  // 키보드 입력을 감지하는 이벤트 리스너를 추가합니다.
  document.addEventListener('keydown', (event) => {
    const speed = -cameraControls.moveSpeed;
    const direction = new THREE.Vector3(); // 이동 방향을 저장할 벡터 생성

    // 카메라의 전방 방향 벡터를 계산합니다.
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);

    switch (event.key) {
        case 'w': // 위쪽으로 이동
            direction.copy(forward).multiplyScalar(-speed);
            camera.position.add(direction);
            break;
        case 'a': // 왼쪽으로 이동
            direction.crossVectors(new THREE.Vector3(0, 1, 0), forward).normalize();
            direction.multiplyScalar(-speed);
            camera.position.add(direction);
            break;
        case 's': // 아래쪽으로 이동
            direction.copy(forward).multiplyScalar(speed);
            camera.position.add(direction);
            break;
        case 'd': // 오른쪽으로 이동
            direction.crossVectors(new THREE.Vector3(0, 1, 0), forward).normalize();
            direction.multiplyScalar(speed);
            camera.position.add(direction);
            break;
    }
});
  
  // 카메라 컨트롤을 업데이트하는 애니메이션 루프를 만듭니다.
  function animate() {
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera); // 장면을 렌더링합니다.
  }
  
  // 애니메이션 루프를 시작합니다.
  animate();

  // 바닥의 크기를 설정합니다.
const groundSize = 10;

// 바닥의 geometry를 생성합니다.
const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);

// 바닥의 material을 생성합니다.
const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x123456,
  });
// 바닥을 나타내는 mesh를 생성합니다.
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// 바닥의 위치를 설정합니다.
ground.position.set(0, 0, 0);
// 평면을 x-z 평면에 수직으로 만듭니다.

ground.rotation.x = Math.PI * -0.5;

// 바닥을 scene에 추가합니다.
scene.add(ground);

// AmbientLight를 생성합니다.
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 색상, 강도
ambientLight.position.set(0, 2, 12);
scene.add(ambientLight);
