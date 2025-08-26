const upload = document.getElementById('upload');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const qualityInput = document.getElementById('quality');
        const qualityValue = document.getElementById('qualityValue');
        const sizeInput = document.getElementById('sizeInput');
        const sizeUnit = document.getElementById('sizeUnit');
        const resizeBtn = document.getElementById('resize');
        const increaseSizeBtn = document.getElementById('increaseSize');
        const decreaseSizeBtn = document.getElementById('decreaseSize');

        let img = new Image();
        let quality = 0.8;

        upload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    img.src = reader.result;
                };
            }
        });

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            widthInput.value = img.width;
            heightInput.value = img.height;
            ctx.drawImage(img, 0, 10);
        };

        qualityInput.addEventListener('input', () => {
            quality = parseFloat(qualityInput.value);
            qualityValue.textContent = quality.toFixed(1);
        });

        increaseSizeBtn.addEventListener('click', () => {
            sizeInput.value = parseInt(sizeInput.value || 1) + 1;
        });

        decreaseSizeBtn.addEventListener('click', () => {
            if (parseInt(sizeInput.value) > 1) {
                sizeInput.value = parseInt(sizeInput.value) - 1;
            }
        });

        resizeBtn.addEventListener('click', () => {
            const newWidth = parseInt(widthInput.value);
            const newHeight = parseInt(heightInput.value);
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.download = 'resized_image.jpg';
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 'image/jpeg', quality);
        });