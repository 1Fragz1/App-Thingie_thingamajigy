function toggleBottomBar(){
    if(closed){

        bottomBar.style.transition = "height 1s ease";
        bottomBar.style.height = "1vw";
        canvasContainer.style.transition = "height 1s ease, width 1s ease";
        canvasContainer.style.height = "40vw", canvasContainer.style.width = "40vw";
        closed = !closed;
    } else if (!closed && page === 1 || !closed && page == 2){
        bottomBar.style.transition = "height 1s ease";
        bottomBar.style.height = "21vw", page1.style.height = "15vw", page2.style.height = "15vw"; ;
        canvasContainer.style.transition = "height 1s ease, width 1s ease";
        canvasContainer.style.height = "18vw", canvasContainer.style.width = "18vw";
        
        
        
        closed = !closed;
    }
}

function goToPage(pageNumber){
    if(page == pageNumber){
        toggleBottomBar();
    } else {
    
        page = pageNumber;
        if(page == 1){
            page1.style.display = "block";
            page2.style.display = "none";
            chartContainer.style.display = "none";
        } else if (page == 2){
            page1.style.display = "none";
            page2.style.display = "block";
            chartContainer.style.display = "block";
        }
    }
}

