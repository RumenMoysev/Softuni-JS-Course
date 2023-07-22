import { internalFetch } from "../api/fetch.js";
import { html, render,page } from "../api/loadLibs.js";
import { getAccessToken, getUserId, getUsername, isUserLoggedIn } from "../api/sessionStorageController.js";

let memberTemp = (member) => html`<li>${member.username}</li>`
let ownerMemberTempJoined = (member, deleteHandler) => html`<li>${member.user.username}<a href="javascript:void(0)" class="tm-control action" data-id=${member._id} @click=${deleteHandler}>Remove from team</a></li>`
let ownerMemberTempPending = (member, approveHandler, deleteHandler) => html`<li>${member.user.username}<a href="javascript:void(0)" class="tm-control action" data-id=${member._id} @click=${approveHandler}>Approve</a><a href="javascript:void(0)"
                                    class="tm-control action" data-id=${member._id} @click=${deleteHandler}>Decline</a></li>`

let ownerTemp = (data, joinedMembers, pendingMembers, getUsername, approveHandler, deleteHandler) => html`<section id="team-home">
                <article class="layout">
                    <img src=${data.logoUrl} class="team-logo left-col">
                    <div class="tm-preview" dataset-id=${data._id}>
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <span class="details">${data.memberCount} Members</span>
                        <div>
                            <a href="${data._id}/edit" class="action">Edit team</a>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            <li>${getUsername()}</li>
                            ${joinedMembers.map(x => ownerMemberTempJoined(x, deleteHandler))}
                        </ul>
                    </div>
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            ${pendingMembers.map(x => ownerMemberTempPending(x, approveHandler, deleteHandler))}
                        </ul>
                    </div>
                </article>
            </section>`

let guestTemp = (data, members) => html`<section id="team-home">
    <article class="layout">
        <img src=${data.logoUrl} class="team-logo left-col">
        <div class="tm-preview" id="teamDetails" dataset-id=${data._id}>
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <span class="details">${data.memberCount} Members</span>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members" >
                ${members.map(x => memberTemp(x.user))}
            </ul>
        </div>
    </article>
</section>`
let output = document.getElementById('main')
let teamId

export async function showDetails(ctx) {
    teamId = ctx.params.id
    detailsHandler(ctx.params.id)
}

async function detailsHandler(id) {
    let response = await getTeam(id)
    let members = await getMembers(id)
    let joinedMembers = members.filter(x => x.status == 'member')
    let pendingMembers = members.filter(x => x.status == 'pending')
    response.memberCount = joinedMembers.length
    if(!isUserLoggedIn()) {
        render(guestTemp(response, joinedMembers), output)
    } else if(getUserId() != response._ownerId) {
        render(guestTemp(response, joinedMembers), output)
        let isJoined = false
        let isPending = false
        let isMember = false
        for(let el of members) {
            if(el._ownerId !== getUserId()) {
                isJoined = false
            } else if(el._ownerId == getUserId() && el.status == 'pending') {
                isJoined = true
                isPending = true
                break;
            } else if (el._ownerId == getUserId() && el.status == 'member') {
                isJoined = true
                isMember = true
                break;
            }
        }

        if(!isJoined) {
            if(document.getElementById('teamDetails').children.length ==3) {
                let div = document.createElement('div')
                let joinBtn = document.createElement('a')
                joinBtn.textContent = 'Join team'
                joinBtn.addEventListener('click', onclickJoin)
                joinBtn.classList.add('action')
                div.append(joinBtn)
                document.getElementById('teamDetails').append(div)
            }
        } else if(isJoined && isPending) {
            if (document.getElementById('teamDetails').children.length == 3) { 
                let div = document.createElement('div')
                div.textContent = 'Membership pending.'
                let cancelBtn = document.createElement('a')
                cancelBtn.textContent = 'Cancel request'
                cancelBtn.addEventListener('click', onclickCancel)
                cancelBtn.href = ''
                div.append(cancelBtn)
                document.getElementById('teamDetails').append(div)
            }
        } else if(isMember) {
            if (document.getElementById('teamDetails').children.length == 3) { 
                let div = document.createElement('div')
                let leaveBtn = document.createElement('a')
                leaveBtn.textContent = 'Leave team'
                leaveBtn.addEventListener('click', onclickLeave)
                leaveBtn.classList.add('action')
                div.append(leaveBtn)
                document.getElementById('teamDetails').append(div)
            }
        }
    } else if (getUserId() == response._ownerId) {
        let index = 0
        for(let i = 0; i<joinedMembers.length; i++) {
            if(joinedMembers[i].user._id == getUserId()) {
                index = i
            }
        }
        joinedMembers.splice(index,1)
        render(ownerTemp(response, joinedMembers, pendingMembers, getUsername, approveHandler, deleteHandler), output)
    }
}

async function deleteHandler(e) {
    let userId = e.target.dataset.id
    let settings1 = {
        method: 'DELETE',
        headers: { 'X-Authorization': getAccessToken() }
    }

    await internalFetch(`http://localhost:3030/data/members/${userId}`, settings1)
    page(`/${teamId}`)
}

async function approveHandler(e) {
    e.preventDefault()
    let id = e.target.dataset.id

    let data = {
        'status': 'member'
    }
    let settings = {
        method:"PUT",
        headers: {'Content-type':'application/json', 'X-Authorization': getAccessToken()},
        body: JSON.stringify(data)
    }

    await internalFetch(`http://localhost:3030/data/members/${id}`, settings)
    page(`/${teamId}`)
}

async function onclickCancel(e) {
    let id = document.getElementById('teamDetails').getAttribute('dataset-id')
    let settings1 = {method:'GET'}
    let x = await internalFetch(`http://localhost:3030/data/members/`, settings1)
    let pendingId
    for(let el of x) {
        if(el.teamId == id && el._ownerId == getUserId()) {
            pendingId = el._id
        }
    }
    let settings = {
        method: 'DELETE',
        headers: {'X-Authorization': getAccessToken()}
    }

    await internalFetch(`http://localhost:3030/data/members/${pendingId}`, settings)
    e.target.parentElement.remove()
    page(`/${teamId}`)
}

async function onclickLeave(e) {
    let id = document.getElementById('teamDetails').getAttribute('dataset-id')
    let settings1 = { method: 'GET' }
    let x = await internalFetch(`http://localhost:3030/data/members/`, settings1)
    let pendingId
    for (let el of x) {
        if (el.teamId == id && el._ownerId == getUserId()) {
            pendingId = el._id
        }
    }
    let settings = {
        method: 'DELETE',
        headers: { 'X-Authorization': getAccessToken() }
    }

    await internalFetch(`http://localhost:3030/data/members/${pendingId}`, settings)
    e.target.parentElement.remove()
    detailsHandler(teamId)
}

async function onclickJoin(e) {
    let id = document.getElementById('teamDetails').getAttribute('dataset-id')
    let data = {
        teamId: id
    }
    let settings = {
        method: 'POST',
        headers: {'Content-type': 'application/json', 'X-Authorization': getAccessToken()},
        body: JSON.stringify(data)
    }

    await internalFetch(`http://localhost:3030/data/members`, settings)
    e.target.parentElement.remove()
    detailsHandler(teamId)
}

function getMembers(id) {
    let settings = { method: "GET" }
    return internalFetch(`http://localhost:3030/data/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`, settings)
}

function getTeam(id) {
    let settings = { method: "GET" }
    return internalFetch(`http://localhost:3030/data/teams/${id}`, settings)
}