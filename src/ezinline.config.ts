export default {
    properties: {
        weight: 'font-weight',
        brad: 'border-radius',
        w: (value:string) => `width-${value}%`
    }
}