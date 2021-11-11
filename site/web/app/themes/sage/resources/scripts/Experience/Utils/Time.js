import EventEmitter from './EventEmitter.js'
import Stats from 'stats.js'
import Experience from '../Experience.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.stats = this.experience.debug.stats

        // Setup
        
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        this.stats.begin()
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
        this.stats.end()
    }
}