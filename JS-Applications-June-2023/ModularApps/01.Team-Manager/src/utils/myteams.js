import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { getUserId } from "../api/sessionStorageController.js";

let temsTemp = (data) => html` <article class="layout">
                    <img src="${data.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <span class="details">${data.memberCount} Members</span>
                        <div><a href="/${data._id}" class="action">See details</a></div>
                    </div>
                </article>`

let output = document.getElementById('main')

export async function showMyTeams() {
    let data = await getTeams()
    if(data.length > 0) {
        let members = await getMembers()

        for (let el of data) {
            let memberCount = 0
            for (let el1 of members) {
                if (el.team._id == el1.teamId) {
                    memberCount++
                }
            }
            el.team.memberCount = memberCount
        }

        let readyTemp = (data) => html`<section id="my-teams">

                <article class="pad-med">
                    <h1>My Teams</h1>
                </article>
                ${data.map(x => temsTemp(x.team))}
            </section>`
        render(readyTemp(data), output)
    } else {
        let readyTemp = () => html`
        <article class="pad-med">
                    <h1>My Teams</h1>
                </article>

                <article class="layout narrow">
                    <div class="pad-med">
                        <p>You are not a member of any team yet.</p>
                        <p><a href="/browse-teams">Browse all teams</a> to join one, or use the button bellow to cerate your own
                            team.</p>
                    </div>
                    <div class=""><a href="/create-a-team" class="action cta">Create Team</a></div>
                </article>
    </section>`
        render(readyTemp(), output)
    };
}

function getTeams() {
    let settings = {method:'GET'}
    return internalFetch(`http://localhost:3030/data/members?where=_ownerId%3D%22${getUserId()}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`, settings)
}

function getMembers() {
    let settings = { method: "GET" }
    return internalFetch('http://localhost:3030/data/members?where=status%3D%22member%22', settings)
}