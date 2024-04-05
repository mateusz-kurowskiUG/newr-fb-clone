// type generator ?

export interface ICountry {
  id: string
  flagEmoji: string | null
  flagSvg: string | null
  flagAlt: string | null
  nameEng: string
  namePol: string
  phoneCodeRoot: string | null
  //   language_id: string
}

export interface ICountryOptional {
  id?: string
  flagEmoji?: string | null
  flagSvg?: string | null
  flagAlt?: string | null
  nameEng?: string
  namePol?: string
  phoneCodeRoot?: string | null
}
