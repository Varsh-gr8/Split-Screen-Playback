const socket = io();
const video = document.getElementById('video');

document.getElementById('join').addEventListener('click', function() {
    const secretCode = document.getElementById('code').value;

    video.classList.remove('left', 'right'); 
    if (secretCode === 'left') {
        video.classList.add('left'); 
        video.currentTime = 0; 
        video.play(); 
        syncVideoTime(video); 
    } else if (secretCode === 'right') {
        video.classList.add('right');
        video.currentTime = 0; 
        video.play(); 
        syncVideoTime(video);
    } else {
        alert('Invalid code. Please enter "left" or "right".'); 
    }
});


function syncVideoTime(video) {
    video.addEventListener('timeupdate', () => {
        
        socket.emit('syncTime', { time: video.currentTime, side: video.classList.contains('left') ? 'left' : 'right' });
    });

    
    socket.on('syncTime', ({ time, side }) => {
        if ((side === 'left' && video.classList.contains('left')) || 
            (side === 'right' && video.classList.contains('right'))) {
            video.currentTime = time; 
        }
    });
}


document.getElementById('pause').addEventListener('click', function() {
    video.pause(); 
    socket.emit('pauseVideo'); 
});


document.getElementById('play').addEventListener('click', function() {
    video.play(); 
    socket.emit('playVideo'); 
});

// Listen for pause event from other clients
socket.on('pauseVideo', () => {
    video.pause(); 
});


socket.on('playVideo', () => {
    video.play();
});
