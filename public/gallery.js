window.onload = () => {
  axios.get('/getServerUrl')
    .then(response => {
      const serverUrl = response.data.serverUrl;
      axios.get("/getFolders")
        .then(response => {
          const folders = response.data;
          generateButtons(folders, serverUrl);
        })
        .catch(error => {
          console.error('Papkalar ro\'yxatini olishda xatolik:', error);
        });
    })
    .catch(error => {
      console.error('Server URL olishda xatolik:', error);
    });
};

function generateButtons(folders, serverUrl) {
  const header = document.getElementById('header');
  folders.forEach(folder => {
    const button = document.createElement('button');
    button.textContent = folder;
    button.onclick = () => fetchImages(folder, serverUrl);
    header.appendChild(button);
  });
}

function fetchImages(folder, serverUrl) {
  axios.get(`/getImages?folder=${folder}`)
    .then(response => {
      const images = response.data;
      displayImages(images, serverUrl);
    })
    .catch(error => {
      console.error('Rasm fayllarini olishda xatolik:', error);
    });
}

function displayImages(images, serverUrl) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  
  images.forEach(image => {
    const imgContainer = document.createElement('div');
    imgContainer.style.textAlign = 'center';
    imgContainer.style.marginBottom = '15px'; 
    const imgElement = document.createElement('img');
    imgElement.src = `${serverUrl}/upload/${image}`;
    imgElement.style.width = '400px'; 
    imgElement.style.height = 'auto'; 
    const imgName = document.createElement('p');
    imgName.textContent = image.split('/').pop();
    imgName.style.fontSize = '18px'; 
    imgName.style.color = '#555';
    imgContainer.appendChild(imgElement);
    imgContainer.appendChild(imgName);
    gallery.appendChild(imgContainer);
  });
}
