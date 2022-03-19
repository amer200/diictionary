fetch("http://localhost:3000/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const fileBtn = document.getElementById("fileBtn");
    const boxBtn = document.getElementById("boxBtn");
    const navFileBtn = (name) => {
      const navBtn = document.createElement("button");
      navBtn.classList.add("btn", "btn-dark", "nav-btn");
      navBtn.innerHTML = `<div class="inner-file-btn"><span class="circle-btn"></span><span class="circle-btn"></span></div> ${name}`;
      return navBtn;
    };
    data.files.forEach((f) => {
      fileBtn.appendChild(navFileBtn(f.name));
    });
    data.boxes.forEach((b) => {
      boxBtn.appendChild(navFileBtn(f.name));
    });
  })
  .catch((err) => {
    console.log(err);
  });

const mainModalForm = document.getElementById("main-modal-form");
const mainModalFormLabel = document.getElementById("main-modal-form-label");
const displayAddFileForm = () => {
  mainModalForm.classList.remove("d-none");
  mainModalForm.action = "http://localhost:3000/add-file";
  mainModalForm.method = "post";
  mainModalFormLabel.innerHTML = "اسم الملف";
};
const displayAddFilebox = () => {
  mainModalForm.classList.remove("d-none");
  mainModalForm.action = "http://localhost:3000/add-box";
  mainModalForm.method = "post";
  mainModalFormLabel.innerHTML = "اسم الصندوق";
};
const addMainCateg = () => {
  const name = document.getElementById("main-categ-name").value;
  const data = { name: name };
  fetch(mainModalForm.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
