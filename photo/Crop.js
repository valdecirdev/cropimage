export default (Photo) => {
    
    Photo.crop = function() {
        const { width: imageW, height: imageH } = Photo.image
        const { width: previewW, height: previewH } = Photo.photoPreview
    
        const [ widthFactor, heightFactor ] = [
            +(imageW/previewW),
            +(imageH/previewH)
        ]
    
        const [ selectionWidth, selectionHeight] = [
            +Photo.selectionTool.style.width.replace('px', ''),
            +Photo.selectionTool.style.height.replace('px', '')
        ]
    
        const [ croppedWidth, croppedHeight ] = [
            +(selectionWidth * widthFactor),
            +(selectionHeight * heightFactor)
        ]
    
        const [ actualX, actualY ] = [
            +(Photo.relativeStartX * widthFactor),
            +(Photo.relativeStartY * heightFactor)
        ]
    
        // pegar do ctx a imagem cortada
        const croppedImage = Photo.ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)
    
        // limpar o ctx
        Photo.ctx.clearRect(0, 0, Photo.ctx.width, Photo.ctx.height)
    
        // ajuste de proporções
        Photo.image.width = Photo.canvas.width = croppedWidth
        Photo.image.height = Photo.canvas.height = croppedHeight
    
        // adicionar a imagem cortada ao ctx
        Photo.ctx.putImageData(croppedImage, 0, 0)  
    
        // esconder a ferramenta de seleção
        Photo.selectionTool.style.display = 'none'
    
        // esconder botão de cortar
        Photo.cropButton.style.display = 'none'
    
        // atualizar o preview da imagem
        Photo.photoPreview.src = Photo.canvas.toDataURL()
    
        // mostrar o botão de download
        Photo.downloadButton.style.display = 'initial'
    }
    
}