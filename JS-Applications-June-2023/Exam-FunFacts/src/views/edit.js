import { html, page } from "../api/loadLibs.js";

let temp = (internalFetch, accessToken, data, id) => html`<section id="edit">
  <div class="form">
    <h2>Edit Fact</h2>
    <form class="edit-form">
      <input type="text" name="category" id="category" placeholder="Category" value=${data.category} />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        value=${data.imageUrl}
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
        .value=${data.description}
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
        .value=${data.moreInfo}
      ></textarea>
      <button type="submit" @click=${(e) => editHandler(e, internalFetch, accessToken, id)}>Post</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  let data = await getData(ctx.internalFetch, ctx.params.id);
  ctx.render(temp(ctx.internalFetch, ctx.accessToken, data, ctx.params.id));
}

function getData(internalFetch, id) {
  return internalFetch(`/data/facts/${id}`);
}

async function editHandler(e, internalFetch, accessToken, id) {
  e.preventDefault();

  let form = document.querySelector(".edit-form");
  let formdata = new FormData(form);

  let data = {
    category: formdata.get("category"),
    imageUrl: formdata.get("image-url"),
    description: formdata.get("description"),
    moreInfo: formdata.get("additional-info")
  };

  if (data.category && data.imageUrl && data.description && data.moreInfo) {
    let settings = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(data)
    };

    try {
      await internalFetch(`/data/facts/${id}`, settings);
      form.reset();
      page(`/${id}`);
    } catch (e) {
      alert(e.message);
    }
  } else {
    alert("Please fill all inputs!");
  }
}
