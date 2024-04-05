import { isCuid } from '@paralleldrive/cuid2'
import { type ICountry } from '../ICountry'

export const isCountry = (country: ICountry): country is ICountry => {
  return (
    typeof country === 'object' &&
    typeof country.id === 'string' &&
    isCuid(country.id) &&
    (typeof country.flagEmoji === 'string' || country.flagEmoji === null) &&
    (typeof country.flagAlt === 'string' || country.flagAlt === null) &&
    typeof country.nameEng === 'string' &&
    typeof country.namePol === 'string' &&
    (typeof country.phoneCodeRoot === 'string' ||
      country.phoneCodeRoot === null) &&
    (typeof country.flagSvg === 'string' || country.flagSvg === null)
  )
}
