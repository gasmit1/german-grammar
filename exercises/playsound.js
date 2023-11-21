// JavaScript Document
const playHtToken = '4055021b9cc842d29cc95eaa9e96566f'
const playHtUserId = 'fDbp6imsSgcflh2dtcSfqI0YFqP2'

async function tts(text) {
  try {
    const conversionResponse = await fetch('https://play.ht/api/v1/convert', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        AUTHORIZATION: playHtToken,
        'X-USER-ID': playHtUserId,
      },
      body: JSON.stringify({
        voice: 'Vicki',
        content: [text],
      }),
    })

    if (!conversionResponse.ok) {
      console.error('TTS conversion request failed')
      return null
    }

    const conversion = await conversionResponse.json()
    const jobId = conversion.transcriptionId

    if (typeof jobId !== 'string') {
      console.error('Invalid TTS job ID')
      return null
    }

    for (let tries = 1; tries <= 20; tries++) {
      const jobStatusResponse = await fetch(`https://play.ht/api/v1/articleStatus?transcriptionId=${jobId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          AUTHORIZATION: playHtToken,
          'X-USER-ID': playHtUserId,
        },
      })

      if (!jobStatusResponse.ok) {
        console.error('Error getting TTS job status')
        return null
      }

      const jobStatus = await jobStatusResponse.json()

      if (jobStatus.converted) {
        if (typeof jobStatus.audioUrl !== 'string') {
          console.error('Invalid TTS audio URL')
          return null
        }

        return jobStatus.audioUrl
      }

      await new Promise(resolve => setTimeout(resolve, tries * 100))
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

async function playTts(element) {
  if (document.getElementById('audioSwitch').checked) {
    const url = await tts(element.innerText)
    if (url !== null) {
     const ttsPlaybackElement = document.getElementById('ttsPlayback')
      ttsPlaybackElement.src = url
      ttsPlaybackElement.play()
    }
  }
}

function onCueClick(field) {
  playTts(field)
}

function onTranslationClick(field) {
  field.style.opacity = field.style.opacity === 1 ? 0 : 1
}

function onAnswerClick(field) {
  if (field.style.opacity == 1) {	
    field.style.opacity = 0
  } else {	
    field.style.opacity = 1
    playTts(field)
  }
}