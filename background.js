/* script made by bunnykek */
/*scraps attendance from Gmeet chatbox*/
/* Should run in browser console */

function attendance() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const kek = yyyy + '-' + mm + '-' + dd + ' ' + today.getHours() + ":" + today.getMinutes();

    const arr = document.querySelectorAll("div[data-sender-name]")

    let array = []
    arr.forEach(ele => array.push(ele.attributes[7].nodeValue))

    array.sort()

    array = new Set(array)

    var string = ""
    array.forEach(ele => { string = string + ele + '\n' })

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(string);
    hiddenElement.target = '_blank';
    hiddenElement.download = kek + '.txt';
    hiddenElement.click();
}

chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("meet.google.com")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: attendance
        });
    }
});