import React, {  useEffect } from 'react'
import styled from 'styled-components'

import useLocalStorage from '../Hooks/UseLocalStorage'
import NewsArticle from './NewsArticle'

const NEWSSERVICE = 'https://yjymxw64uayrr4a6.anvil.app/_/private_api/CQ5QZK23NH3UZY7HIQCUN45R/top-headlines/'

// Support couurty
// ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za
const COUNTRYMAP = new Map([
  ['US', 'us'],
  ['Argentina','ar'],
  ['Australia', 'au'],
  ['Brazil', 'br'],
  ['Canada', 'ca'],
  ['China', 'cn'],
  ['France', 'fr'],
  ['Germany', 'de'],
  ['Greece', 'gr'],
  ['Hong Kong', 'hk'],
  ['India', 'in'],
  ['Indonesia', 'id'],
  ['Italy', 'it'],
  ['Ireland', 'ie'],
  ['Japan', 'jp'],
  ['Korea', 'kr'],
  ['Malaysia', 'my'],
  ['Mexico', 'mx'],
  ['New Zealand', 'nz'],
  ['Philipplines', 'ph'],
  ['Portugal', 'pt'],
  ['Romania', 'ro'],
  ['Singapore', 'sg'],
  ['South Africa', 'za'],
  ['Sweden', 'se'],
  ['Switzerland', 'ch'],
  ['The Russian Federation', 'ru'],
  ['Taiwan', 'tw'],
  ['Thailand', 'th'],
  ['Turkey', 'tr'],
  ['UK', 'gb']
])


const Styles = styled.div`
  background-color: white;
  opacity: 1;
  width: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 650px;
  margin-left: 1rem;

  .title {
    font-size: larger;
    color: orange;
  }
`

function News() {
  const [lastTimeNewsGet, setLastTimeNewsGet] = useLocalStorage('lastTimeNewsGet', new Date())
  const [news, setNews] = useLocalStorage('currentNews', { articles: null })
  const [country, setCountry] = useLocalStorage('country', 'us')

  function requestNews(coutryCode) {
    fetch(`${NEWSSERVICE}${coutryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
      })
      .catch((err) => console.log(err));
  }

  function requestUpdateNews(coutryCode) {
    setNews({ articles: [] }); // cleanup the old news
    setLastTimeNewsGet(new Date());
    requestNews(coutryCode);
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    requestUpdateNews(event.target.value)
  }

  useEffect(() => {
    var gapNewsGetTime = new Date(new Date() - new Date(lastTimeNewsGet));
    var diffDay = gapNewsGetTime.getUTCDate() - 1
    var diffHour = gapNewsGetTime.getUTCHours()
    if (!news.articles || diffDay || diffHour) {    
      requestUpdateNews(country)
    }
  })

  const optionItems = []

  COUNTRYMAP.forEach((value, key) => {
    optionItems.push(<option key={key} value={value}>{key}</option>)
  })

  return (
    <Styles>
      <h3 className="title">
        <table>
          <tbody>
            <tr>
              <td>News</td>
              <td>
                <select
                  className="form-control"
                  style={{ width: 320 }}
                  onChange={handleCountryChange}
                  value={country}
                  >
                  {optionItems}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </h3>
      {(() => {
        if (news.articles) {
          return news.articles.map((article, index) => {
            return <NewsArticle key={index} article={article} />;
          });
        }
      })()}
    </Styles>
  );
}

export default News