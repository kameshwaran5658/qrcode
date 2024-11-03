// Dark and Light Mode Functionality
const modeToggle = document.getElementById('mode-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

modeToggle.addEventListener('click', () => {
  // Toggle dark mode class on body
  document.body.classList.toggle('dark-mode');

  // Toggle icon visibility
  const isDarkMode = document.body.classList.contains('dark-mode');
  moonIcon.style.display = isDarkMode ? 'none' : 'inline';
  sunIcon.style.display = isDarkMode ? 'inline' : 'none';
});

// QR Code Generation Functionality
document.getElementById('generate-btn').addEventListener('click', function () {
  const qrData = document.getElementById('qr-data').value;
  const qrSize = document.getElementById('qr-size').value;
  const qrColor = document.getElementById('qr-color').value.substring(1); // Remove '#'
  const qrPreview = document.getElementById('qr-preview');
  const qrImage = document.getElementById('qr-image');
  const message = document.getElementById('message');

  // Hide the preview initially
  qrPreview.style.display = 'none';
  message.textContent = '';

  // Validate input
  if (!qrData) {
    message.textContent = 'Please enter a value to generate a QR code.';
    message.style.display = 'block';
    return;
  }

  // Construct API URL
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}&color=${qrColor}`;

  // Fetch QR code image
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error('Failed to generate QR code');
      return response.blob();
    })
    .then(blob => {
      qrImage.src = URL.createObjectURL(blob);
      qrPreview.style.display = 'block';
      message.textContent = 'QR Code generated successfully!';
      message.style.display = 'block';
    })
    .catch(error => {
      message.textContent = error.message;
      message.style.display = 'block';
    });
});

// Download QR Code Functionality
document.getElementById('download-btn').addEventListener('click', function () {
  const qrImage = document.getElementById('qr-image').src;
  const link = document.createElement('a');
  link.href = qrImage;
  link.download = 'qr-code.png';
  link.click();
});

// Copy QR Code to Clipboard Functionality
document.getElementById('copy-btn').addEventListener('click', function () {
  const qrImage = document.getElementById('qr-image');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = qrImage.width;
  canvas.height = qrImage.height;
  context.drawImage(qrImage, 0, 0);

  // Use Clipboard API to copy the image
  canvas.toBlob(blob => {
    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item])
        .then(() => {
          document.getElementById('message').textContent = 'QR code copied to clipboard!';
          document.getElementById('message').style.display = 'block';
        })
        .catch(() => {
          document.getElementById('message').textContent = 'Failed to copy QR code.';
          document.getElementById('message').style.display = 'block';
        });
    } else {
      document.getElementById('message').textContent = 'Clipboard API not supported.';
      document.getElementById('message').style.display = 'block';
    }
  });
});

// Hide the QR preview initially
document.getElementById('qr-preview').classList.add('hidden');
