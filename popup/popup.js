const button = document.querySelector(".btn button");
const title = document.querySelector(".title h2");
const msg = document.querySelector(".title p");

button.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickTitle,
    }, (injectionResults) => {
        const [data] = injectionResults;
        title.innerText = data.result;
        msg.innerText = "Title copied to clipboard";
        navigator.clipboard.writeText(data.result);
    }
    );
});

// Title Picker
function pickTitle() {
    return document.querySelector("title").textContent;
}