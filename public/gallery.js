window.onload = () => {
    axios.get("http://localhost:3000/getFolders")
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
    axios.get(`http://localhost:3000/getImages?folder=${folder}`)
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
      const imgElement = document.createElement('img');
      imgElement.src = image;
      gallery.appendChild(imgElement);
    });
  }
  