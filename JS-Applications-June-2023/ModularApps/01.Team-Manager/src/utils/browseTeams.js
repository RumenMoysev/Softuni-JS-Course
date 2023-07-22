import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { isUserLoggedIn } from "../api/sessionStorageController.js";

let teamTemplate = (data) => html`<article class="layout">
                    <img src=${data.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <span class="details">${data.memberCount} Members</span>
                        <div><a href=${data._id} class="action">See details</a></div>
                    </div>
</article>`

export function showBrowse() {
    displayTeams()
}

async function displayTeams() {
    let data = await getTeams()
    let displayStatus = isUserLoggedIn() ? 'block' : 'none'
    let members = await getMembers()

    for(let el of data) {
        let memberCount = 0
        for(let el1 of members) {
            if(el1.teamId == el._id) {
                memberCount++
            }
        }
        el.memberCount = memberCount
    }

    let readyTemp = (data) => html`<section id="browse">
                <article class="pad-med">
                    <h1>Team Browser</h1>
                </article>

                <article class="layout narrow" style='display: ${displayStatus}'>
                    <div class="pad-small"><a href="/create-a-team" class="action cta">Create Team</a></div>
                </article>
                ${data.map(x => teamTemplate(x))}
            </section>`

    let output = document.getElementById('main')
    render(readyTemp(data), output)
}

function getMembers() {
    let settings = { method: "GET" }
    return internalFetch('http://localhost:3030/data/members?where=status%3D%22member%22',settings)
}

function getTeams() {
    let settings = {method:"GET"}
    return internalFetch('http://localhost:3030/data/teams', settings)
}