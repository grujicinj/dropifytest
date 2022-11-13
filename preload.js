const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const a1 = document.getElementById('send1');
    const b1 = document.getElementById('send');

    const close = document.getElementById('close');
    const min1 = document.getElementById('minimize');
    const max1 = document.getElementById('maximize');

    a1.addEventListener('click', () => {
        ipcRenderer.send('asynchronous-message', 'ping')
    })
    b1.addEventListener('click', () => {
        ipcRenderer.send('asynchronous-message', 'ping')
    })


    close.addEventListener('click', () => {
        window.close();
    })
    min1.addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    })
    max1.addEventListener('click', () => {
        ipcRenderer.send('maximize-window');
    })
})

//electronegativity -i E:\dropify\my-electron-app