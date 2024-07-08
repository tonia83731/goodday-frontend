export const taiwanCities: { zh: string; en: string }[] = [
  { zh: '臺北市', en: 'Taipei City' },
  { zh: '新北市', en: 'New Taipei City' },
  { zh: '桃園市', en: 'Taoyuan City' },
  { zh: '臺中市', en: 'Taichung City' },
  { zh: '臺南市', en: 'Tainan City' },
  { zh: '高雄市', en: 'Kaohsiung City' },
  { zh: '基隆市', en: 'Keelung City' },
  { zh: '新竹市', en: 'Hsinchu City' },
  { zh: '嘉義市', en: 'Chiayi City' },
  { zh: '新竹縣', en: 'Hsinchu County' },
  { zh: '苗栗縣', en: 'Miaoli County' },
  { zh: '彰化縣', en: 'Changhua County' },
  { zh: '南投縣', en: 'Nantou County' },
  { zh: '雲林縣', en: 'Yunlin County' },
  { zh: '嘉義縣', en: 'Chiayi County' },
  { zh: '屏東縣', en: 'Pingtung County' },
  { zh: '宜蘭縣', en: 'Yilan County' },
  { zh: '花蓮縣', en: 'Hualien County' },
  { zh: '臺東縣', en: 'Taitung County' },
  { zh: '澎湖縣', en: 'Penghu County' },
  { zh: '金門縣', en: 'Kinmen County' },
  { zh: '連江縣', en: 'Lienchiang County' }
]

export const taiwanCitiesZH = () => {
  return taiwanCities.map(({ zh }) => {
    return zh
  })
}
