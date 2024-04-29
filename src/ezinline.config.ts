export default {
    properties: {
        flex: 'display-flex',
        col: 'flex-direction-column',
        weight: 'font-weight',
        brad: 'border-radius',
        w: (value:string) => `width-${value}%`,
        h: (value:string) => `height-${value}%`
    }
}