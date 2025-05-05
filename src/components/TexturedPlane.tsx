import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import React from "react";

export const TexturedPlane = React.memo(function TexturedPlane({
	pointer,
}: {
	pointer: React.RefObject<THREE.Vector3>;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const texture = useTexture("/images/home-shader.png");
	const lastPointer = useRef(new THREE.Vector3());

	useFrame(() => {
		if (
			meshRef.current &&
			pointer.current &&
			meshRef.current.material instanceof THREE.ShaderMaterial
		) {
			if (!lastPointer.current.equals(pointer.current)) {
				meshRef.current.material.uniforms.uDisplacement.value.copy(
					pointer.current
				);
				lastPointer.current.copy(pointer.current);
			}
		}
	});

	return (
		<mesh ref={meshRef} rotation-z={Math.PI / 4}>
			<planeGeometry args={[15, 15, 50, 50]} />
			<shaderMaterial
				transparent
				side={THREE.DoubleSide}
				depthWrite={false}
				uniforms={{
					uTexture: { value: texture },
					uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
				}}
				vertexShader={`
					varying vec2 vUv;
					uniform vec3 uDisplacement;

					float easeInOutCubic(float x) {
						return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
					}

					float map(float value, float min1, float max1, float min2, float max2) {
						return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
					}  

					void main() {
						vUv = uv;
						vec3 new_position = position; 
						vec4 localPosition = vec4(position, 1.0);
						vec4 worldPosition = modelMatrix * localPosition;

						float dist = length(uDisplacement - worldPosition.xyz);
						float min_distance = 3.;

						if (dist < min_distance) {
							float distance_mapped = map(dist, 0., min_distance, 1., 0.);
							float val = easeInOutCubic(distance_mapped);
							new_position.z += val;
						}

						gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
					}
				`}
				fragmentShader={`
					varying vec2 vUv;
					uniform sampler2D uTexture;

					void main() {
						vec4 color = texture2D(uTexture, vUv);
						gl_FragColor = color;
					}
				`}
			/>
		</mesh>
	);
});
