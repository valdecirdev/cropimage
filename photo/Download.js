export default (Photo) => {
    // Photo.downloadButton.onclick = () => Photo.download()

    Photo.download = function () {
        const a = document.createElement('a')
        a.download = Photo.photoName + '-cropped.png'
        a.href = Photo.canvas.toDataURL()
        a.click()
    }
}