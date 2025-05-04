"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useRef } from "react";
import TexturedPlane from "./TexturedPlane";
import Interaction from "./Interaction";
import ShadowPlane from "./ShadowPlane";

export function TextOnPlane() {
	const pointer = useRef(new THREE.Vector3());
	const hitPlane =
		useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material>>(null);

	function ResponsiveCamera() {
		const { camera, size } = useThree();

		useEffect(() => {
			if (camera instanceof THREE.OrthographicCamera) {
				const baseZoom = 60;
				const scaleFactor = size.width < 768 ? 0.43 : 1.0; // адаптивность для мобилок
				camera.zoom = baseZoom * scaleFactor * (size.height / 800); // нормализация по высоте
				camera.updateProjectionMatrix();
			}
		}, [camera, size]);

		return null;
	}

	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center">
			<Canvas
				orthographic
				camera={{
					position: [0, -10, 6],
					zoom: 80,
				}}
			>
				<mesh ref={hitPlane}>
					<planeGeometry args={[200, 200]} />
					<meshBasicMaterial transparent opacity={0} depthWrite={false} />
				</mesh>

				<Suspense fallback={null}>
					<TexturedPlane pointer={pointer} />
				</Suspense>
				<Interaction pointerRef={pointer} hitRef={hitPlane} />
				<ShadowPlane pointer={pointer} />

				<ResponsiveCamera />
			</Canvas>
		</div>
	);
}
