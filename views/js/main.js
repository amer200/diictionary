// nav bar commponnents //
const fileBtn = document.getElementById("fileBtn");
const boxBtn = document.getElementById("boxBtn");
const navFileBtn = (name, id) => {
  const navBtn = document.createElement("button");
  navBtn.classList.add("btn", "btn-dark", "nav-btn");
  navBtn.id = id;
  navBtn.innerHTML = `<div class="inner-file-btn" data-bs-toggle="modal" data-bs-target="#main-categ-options-modal${id}"><span class="circle-btn"></span><span class="circle-btn"></span></div> ${name}`;
  return navBtn;
};
const mainCategModelOptions = (id, categ) => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal", "fade");
  modalContainer.id = "main-categ-options-modal" + id;
  modalContainer.tabindex = "-1";
  modalContainer.ariaLabelledby = "exampleModalLabel";
  modalContainer.ariaHidden = "true";
  const modal = `
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <button class="btn-dark" id="${id}" onclick="removeCateg(this, '${categ}')"> حذف</button>
                  <button class="btn-dark" id=" add-box" onclick="displayAddFilebox()"> اضافة</button>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
          </div>
      </div>`;
  modalContainer.innerHTML = modal;
  return modalContainer;
};
fetch("http://localhost:3000/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.files.forEach((f) => {
      fileBtn.appendChild(navFileBtn(f.name, f._id));
      fileBtn.appendChild(mainCategModelOptions(f._id, "file"));
    });
    data.boxes.forEach((b) => {
      boxBtn.appendChild(navFileBtn(b.name, b._id));
      fileBtn.appendChild(mainCategModelOptions(b._id, "box"));
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
  const name = addMainCategQuill.root.innerHTML;
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
      fileBtn.appendChild(navFileBtn(data.name, data._id));
    })
    .catch((err) => {
      console.log(err);
    });
};
const removeCateg = (e, categ) => {
  // const categ = e.categ;
  const id = e.id;
  if (confirm("سيتم الحذف نهائيا وكذلك جميع العناصر المندرجة منه")) {
    fetch(`http://localhost:3000/remove-${categ}/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const e = document.getElementById(data._id);
        fileBtn.removeChild(e);
      })
      .catch((err) => {
        alert("خطاء الرجاء المحولة مرة اخرى");
        console.log(err);
      });
  }
};
