const API_URL='http://localhost:8000/v1'

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try {
    const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })
  } catch (e) {
    return {
      ok: false
    }
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  return await fetch(`${API_URL}/launches`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  })
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete'
    })
  } catch (e) {
    console.log(e)
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};