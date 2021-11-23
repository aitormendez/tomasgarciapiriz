import * as CANNON from 'cannon-es'
import gsap from 'gsap'

export function rotate(body, rotation, duration)
{
    gsap.to( 
        rotation, 
        { 
            duration: duration,
            val: (Math.random() -0.5) * 5,
            ease: "power1.easeOut",
            onUpdate: updateRotation
        })

    function updateRotation() {
        body.quaternion.setFromAxisAngle(
            new CANNON.Vec3(rotation.qx, rotation.qy, rotation.qz),
            Math.PI * rotation.val
        )
    }

    gsap.to(
        body.position, 
        {
            duration:1, 
            y: body.position.y + 10
        }
    )
}