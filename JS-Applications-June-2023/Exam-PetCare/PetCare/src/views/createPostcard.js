import { html, page } from "../api/loadLibs.js";

const temp = (internalFetch, accessToken) => html`<section id="createPage">
  <form class="createForm">
    <img
      src="https://p16.tiktokcdn.com/tos-maliva-avt-0068/10daa8d51fe79a19130e4ffe0649fa6e~c5_720x720.jpeg"
    />
    <div>
      <h2>Create PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" placeholder="Max" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" placeholder="2 years" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" placeholder="5kg" />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input
          name="image"
          id="image"
          type="text"
          placeholder="./image/dog.jpeg"
        />
      </div>
      <button class="btn" type="submit" @click=${(e) => createHandler(e, internalFetch, accessToken)}>Create Pet</button>
    </div>
  </form>
</section>`;

export function showCreate(ctx) {
  ctx.render(temp(ctx.internalFetch, ctx.accessToken));
}

async function createHandler(e, internalFetch, accessToken) {
  e.preventDefault();

  let form = document.querySelector(".createForm");
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
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(data),
    };

    try{    
        await internalFetch("/data/pets", settings);
        form.reset()
        page('/')
    } catch(e) {
        alert(e.message)
    }
  } else {
    alert('Please fill all inputs!')
  }
}
