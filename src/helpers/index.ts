import dynamicString from 'dynamic-string'

const BASE_REM_PIXEL = 16

export const _remConverter = (pixels: number) => (1 / BASE_REM_PIXEL) * pixels

export const toRem = (pixels: number) => dynamicString('${converted}rem', { converted: _remConverter(pixels) })
