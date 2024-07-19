document.getElementById('generate-btn').addEventListener('click', function() {
  var inputText = document.getElementById('input-text').value;
  if(inputText.trim() !== '') {
    var qrCodeImg = document.getElementById('qr-code');
    qrCodeImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(inputText);
    qrCodeImg.alt = 'QR Code for ' + inputText;
    document.getElementById('qr-code-container').style.display = 'block';
  } else {
    alert('Please enter some text or URL to generate QR code.');
  }
});
