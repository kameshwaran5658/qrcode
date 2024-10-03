// JavaScript functionality
document.getElementById('generate-btn').addEventListener('click', function () {
    const qrData = document.getElementById('qr-data').value;
    const qrSize = document.getElementById('qr-size').value;
    const qrColor = document.getElementById('qr-color').value.substring(1); // remove '#'
    const qrPreview = document.getElementById('qr-preview');
    const qrImage = document.getElementById('qr-image');
    const message = document.getElementById('message');
  
    // Hide the preview initially
    qrPreview.style.display = 'none';
    message.textContent = '';
  
    // Validate input
    if (!qrData) {
        message.textContent = 'Please enter a value to generate a QR code.';
        return;
    }
  
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}&color=${qrColor}`;
  
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Failed to generate QR code');
            return response.blob();
        })
        .then(blob => {
            qrImage.src = URL.createObjectURL(blob);
            qrPreview.style.display = 'block';
            message.textContent = 'QR Code generated successfully!';
        })
        .catch(error => {
            message.textContent = error.message;
        });
  });
  
  // Download functionality
  document.getElementById('download-btn').addEventListener('click', function () {
    const qrImage = document.getElementById('qr-image').src;
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'qr-code.png';
    link.click();
  });
  
  // Copy functionality
  document.getElementById('copy-btn').addEventListener('click', function () {
    const qrImage = document.getElementById('qr-image');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;
    context.drawImage(qrImage, 0, 0);
  
    canvas.toBlob(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item])
            .then(() => {
                document.getElementById('message').textContent = 'QR code copied to clipboard!';
            })
            .catch(() => {
                document.getElementById('message').textContent = 'Failed to copy QR code.';
            });
    });
  });
  
  // Dark mode toggle
  document.getElementById('mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
  });
  
  // Hide the QR preview initially
  document.getElementById('qr-preview').style.display = 'none';
  