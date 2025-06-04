document.addEventListener('DOMContentLoaded', () => {
  

  document.getElementById('brickCalcForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Wall dimensions (ft, in)
    const wallLength = parseFloat(document.getElementById('wallLength').value) || 0;
    const wallHeight = parseFloat(document.getElementById('wallHeight').value) || 0;
    const wallThicknessInch = parseFloat(document.getElementById('wallThickness').value) || 0;
    const wallThickness = wallThicknessInch / 12;

    // Brick dimensions (in)
    const brickLength = parseFloat(document.getElementById('brickLength').value) || 0;
    const brickWidth = parseFloat(document.getElementById('brickWidth').value) || 0;
    const brickHeight = parseFloat(document.getElementById('brickHeight').value) || 0;

    // Windows (ft)
    const numWindows = parseInt(document.getElementById('numWindows').value) || 0;
    const windowLength = parseFloat(document.getElementById('windowLength').value) || 0;
    const windowHeight = parseFloat(document.getElementById('windowHeight').value) || 0;

    // Doors (ft)
    const numDoors = parseInt(document.getElementById('numDoors').value) || 0;
    const doorLength = parseFloat(document.getElementById('doorLength').value) || 0;
    const doorHeight = parseFloat(document.getElementById('doorHeight').value) || 0;

    // Wall area (ft²)
    const wallArea = wallLength * wallHeight;
    // Total window area (ft²)
    const totalWindowArea = numWindows * windowLength * windowHeight;
    // Total door area (ft²)
    const totalDoorArea = numDoors * doorLength * doorHeight;
    // Net wall area (ft²)
    const netWallArea = wallArea - totalWindowArea - totalDoorArea;
    // Wall volume (ft³)
    const wallVolume = netWallArea * wallThickness;
    // Brick volume (in³)
    const brickVolumeInch = brickLength * brickWidth * brickHeight;
    // Convert brick volume to ft³ (1 ft³ = 1728 in³)
    const brickVolumeFt = brickVolumeInch / 1728;

    let resultText = '';

    if (wallVolume > 0 && brickVolumeFt > 0) {
      const bricksNeeded = Math.ceil(wallVolume / brickVolumeFt);
      resultText = `
        <div>
          <strong>Bricks Required:</strong> ${bricksNeeded.toLocaleString()}<br>
          <strong>आवश्यक ईंटें:</strong> ${bricksNeeded.toLocaleString()}<br>         
        </div>
      `;
    } else {
      resultText = `<span style="color:red;">Please enter all dimensions correctly.<br>कृपया सभी माप सही से दर्ज करें।</span>`;
    }

    document.getElementById('result').innerHTML = resultText;
  });

  document.getElementById('calculateBtn').onclick = function () {
    // Room dimensions (in feet)
    const roomLength = parseFloat(document.getElementById('roomLength').value) || 0;
    const roomWidth = parseFloat(document.getElementById('roomWidth').value) || 0;
    const roomHeight = parseFloat(document.getElementById('roomHeight').value) || 0;
    const wallWidthInches = parseFloat(document.getElementById('wallWidth').value) || 0;
    const wallWidth = wallWidthInches / 12; // Convert inches to feet

    // Brick dimensions (in inches)
    const brickLength = parseFloat(document.getElementById('brickLength').value) || 0;
    const brickHeight = parseFloat(document.getElementById('brickHeight').value) || 0;
    const brickWidth = parseFloat(document.getElementById('brickWidth').value) || 0;

    // Window details
    const numWindows = parseInt(document.getElementById('numWindows').value) || 0;
    const windowLength = parseFloat(document.getElementById('windowLength').value) || 0;
    const windowHeight = parseFloat(document.getElementById('windowHeight').value) || 0;

    // Door details
    const numDoors = parseInt(document.getElementById('numDoors').value) || 0;
    const doorLength = parseFloat(document.getElementById('doorLength').value) || 0;
    const doorHeight = parseFloat(document.getElementById('doorHeight').value) || 0;

    // Calculate total wall volume (all four walls, in cubic feet)
    // 2 walls of Length x Height x Thickness + 2 walls of Width x Height x Thickness
    const totalWallVolume = 2 * (roomLength + roomWidth) * roomHeight * wallWidth;

    // Subtract volume of windows and doors (in cubic feet)
    const totalWindowVolume = numWindows * windowLength * windowHeight * wallWidth;
    const totalDoorVolume = numDoors * doorLength * doorHeight * wallWidth;
    const netWallVolume = totalWallVolume - totalWindowVolume - totalDoorVolume;

    // Brick volume (convert inches to feet)
    const brickVolume = (brickLength / 12) * (brickHeight / 12) * (brickWidth / 12);

    // Calculate number of bricks (round up)
    let numBricks = 0;
    if (brickVolume > 0 && netWallVolume > 0) {
      numBricks = Math.ceil(netWallVolume / brickVolume);
    }

    // Show result
    document.getElementById('result').innerHTML = `
      <h3>Bricks Required: <span style="color:#007b3c">${numBricks}</span></h3>
      <div style="font-size:1em;color:#444;">(कुल आवश्यक ईंटें: <b>${numBricks}</b>)</div>
      <div style="font-size:0.95em;color:#888;">(For all four walls of the room, including wall thickness)</div>
    `;
  };

  function updateUnitNotes() {
    // Meter to feet
    const mToFt = v => v ? (parseFloat(v) * 3.28084).toFixed(2) : '';
    // mm to inch
    const mmToIn = v => v ? (parseFloat(v) / 25.4).toFixed(2) : '';

    document.getElementById('wallLengthFeet').textContent =
      mToFt(document.getElementById('wallLength').value) ? `= ${mToFt(document.getElementById('wallLength').value)} ft` : '';
    document.getElementById('wallHeightFeet').textContent =
      mToFt(document.getElementById('wallHeight').value) ? `= ${mToFt(document.getElementById('wallHeight').value)} ft` : '';
    document.getElementById('wallThicknessFeet').textContent =
      mToFt(document.getElementById('wallThickness').value) ? `= ${mToFt(document.getElementById('wallThickness').value)} ft` : '';

    document.getElementById('windowLengthFeet').textContent =
      mToFt(document.getElementById('windowLength').value) ? `= ${mToFt(document.getElementById('windowLength').value)} ft` : '';
    document.getElementById('windowHeightFeet').textContent =
      mToFt(document.getElementById('windowHeight').value) ? `= ${mToFt(document.getElementById('windowHeight').value)} ft` : '';
    document.getElementById('doorLengthFeet').textContent =
      mToFt(document.getElementById('doorLength').value) ? `= ${mToFt(document.getElementById('doorLength').value)} ft` : '';
    document.getElementById('doorHeightFeet').textContent =
      mToFt(document.getElementById('doorHeight').value) ? `= ${mToFt(document.getElementById('doorHeight').value)} ft` : '';

    document.getElementById('brickLengthInch').textContent =
      mmToIn(document.getElementById('brickLength').value) ? `= ${mmToIn(document.getElementById('brickLength').value)} in` : '';
    document.getElementById('brickWidthInch').textContent =
      mmToIn(document.getElementById('brickWidth').value) ? `= ${mmToIn(document.getElementById('brickWidth').value)} in` : '';
    document.getElementById('brickHeightInch').textContent =
      mmToIn(document.getElementById('brickHeight').value) ? `= ${mmToIn(document.getElementById('brickHeight').value)} in` : '';
  }

  // Attach input listeners
  [
    'wallLength','wallHeight','wallThickness',
    'brickLength','brickWidth','brickHeight',
    'windowLength','windowHeight',
    'doorLength','doorHeight'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateUnitNotes);
  });

  // Initial call
  updateUnitNotes();
});
