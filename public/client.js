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
      document.getElementById("uploadForm").reset();
      Toastify({
        text: JSON.stringify(data.message),
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,rgb(0, 176, 23), #96c93d)",
          fontSize: "25px",
          borderRadius: "10px",
          width: "300px",
          height: "120px",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        },
      }).showToast();
    } catch (error) {
      console.error("Xatolik:", error);
      alert(`Rasm yuklashda xatolik: ${error.message}`);
    }
  });
