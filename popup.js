String.prototype.convertToRGB = function () {
    if (typeof this !== "string" && this.length !== 7) return "error"
        var aRgb = [
            parseInt(this.slice(1, 3), 16),
            parseInt(this.slice(3, 5), 16),
            parseInt(this.slice(5, 7), 16),
        ];
    return aRgb;
}

let button = document.querySelector("#picker_btn")
button.addEventListener("click", clickFunction)

async function clickFunction() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor
    }, async (res) => {
        let [data] = res;
        let color = "something went to wrong";
        if (data?.result) {
            color = data?.result?.sRGBHex
        }
        let a = color.convertToRGB()
        document.querySelector("#sp-color").style.backgroundColor = color
        document.querySelector("#sp-color-code").innerHTML = `HEX:${color}`;
        document.querySelector("#sp-color-code-rgb").innerHTML = `RGB:${a}`;
        document.querySelector("#alert").innerHTML = "COPIED";
        navigator.clipboard.writeText(color)
    })
}

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (error) {
        console.log("ERROR", error)

    }

}