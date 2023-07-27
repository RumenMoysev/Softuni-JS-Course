import { html, page } from "../api/loadLibs.js";

const temp = (internalFetch, accessToken, data, id) => html`<section id="editPage">
  <form class="editForm">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2gdNPztxBuZ3MYdVYArFyd45Ht41DGMoDg&usqp=CAU"
    />
    <div>
      <h2>Edit PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" value="${data.name}" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" value="${data.breed}" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" value="${data.age}" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" value="${data.weight}" />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input name="image" id="image" type="text" value="${data.image}" />
      </div>
      <button
        class="btn"
        type="submit"
        @click=${(e) => editHandler(e, internalFetch, accessToken, id)}
      >
        Edit Pet
      </button>
    </div>
  </form>
</section>`;

export async function showEdit(ctx) {
    let data = await getData(ctx.internalFetch, ctx.params.id)
  ctx.render(temp(ctx.internalFetch, ctx.accessToken, data, ctx.params.id));
}

function getData(internalFetch, id) {
  return internalFetch(`/data/pets/${id}`);
}

async function editHandler(e, internalFetch, accessToken, id) {
  e.preventDefault();

  let form = document.querySelector(".editForm");
  let formdata = new FormData(form);

  let data = {
    name: formdata.get("name"),
    breed: formdata.get("breed"),
    age: formdata.get("age"),
    weight: formdata.get("weight"),
    image: formdata.get("image"),
  };

  if (data.name && data.breed && data.age && data.weight && data.image) {
    let settings = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(data),
    };

    try {
      await internalFetch(`/data/pets/${id}`, settings);
      form.reset();
      page("/dashboard");
    } catch (e) {
      alert(e.message);
    }
  } else {
    alert("Please fill all inputs!");
  }
}
