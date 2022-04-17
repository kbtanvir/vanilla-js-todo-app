// CREATE DEMO DATA STRUCTURE

let data = [
  { id: 1, text: '🍎 Apple' },
  { id: 2, text: '🥭 Mango' },
  { id: 3, text: '🟠 Car' },
];

// CREATE FUNCTION TO ADD NEW ITEM

function addItem() {
  let text = document.querySelector('#input-text').value;
  if (text === '') return;

  let newItem = {
    id: Date.now(),
    text: text,
  };

  data.push(newItem);

  renderItems(data);
}

// CREATE FUNCTION TO REMOVE ITEM

function removeItem(id) {
  let itemId = data.findIndex((item) => item.id === id);

  if (itemId !== -1) {
    data.splice(itemId, 1);
  }

  renderItems(data);
}

// CREATE FUNCTION TO GET ITEM BY ID

function getItem(id) {
  return data.find((item) => item.id === id);
}

// CREATE FUNCTION TO EDIT ITEM BY ID

function editItem(id) {
  let item = getItem(id);
  
  if (item) {
    item.editing = true;
  }

  renderItems(data);
}

// CREATE FUNCTION TO CANCEL EDITING

function cancelEditing(id) {
  let item = getItem(id);
  if (item) {
    item.editing = false;
  }
  renderItems(data);
}

// CREATE FUNCTION TO SAVE EDITING

function updateItem(id) {
  let text = document.querySelector(`[data-id="${id}"] input`).value;
  let item = getItem(id);
  if (item) {
    item.editing = false;
    item.text = text;
  }
  renderItems(data);
}

// UPDATE UI

function renderItems(data) {
  let html = '';
  data.forEach((item) => {
    html += `
    <li class="list-group-item" data-id="${item.id}">
        ${
          item.editing
            ? `<input type="text" class="form-control" value="${item.text}"><button onclick='updateItem(${item.id})'>Save</button>`
            : `<span onclick='editItem(${item.id})'>${item.text}</span>`
        }
        ${
          item.editing
            ? `<button onclick='cancelEditing(${item.id})'>Cancel</button>`
            : `<button onclick='removeItem(${item.id})' >Remove</button></li>`
        }
    `;
  });
  document.querySelector('.items').innerHTML = html;
}

renderItems(data);
