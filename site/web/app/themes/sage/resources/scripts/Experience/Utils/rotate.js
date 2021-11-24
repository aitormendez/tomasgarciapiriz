import * as CANNON from 'cannon-es'
import gsap from 'gsap'

export function rotate(body, rotation, duration, valTo)
{
    // rotation.val = valFrom

    gsap.to(

        rotation, 
        {
            val: valTo,
            duration: duration,
            ease: "power1.easeOut",
            onUpdate: updateRotation
        })

    function updateRotation() {
        body.quaternion.setFromAxisAngle(
            new CANNON.Vec3(rotation.x, rotation.y, rotation.z),
            Math.PI * rotation.val
        )
    }
}