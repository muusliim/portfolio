import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";

interface InteractionProps {
	pointerRef: React.RefObject<THREE.Vector3>;
	hitRef: React.RefObject<THREE.Mesh<
		THREE.BufferGeometry,
		THREE.Material
	> | null>;
}

export function Interaction({ pointerRef, hitRef }: InteractionProps) {
	const { camera } = useThree();
	const raycaster = useRef(new THREE.Raycaster());
	const pointer = useRef(new THREE.Vector2());

	useEffect(() => {
		function handlePointerMove(event: PointerEvent | TouchEvent) {
			let x = 0;
			let y = 0;

			if (event instanceof TouchEvent && event.touches.length > 0) {
				x = event.touches[0].clientX;
				y = event.touches[0].clientY;
			} else if (event instanceof PointerEvent) {
				x = event.clientX;
				y = event.clientY;
			}

			pointer.current.x = (x / window.innerWidth) * 2 - 1;
			pointer.current.y = -(y / window.innerHeight) * 2 + 1;
		}

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("touchmove", handlePointerMove);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("touchmove", handlePointerMove);
		};
	}, []);

	useFrame(() => {
		if (!hitRef.current) return;

		raycaster.current.setFromCamera(pointer.current, camera);
		const intersects = raycaster.current.intersectObject(hitRef.current);

		if (intersects.length > 0) {
			pointerRef.current.copy(intersects[0].point);
		}
	});

	return null;
}
