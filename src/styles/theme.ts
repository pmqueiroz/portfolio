import { toRem } from '../helpers'

export const theme = {
    colors: {
        base: '#fafafa',
        dark: '#061818',
        gray: '#bababa',
        lightGray: '#eaeaea',
        red: '#F02D3A',
        orange: '#f8961e'
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
