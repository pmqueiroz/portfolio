import dynamicString from 'dynamic-string'
import _ from 'lodash'

const BASE_REM_PIXEL = 16

export const _remConverter = (pixels: number) => (1 / BASE_REM_PIXEL) * pixels

export const toRem = (pixels: number) => dynamicString('${converted}rem', { converted: _remConverter(pixels) })

export const slugFactory = (str: string) => _.kebabCase(str)

export * from './static'
