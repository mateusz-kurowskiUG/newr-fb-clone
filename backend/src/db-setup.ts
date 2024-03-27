import { truncateAll } from './db/db-setup-utils'
import insertCountries from './getCountries'

// truncate all tables
await truncateAll()

// insert countries
await insertCountries()
