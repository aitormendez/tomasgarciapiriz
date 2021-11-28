import * as CANNON from 'cannon-es'
import gsap from 'gsap'
import { PolyhedronBufferGeometry } from 'three'

export function rotate(body, rotacion, duration, valTo)
{

    body.w = new CANNON.Vec3(rotacion.vector.x, rotacion.vector.y, rotacion.vector.z)
    body.w.normalize()

    gsap.to(
        rotacion,
        {
            val: valTo,
            duration: duration,
            ease: "power1.easeOut",
            onUpdate: updateRotation,
            onStart: () => body.rotacion.val = valTo
        })

    function updateRotation() {
        body.quaternion.setFromAxisAngle(
            body.w,
            Math.PI * rotacion.val
        )
    }
}