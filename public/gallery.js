window.onload = () => {
    axios.get(`/getFolders`)
      .then(response => {
        const folders = response.data;
        generateButtons(folders);
      })
      .catch(error => {
        console.error('Papkalar ro\'yxatini olishda xatolik:', error);
      });
  };
  
  function generateButtons(folders) {
    const header = document.getElementById('header');
    folders.forEach(folder => {
      const button = document.createElement('button');
      button.textContent = folder;
      button.onclick = () => fetchImages(folder);
      header.appendChild(button);
    });
  }
  function fetchImages(folder) {
    axios.get(`/getImages?folder=${folder}`)
      .then(response => {
        const images = response.data;
        displayImages(images);
      })
      .catch(error => {
        console.error('Rasm fayllarini olishda xatolik:', error);
      });
  }
  function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
  
    images.forEach(image => {
      const imgContainer = document.createElement('div');
      imgContainer.style.textAlign = 'center';
      imgContainer.style.marginBottom = '15px'; 
      const imgElement = document.createElement('img');
      imgElement.src = image;
      imgElement.style.width = '350px'; 
      imgElement.style.height = 'auto'; 
      const imgName = document.createElement('p');
      imgName.textContent = image.split('/').pop();
      imgName.style.fontSize = '20px'; 
      imgName.style.color = '#555';
      imgContainer.appendChild(imgElement);
      imgContainer.appendChild(imgName);
      gallery.appendChild(imgContainer);
    });
  }
  
  