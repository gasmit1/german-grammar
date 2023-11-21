import { WebVoiceProcessor } from '@picovoice/web-voice-processor';

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');


const engine = {
    onmessage: function(e) {
        switch (e.data.command) {
            case 'process':
                const inputData = e.data.inputFrame;
                // do something with the audio
                break;
        }
    }
}


startButton.addEventListener('click', async () => {
    // Once WebVoiceProcessor has at least one engine
    // subscribed, audio capture begins
    WebVoiceProcessor.subscribe(engine);
});


stopButton.addEventListener('click', () => {
    // Once WebVoiceProcessor no longer has engines
    // subscribed, audio capture stops
    WebVoiceProcessor.unsubscribe(engine);
});

