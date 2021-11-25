import * as CANNON from 'cannon-es'
import gsap from 'gsap'
import { PolyhedronBufferGeometry } from 'three'

export function rotate(body, rotation, duration, valTo)
{

    body.w = new CANNON.Vec3(rotation.x, rotation.y, rotation.z)
    body.w.normalize()

    gsap.to(
        rotation,
        {
            val: valTo,
            duration: duration,
            ease: "power1.easeOut",
            onUpdate: updateRotation,
            onStart: () => body.rotation.val = valTo
        })

    

    function updateRotation() {
        body.quaternion.setFromAxisAngle(
            body.w,
            Math.PI * rotation.val
        )
        body.quaternion.normalize()
    }
}