import { html } from "../api/loadLibs.js";

export const ownerDetails = (data, deleteHandler) => html`<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${data.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${data.brand}</span></p>
              <p>
                Model: <span id="details-model">${data.model}</span>
              </p>
              <p>Release date: <span id="details-release">${data.release}</span></p>
              <p>Designer: <span id="details-designer">${data.designer}</span></p>
              <p>Value: <span id="details-value">${data.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <a href="${data._id}/edit" id="edit-btn">Edit</a>
              <a href="" id="delete-btn" data-id = ${data._id} @click = ${deleteHandler}>Delete</a>
            </div>
          </div>
        </section>`
export const notOwnerDetails = (data) => html`<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${data.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${data.brand}</span></p>
              <p>
                Model: <span id="details-model">${data.model}</span>
              </p>
              <p>Release date: <span id="details-release">${data.release}</span></p>
              <p>Designer: <span id="details-designer">${data.designer}</span></p>
              <p>Value: <span id="details-value">${data.value}</span></p>
            </div>
          </div>
        </section>`