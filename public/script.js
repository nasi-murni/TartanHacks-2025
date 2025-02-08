// Populate timezone dropdowns
function populateTimezones() {
    const timezones = Intl.supportedValuesOf('timeZone');
    const departureSelect = document.getElementById('departureTimezone');
    const arrivalSelect = document.getElementById('arrivalTimezone');
    
    timezones.forEach(timezone => {
        const option = new Option(timezone, timezone);
        departureSelect.add(option.cloneNode(true));
        arrivalSelect.add(option);
    });
}

// Handle form submission
document.getElementById('flightForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const recommendation = document.getElementById('recommendation');
    
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    
    const formData = {
        departureCity: document.getElementById('departure').value,
        departureTimezone: document.getElementById('departureTimezone').value,
        departureTime: document.getElementById('departureTime').value,
        arrivalCity: document.getElementById('arrival').value,
        arrivalTimezone: document.getElementById('arrivalTimezone').value,
        flightDuration: document.getElementById('flightDuration').value
    };

    try {
        const response = await fetch('/api/get-sleep-schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            recommendation.textContent = data.recommendation;
            result.classList.remove('hidden');
        } else {
            throw new Error(data.error || 'Failed to get sleep schedule');
        }
    } catch (error) {
        recommendation.textContent = 'Error: ' + error.message;
        result.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
});

// Initialize timezone dropdowns when page loads
document.addEventListener('DOMContentLoaded', populateTimezones); 