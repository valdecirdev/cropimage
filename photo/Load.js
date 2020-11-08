export default (Photo) => {
    
    Photo.load = function() {

        Photo.photoFile = document.getElementById('photo-file')

        Photo.photoFile.addEventListener('change', () => {
            let file = Photo.photoFile.files.item(0)
            
            Photo.photoName = file.name
            
            let reader = new FileReader()
            
            reader.readAsDataURL(file)
            reader.onload = onLoadReader

            Photo.selectionTool.style.display = 'none'
            Photo.cropButton.style.display = 'none'
            Photo.downloadButton.style.display = 'none'
            Photo.photoFile.value = ''
        })

        function onLoadReader(event) {
            Photo.image = new Image();
            Photo.image.src = event.target.result
            Photo.image.onload = onLoadImage
        }

        function onLoadImage() {
            const { width, height } = Photo.image
            Photo.canvas.width = width
            Photo.canvas.height = height

            // Limpar contexto
            Photo.ctx.clearRect(0, 0, width, height)

            // Desenhar imagem no contexto
            Photo.ctx.drawImage(Photo.image, 0, 0)

            Photo.preview()
        }
    }
}