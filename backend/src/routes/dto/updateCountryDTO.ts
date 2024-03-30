import { t } from 'elysia'

const updateCountryDTO = t.Object(
  {
    flagEmoji: t.String({
      error: 'Flag emoji must be a string',
      description: 'The flag emoji of the country.',
      examples: ['🇵🇱'],
      title: 'Flag Emoji'
    }),
    flagSvg: t.String({
      error: 'Flag SVG must be a string',
      description: 'The flag SVG of the country.',
      examples: ['https://restcountries.com/data/pol.svg'],
      format: 'uri',
      title: 'Flag SVG'
    }),
    flagAlt: t.String({
      error: 'Flag alt must be a string',
      description: 'The flag alt of the country.',
      examples: ['Flag of Poland'],
      title: 'Flag Alt'
    }),
    nameEng: t.String({
      error: 'Name must be a string',
      description: 'The name of the country in English.',
      examples: ['Poland'],
      title: 'Englush name'
    }),
    namePol: t.String({
      error: 'Name must be a string',
      description: 'The name of the country in Polish.',
      examples: ['Polska'],
      title: 'Polish name'
    }),
    phoneCodeRoot: t.String({
      error: 'Phone code root must be a string',
      description: 'The phone code root of the country.',
      examples: ['48'],
      title: 'Phone Code Root'
    })
  },
  {
    error: 'Invalid request body',
    description:
      'The request body must contain a flag emoji, flag SVG, flag alt, English name, Polish name, and phone code root of the country.',
    examples: [
      {
        flagEmoji: '🇵🇱',
        flagSvg: 'https://restcountries.com/data/pol.svg',
        flagAlt: 'Flag of Poland',
        nameEng: 'Poland',
        namePol: 'Polska',
        phoneCodeRoot: '48'
      }
    ],

    title: 'Update Country DTO'
  }
)

export default updateCountryDTO
