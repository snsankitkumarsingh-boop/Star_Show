function addComment(btn) {
    let card = btn.parentElement;
    let textarea = card.querySelector("textarea");
    let commentList = card.querySelector(".comments");

    if (textarea.value.trim() !== "") {
        let li = document.createElement("li");
        li.innerText = textarea.value;
        commentList.appendChild(li);
        textarea.value = "";
    }
}
