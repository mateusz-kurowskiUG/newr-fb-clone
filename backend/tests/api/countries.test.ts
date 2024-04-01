import { treaty } from '@elysiajs/eden'
import type { App } from '../../src'

const app = treaty<App>('localhost:5000/')

const x = await app.api.

console.log(x.data)
