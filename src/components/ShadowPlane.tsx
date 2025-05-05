"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RefObject, useRef } from "react";
import { useTexture } from "@react-three/drei";

export function ShadowPlane({
	pointer,
}: {
	pointer: RefObject<THREE.Vector3>;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const texture = useTexture("/images/home-shader-shadow.png");

	const shaderMaterial = useRef(
		new THREE.ShaderMaterial({
			uniforms: {
				uTexture: { value: texture },
				uDisplacement: { value: new THREE.Vector3() },
			},
			vertexShader: `
        varying vec2 vUv;
        varying float dist;
        uniform vec3 uDisplacement;

        void main() {
          vUv = uv;
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          dist = length(uDisplacement - worldPosition.xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
			fragmentShader: `
        varying vec2 vUv;
        varying float dist;
        uniform sampler2D uTexture;

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          float min_distance = 1.5;

          if (dist < min_distance) {
            float alpha = map(dist, min_distance, 0.0, color.a, 0.0);
            color.a = alpha;
          }

          gl_FragColor = vec4(color);
        }
      `,
			transparent: true,
			depthWrite: false,
			side: THREE.DoubleSide,
		})
	).current;

	// Обновление displacement каждый кадр
	useFrame(() => {
		shaderMaterial.uniforms.uDisplacement.value.copy(pointer.current);
	});

	return (
		<mesh ref={meshRef} rotation-z={Math.PI / 4}>
			<planeGeometry args={[15, 15, 100, 100]} />
			<primitive object={shaderMaterial} attach="material" />
		</mesh>
	);
}
