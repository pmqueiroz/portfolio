import { toRem } from '../helpers'

export const theme = {
    colors: {
        base: '#fafafa',
        dark: '#061818',
        gray: '#bababa',
        lightGray: '#eaeaea',
        darkGray: '#888888',
        red: '#F02D3A',
        orange: '#f8961e',
        orangeLight: '#f8961e60'
    },
    global: {
        sizes: {
            navigationHeight: toRem(128)
        },
        breakpoints: {
            mobile: 1000
        }
    }
}
