import Photo from './photo/index.js'

window.addEventListener('DOMContentLoaded', () => {
    Photo.load()
})

// Selecionar Imagem
document.getElementById('select-image')
.onclick = () => {
    document.getElementById('photo-file').click()
}

// Cortar imagem
Photo.cropButton = document.getElementById('crop-image')
Photo.cropButton.onclick = () => Photo.crop()

// Exportar Imagem
Photo.downloadButton = document.getElementById('download')
Photo.downloadButton.onclick = () => Photo.download()