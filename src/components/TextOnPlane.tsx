"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useRef } from "react";
import { TexturedPlane } from "./TexturedPlane";
import { Interaction } from "./Interaction";
import { ShadowPlane } from "./ShadowPlane";
import { Html } from "@react-three/drei";

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
		<div className="absolute inset-0 flex items-center justify-center [contain:strict]">
			<Canvas
				gl={{ powerPreference: "high-performance" }}
				dpr={[1, 2]}
				orthographic
				camera={{
					position: [0, -10, 6],
					zoom: 80,
				}}
			>
				<mesh ref={hitPlane}>
					<planeGeometry args={[100, 100]} />
					<meshBasicMaterial transparent opacity={0} depthWrite={false} />
				</mesh>

				<Suspense
					fallback={
						<Html center>
							<div className="flex justify-center items-center">
								<div className="w-8 h-8 md:w-16 md:h-16 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
							</div>
						</Html>
					}
				>
					<TexturedPlane pointer={pointer} />
					<Interaction pointerRef={pointer} hitRef={hitPlane} />
					<ShadowPlane pointer={pointer} />
				</Suspense>

				<ResponsiveCamera />
			</Canvas>
		</div>
	);
}
