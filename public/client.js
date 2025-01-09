document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData();
    const category = document.getElementById("category").value;
    const picture = document.getElementById("picture").files[0];
    formData.append("category", category);
    formData.append("picture", picture);
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Server xatosi: ${response.status}`);
      }
      const data = await response.json();
      Toastify({
        text: JSON.stringify(data.message),
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          fontSize: "18px",
          borderRadius: "10px",
          width: "700px",
          height: "200px",
          padding: "15px 30px",
        },
      }).showToast();
    } catch (error) {
      console.error("Xatolik:", error);
      alert(`Rasm yuklashda xatolik: ${error.message}`);
    }
  });
