window.addEventListener('load', ()=>{
    while(data.length!=10){
        placeResults ()
    }

    body.style.filter = 'blur(0px)'
    body.style.backdropFilter = 'blur(0px)'
})

document.querySelector('#input-string').addEventListener('click', async()=>{
    if(!gameStarted){
        gameStarted = true
        // await new Promise(resolve => setTimeout(resolve,500))
        bgMusic.play()
        inputString.innerHTML = ''
        triggerCountdown()
        document.querySelectorAll('.alphabetic-key span').forEach(elem => elem.style.opacity = '1')
        keysAllowed = true
    }
})


document.addEventListener('keydown', (e)=>{
    e.preventDefault()
    if(keysAllowed && sample.includes(e.key.toLowerCase()) && inputString.innerHTML.length!=6 && !e.repeat){
        inputString.innerHTML = inputString.innerHTML + e.key.toUpperCase()
        alphaKeys[sample.indexOf(e.key.toLowerCase())].querySelector('img').style.filter = 'brightness (50%)'
        new Audio('./mp3/keyPress.mp3').play()
    }
    else if(e.key=='Backspace' && keysAllowed && inputString.innerHTML.length>0 && !e.repeat){
        inputString.innerHTML = inputString.innerHTML.slice(0, inputString.innerHTML.length -1)
        backspaceKeyImg.style.filter = 'brightness(50%)'
        new Audio('./mp3/backspace.mp3').play
    }
    else if(e.key=='Escape' && keysAllowed){
        gameOver()
    }
    else if (keysAllowed && e.code=='Space' && !e.repeat && inputString.innerHTML.length>=3){
        spaceKeyImg.style.filter = 'brightness(50%)'
        let correct = false

        data.forEach((object)=>{
            if(object.result==inputString.innerHTML.toLowerCase () && !solved.includes(inputString.innerHTML.toLowerCase())){
                correct = true
                new Audio('./mp3/correct.mp3').play()
                scoreValue.innerHTML = Number(scoreValue.innerHTML) + (object.result.length*10)
                scoreText.style.color = 'black'

                object.occupied.forEach((cellNo)=>{
                    let blocksArray = getBlocksAtCellNo(cellNo)
                    if(blocksArray.length==1){
                        blocksArray[0].style.transform = 'scale(1)'
                    }
                    else if (blocksArray.length==2){
                        if(blocksArray[0].style.transform == 'scale(0)'){
                            blocksArray[0].style.transform = 'scale(1)'
                        }
                        else{
                            blockArray[1].style.transform = 'scale(1)'
                        }
                    }
                })
                solved.push(object.result)

                if (solved.length==10) {
                    bgMusic.pause()
                    new Audio('./mp3/win.mp3').play()
                    clearInterval(countdownID)
                }
            }
        })
        !correct && new Audio('./mp3/wrong.mp3').play()
        inputString.innerHTML = ''

    }else if(e.key=='Enter' && keysAllowed && (solved.length==10 || skips!=3)){
        solved = []
    }

})

document.addEventListener('keyup',(e)=>{
    if(keysAllowed && sample.includes(e.key.toLowerCase())){
        setTimeout(()=>{
            alphaKeys[sample.indexOf(e.key.toLowerCase())].querySelector('img').style.filter = 'brightness(100%)'    
        },100)
    }
    else if (keysAllowed && e.code=='Space'){
        setTimeout(()=>{
            spaceKeyImg.style.filter = 'brightness(100%)'
        },100)
    }
    else if(keysAllowed && e.key=='Backspace'){
        setTimeout(()=>{
            backspaceKeyImg.style.filter = 'brightness(100%)'
        },100)
    }
})


console.log(document.getElementById('reset-button'))
document.getElementById('reset-button').addEventListener("click", function () {
  gameReset()
  document.getElementById('reset-button').blur()
  console.log("reset?")
})