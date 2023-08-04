import { html, page } from "../api/loadLibs.js";

let temp = (internalFetch, accessToken, createHandler) => html`<section id="create">
  <div class="form">
    <h2>Add Fact</h2>
    <form class="create-form">
      <input type="text" name="category" id="category" placeholder="Category" />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit" @click = ${(e) => createHandler(e, internalFetch, accessToken)}>Add Fact</button>
    </form>
  </div>
</section>`;

export function showCreate(ctx) {
  ctx.render(temp(ctx.internalFetch, ctx.accessToken, createHandler));
}

async function createHandler(e, internalFetch, accessToken) {
  e.preventDefault();

  let form = document.querySelector(".create-form");
  let formdata = new FormData(form);

  let data = {
    category: formdata.get("category"),
    imageUrl: formdata.get("image-url"),
    description: formdata.get("description"),
    moreInfo: formdata.get("additional-info"),
  };

  if (data.imageUrl && data.category && data.description && data.moreInfo) {
    let settings = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(data),
    };

    try {
      await internalFetch("/data/facts", settings);
      form.reset();
      page("/facts");
    } catch (e) {
      alert(e.message);
    }
  } else {
    alert("Please fill all inputs!");
  }
}
