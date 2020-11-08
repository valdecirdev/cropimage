export default (Photo) => {
    Photo.selectionTool = document.getElementById('selection-tool')

    Photo.startSelection = false
    
    const events = {
        mouseover(){
            this.style.cursor = 'crosshair'
        },
        mousedown(){
            const { clientX, clientY, offsetX, offsetY } = event
        
            Photo.startX = clientX
            Photo.startY = clientY
            Photo.relativeStartX = offsetX
            Photo.relativeStartY = offsetY
    
            Photo.selectionTool.style.display = 'none'
            Photo.selectionTool.style.top = 0
            Photo.selectionTool.style.left = 0
            Photo.selectionTool.style.width = 0
            Photo.selectionTool.style.height = 0
    
            Photo.startSelection = true
        },
        mousemove(){
            Photo.endX = event.clientX
            Photo.endY = event.clientY
    
            if(Photo.startSelection) {
                Photo.selectionTool.style.display = 'initial'
    
                Photo.selectionTool.style.left = Photo.startX + 'px'
                Photo.selectionTool.style.width = (Photo.endX - Photo.startX) + 'px'
            
                Photo.selectionTool.style.top = (Photo.startY + window.scrollY) + 'px'
                Photo.selectionTool.style.height = (Photo.endY - Photo.startY) + 'px'
            }
        },
        mouseup(){
            if(Photo.startSelection){
                Photo.startSelection = false
    
                const pageX = event.pageX
                const pageY = event.pageY
        
                Photo.relativeEndX = pageX
                Photo.relativeEndY = pageY
    
                if(
                    Photo.selectionTool.style.width.replace('px', '') > 0 
                    && Photo.selectionTool.style.height.replace('px', '') > 0
                ){
                    Photo.cropButton.style.display = 'initial'
                } else {
                    Photo.cropButton.style.display = 'none'
                }
            }
        }
    }
    
    Object.keys(events).forEach(eventName => {
        Photo.photoPreview.addEventListener(eventName, events[eventName])
        Photo.selectionTool.addEventListener(eventName, events[eventName])
        if(eventName === 'mouseup' )
            document.addEventListener(eventName, events[eventName])
    })
}