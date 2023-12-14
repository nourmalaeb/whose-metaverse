import {
  Unbounded,
  Lexend,
  Syne,
  League_Spartan,
  Inter,
  Epilogue,
  Figtree,
  Roboto_Flex,
  Big_Shoulders_Display,
} from 'next/font/google'
import localFont from 'next/font/local'

export const unbounded = Unbounded({ subsets: ['latin'] })
export const lexend = Lexend({ subsets: ['latin'] })
export const syne = Syne({ subsets: ['latin'] })
export const league_spartan = League_Spartan({ subsets: ['latin'] })
export const inter = Inter({ subsets: ['latin'] })
export const epilogue = Epilogue({ subsets: ['latin'] })
export const figtree = Figtree({ subsets: ['latin'] })
export const bigshoulders = Big_Shoulders_Display({ subsets: ['latin'] })

export const roboto_flex = Roboto_Flex({ subsets: ['latin'], axes: ['opsz', 'wdth'] })

export const rotonto = localFont({ src: './RotontoGX.ttf' })
