const h1Tag = document.querySelector('h1')
const body = document.querySelector('body')

const getLatestResult = async () => {
  const url = 'https://api-proxy-eight.vercel.app/football/341'
  const resultRequest = await fetch(url)
  const leedsResult = await resultRequest.json()
  console.log(leedsResult)
  return leedsResult
}

const displayResult = (result) => {
  let homeTeam = result.matches[0].homeTeam.id
  let awayTeam = result.matches[0].awayTeam.id
  let winner = result.matches[0].score.winner

  if (
    (winner === 'HOME_TEAM' && homeTeam === 341) ||
    (winner === 'AWAY_TEAM' && awayTeam === 341)
  ) {
    h1Tag.textContent = 'Yes! 🥳'
    body.setAttribute('class', 'won')
  } else {
    h1Tag.textContent = 'No. 😭'
    body.setAttribute('class', 'lost')
  }
}

const refreshResult = async () => {
  try {
    const result = await getLatestResult()
    displayResult(result)
  } catch (error) {
    h1Tag.textContent = 'Hmm...'
    console.log(error)
  }
}

refreshResult()
