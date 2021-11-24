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

export function flotar(body)
{
    gsap.to( 
        body.position, 
        { 
            z: body.position += 0.5,
            duration: 1, 
            repeat: -1, 
            yoyo: true, 
            ease: "power1.easeInOut", 
            // onUpdate: updateRotation 
        })
}