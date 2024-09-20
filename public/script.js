const socket = io();

// Update status based on received data
socket.on('mqtt_message', (data) => {
    console.log(`Received message from ${data.topic}: ${data.payload}`);
    try {
        const payload = JSON.parse(data.payload);
        updateStatus(payload);
    } catch (error) {
        console.error('Error parsing MQTT payload:', error);
    }
});

// Function to update the status in notifications
function updateStatus(payload) {
    if (payload.temperature !== undefined) {
        document.getElementById('temperature-status').innerText = `${payload.temperature} °C`;
    }
    if (payload.humidity !== undefined) {
        document.getElementById('humidity-status').innerText = `${payload.humidity} %`;
    }
    if (payload.soil_moisture !== undefined) {
        document.getElementById('soil-moisture-status').innerText = `${payload.soil_moisture}`;
    }
    if (payload.ldr !== undefined) {
        document.getElementById('ldr-status').innerText = `${payload.ldr}`;
    }
    if (payload.water_level !== undefined) {
        document.getElementById('water-level-status').innerText = `${payload.water_level}`;
    }
    if (payload.leds !== undefined) {
        document.getElementById('leds-status').innerText = payload.leds === '1' ? 'Active' : 'Inactive';
    }
    if (payload.water_pump !== undefined) {
        document.getElementById('water-pump-status').innerText = payload.water_pump === '1' ? 'Active' : 'Inactive';
    }
    if (payload.fan !== undefined) {
        document.getElementById('fan-status').innerText = payload.fan === '1' ? 'Active' : 'Inactive';
    }
    if (payload.buzzer !== undefined) {
        document.getElementById('buzzer-status').innerText = payload.buzzer === '1' ? 'Active' : 'Inactive';
    }
    if (payload.rain_sensor !== undefined) {
        document.getElementById('rain-detection-status').innerText = payload.rain_sensor === '1' ? 'Detected' : 'Not Detected';
    }
    if (payload.flame_sensor !== undefined) {
        document.getElementById('fire-warning-status').innerText = payload.flame_sensor === '1' ? 'Warning' : 'Safe';
    }
}


// Function to handle control actions
function sendControlCommand(topic, value) {
    fetch('/api/control', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic, value })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Command sent:', data);
        // Determine the status based on the topic
        const status = value === '1' ? 'Active' : 'Inactive';
        if (topic === 'leds_control_topic') {
            document.getElementById('leds-status').innerText = status;
        } else if (topic === 'water_pump_control_topic') {
            document.getElementById('water-pump-status').innerText = status;
        } else if (topic === 'fan_control_topic') {
            document.getElementById('fan-status').innerText = status;
        } else if (topic === 'buzzer_control_topic') {
            document.getElementById('buzzer-status').innerText = status;
        }
        // Optionally handle other topics if needed
    })
    .catch(error => console.error('Error:', error));
}

// Event listeners for control buttons
document.getElementById('leds-on').addEventListener('click', () => sendControlCommand('leds_control_topic', '1'));
document.getElementById('leds-off').addEventListener('click', () => sendControlCommand('leds_control_topic', '0'));
document.getElementById('water-pump-on').addEventListener('click', () => sendControlCommand('water_pump_control_topic', '1'));
document.getElementById('water-pump-off').addEventListener('click', () => sendControlCommand('water_pump_control_topic', '0'));
document.getElementById('fan-on').addEventListener('click', () => sendControlCommand('fan_control_topic', '1'));
document.getElementById('fan-off').addEventListener('click', () => sendControlCommand('fan_control_topic', '0'));
document.getElementById('buzzer-on').addEventListener('click', () => sendControlCommand('buzzer_control_topic', '1'));
document.getElementById('buzzer-off').addEventListener('click', () => sendControlCommand('buzzer_control_topic', '0'));




// navbar start
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

//navbar end
