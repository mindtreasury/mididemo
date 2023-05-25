// Include Tone.js
import * as Tone from 'tone';
import { displayMap } from './map';

// Check if WebMIDI is supported
if (navigator.requestMIDIAccess) {
    console.log('WebMIDI is supported in this browser.');
} else {
    alert('WebMIDI is not supported in this browser.');
}

function startmidi() { // Request MIDI access
    navigator.requestMIDIAccess()
        .then(onMIDISuccess, onMIDIFailure);
}

function onMIDISuccess(midiAccess) {
    console.log('MIDI Access Object', midiAccess);

    // When we get a succesful response, run this code
    var inputs = midiAccess.inputs;

    // Attach MIDI event "listeners" to each input
    for (var input of inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    alert('Could not access your MIDI devices.');
}

function getMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;

    switch (command) {
        case 144: // noteOn
            if (velocity > 0) {
                noteOn(note, velocity);
            } else {
                noteOff(note);
            }
            break;
        case 128: // noteOff
            noteOff(note);
            break;
    }
}

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function noteOn(note, velocity) {
    synth.triggerAttack(Tone.Midi(note), Tone.now(), velocity / 5);
}

function noteOff(note) {
    synth.triggerRelease(Tone.Midi(note), Tone.now());
}

document.getElementById("start_btn").addEventListener("click", function() {
    startmidi()
    document.getElementById("start_btn").remove()
    displayMap()
});

