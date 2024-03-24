interface ICountry {
  id: string
  flag_emoji?: string | null
  flag_svg?: string | null
  flag_alt?: string | null
  name_eng: string
  name_pol: string
  phone_code_root?: string | null
  //   language_id: string
}
export default ICountry
