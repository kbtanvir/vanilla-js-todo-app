// 1 CREATE DEMO DATA STRUCTURE

let data = [
  { id: 1, text: 'Apple' },
  { id: 2, text: 'Mango' },
  { id: 3, text: 'Orange' },
];

function renderList(data) {
  let html = '';
  data.forEach((item) => {
    let emoji = emojis[Math.floor(Math.random() * emojis.length)];
    html += `
    <li data-id="${item.id}">
    <input type='checkbox' onchange="markAsComplete(${item.id})" ${
      item.complete ? 'checked' : ''
    }
    />
        ${
          item.editing
            ? `<input type="text" id="editing-text-input" value="${item.text}"><button onclick='updateItem(${item.id})'>✅</button>`
            : `<span style='text-decoration:${
                item.complete ? 'line-through' : 'inherit'
              }' onclick='editItem(${item.id})'>${emoji} ${item.text}</span>`
        }
        ${
          item.editing
            ? `<button onclick='cancelEditing(${item.id})'>↩️</button>`
            : `<button onclick='removeItem(${item.id})' >❌</button>`
        } 
    </li>`;
  });
  document.querySelector('#items').innerHTML = html;
}

// 2 RENDER SINGLE ITEM

function renderItem(item) {
  let emoji = emojis[Math.floor(Math.random() * emojis.length)];
  let html = `
    <input type='checkbox' onchange="markAsComplete(${item.id})" ${
    item.complete ? 'checked' : ''
  }
    />
        ${
          item.editing
            ? `<input type="text" id="editing-text-input" value="${item.text}"><button onclick='updateItem(${item.id})'>✅</button>`
            : `<span style='text-decoration:${
                item.complete ? 'line-through' : 'inherit'
              }' onclick='editItem(${item.id})'>${emoji} ${item.text}</span>`
        }
        ${
          item.editing
            ? `<button onclick='cancelEditing(${item.id})'>↩️</button>`
            : `<button onclick='removeItem(${item.id})' >❌</button>`
        } 
    `;
  let itemSelector = document.querySelector(`[data-id="${item.id}"]`);
  itemSelector.innerHTML = html;
}

// CREATE FUNCTION TO ADD NEW ITEM

function addItem() {
  let emoji = emojis[Math.floor(Math.random() * emojis.length)];
  let text = document.querySelector('#add-item-input').value;
  if (text === '') return;

  let item = {
    id: Date.now(),
    text: text,
  };

  data.push(item);

  let selector = document.querySelector('#items');

  let html = `
  <li data-id="${item.id}">
    <input type='checkbox' onchange="markAsComplete(${item.id})" ${
    item.complete ? 'checked' : ''
  }
    />
        ${
          item.editing
            ? `<input type="text" id="editing-text-input" value="${item.text}"><button onclick='updateItem(${item.id})'>✅</button>`
            : `<span style='text-decoration:${
                item.complete ? 'line-through' : 'inherit'
              }' onclick='editItem(${item.id})'>${emoji} ${item.text}</span>`
        }
        ${
          item.editing
            ? `<button onclick='cancelEditing(${item.id})'>↩️</button>`
            : `<button onclick='removeItem(${item.id})' >❌</button>`
        } 
    </li>
    `;
  selector.innerHTML += html;
}

// CREATE FUNCTION TO REMOVE ITEM

function removeItem(id) {
  let itemId = data.findIndex((item) => item.id === id);

  if (itemId !== -1) {
    data.splice(itemId, 1);
  }

  let selector = document.querySelector(`[data-id="${id}"]`);

  selector.remove();
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

  renderList(data);
}
// CREATE FUNCTION TO EDIT ITEM BY ID

function markAsComplete(id) {
  let item = getItem(id);

  if (item) {
    item.complete = !item.complete;
  }

  renderItem(item);
}

// CREATE FUNCTION TO CANCEL EDITING

function cancelEditing(id) {
  let item = getItem(id);
  if (item) {
    item.editing = false;
  }
  renderList(data);
}

// CREATE FUNCTION TO SAVE EDITING

function updateItem(id) {
  let text = document.querySelector(
    `[data-id="${id}"] #editing-text-input`
  ).value;
  let item = getItem(id);
  if (item) {
    item.editing = false;
    item.text = text;
  }
  renderItem(item);
}

renderList(data);
