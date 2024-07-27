document.addEventListener('DOMContentLoaded', () => {
    const roomSelect = document.getElementById('room');
    const applianceSelect = document.getElementById('appliance');
    const roleSelect = document.getElementById('role');
    const viewDataButton = document.getElementById('view-data');
    const userDataDiv = document.getElementById('user-data');
    const adminDataDiv = document.getElementById('admin-data');

    const appliancesByRoom = {
        'living-room': ['TV', 'Fan', 'Lights 1', 'Lights 2', 'Speakers'],
        'bathroom': ['Geyser', 'Lights'],
        'kitchen': ['Electric Chimney', 'Lights', 'Induction Stoves'],
        'bedroom1': ['AC', 'Fan', 'Heaters', 'Lights'],
        'bedroom2': ['AC', 'Fan', 'Heaters', 'Lights'],
    };

    const applianceData = {
        'TV': { current: '1.5A', voltage: '220V', power: '330W' },
        'Fan': { current: '0.5A', voltage: '220V', power: '110W' },
        'Lights 1': { current: '0.2A', voltage: '220V', power: '44W' },
        'Lights 2': { current: '0.3A', voltage: '220V', power: '66W' },
        'Speakers': { current: '1.0A', voltage: '220V', power: '220W' },
        'Geyser': { current: '10.0A', voltage: '220V', power: '2200W' },
        'Electric Chimney': { current: '1.2A', voltage: '220V', power: '264W' },
        'Induction Stoves': { current: '8.0A', voltage: '220V', power: '1760W' },
        'AC': { current: '5.0A', voltage: '220V', power: '1100W' },
        'Heaters': { current: '6.0A', voltage: '220V', power: '1320W' },
    };

    const applianceState = {}; // To track appliance on/off state

    function updateApplianceOptions() {
        const selectedRoom = roomSelect.value;
        const appliances = appliancesByRoom[selectedRoom] || [];

        applianceSelect.innerHTML = '';

        appliances.forEach(appliance => {
            const option = document.createElement('option');
            option.value = appliance.toLowerCase().replace(/ /g, '-');
            option.textContent = appliance;
            applianceSelect.appendChild(option);
        });
    }

    function updateDataDisplay() {
        const selectedAppliance = applianceSelect.value;
        const role = roleSelect.value;

        if (!selectedAppliance) return;

        const applianceName = selectedAppliance.replace(/-/g, ' ').toUpperCase();
        const data = applianceData[applianceName];

        if (role === 'admin') {
            adminDataDiv.innerHTML = `
                <p><strong>Current:</strong> ${data.current}</p>
                <p><strong>Voltage:</strong> ${data.voltage}</p>
                <p><strong>Power:</strong> ${data.power}</p>
            `;
            adminDataDiv.style.display = 'block';
            userDataDiv.style.display = 'none';
        } else if (role === 'user') {
            const isOn = applianceState[applianceName] === 'on' ? 'On' : 'Off';
            userDataDiv.innerHTML = `
                <p><strong>Power:</strong> ${data.power}</p>
                <button id="toggle-power">${isOn} / Turn ${isOn === 'On' ? 'Off' : 'On'}</button>
            `;
            userDataDiv.style.display = 'block';
            adminDataDiv.style.display = 'none';

            document.getElementById('toggle-power').addEventListener('click', () => {
                applianceState[applianceName] = applianceState[applianceName] === 'on' ? 'off' : 'on';
                updateDataDisplay(); // Update the display to reflect the new state
                alert(`${applianceName} turned ${applianceState[applianceName]}`);
                // Implement actual toggle logic here (e.g., send request to server)
            });
        }
    }

    roleSelect.addEventListener('change', updateDataDisplay);
    roomSelect.addEventListener('change', updateApplianceOptions);
    applianceSelect.addEventListener('change', updateDataDisplay);

    // Trigger change event on page load to populate appliances for the default room and role
    roomSelect.dispatchEvent(new Event('change'));
    roleSelect.dispatchEvent(new Event('change'));
});
