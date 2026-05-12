// app/fonts.ts
import localFont from 'next/font/local'

export const peyda = localFont({
    src: [
        {
            path: './fonts/Peyda-Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: './fonts/Peyda-Regular.ttf',
            weight: '400',  // Normal default
            style: 'normal',
        },
        {
            path: './fonts/Peyda-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/Peyda-Bold.ttf',
            weight: '700',  // Standard bold
            style: 'normal',
        },
        {
            path: './fonts/Peyda-Black.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-peyda',
    display: 'swap',
})
