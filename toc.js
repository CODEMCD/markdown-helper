const form = document.querySelector(".js-form"),
    textArea = form.querySelector("textarea"),
    button = form.querySelector("button"),
    result = form.querySelector(".result");

function getHeaderLevel(headerLine) {
    let headerLevel = 0;
    for (let i=0; i<headerLine.length; ++i) {
        if (headerLine[i] != '#') {
            break;
        } else {
            headerLevel += 1;
        }
    }

    return headerLevel;
}

function makeTab(size, tabSize) {
    let tab = "";
    for (let i=0; i<size*tabSize; ++i) {
        tab += " ";
    }

    return tab;
}

function removeSpecialChar(str) {
    const specialCharReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
 
    if (specialCharReg.test(str)) {
        return str.replace(specialCharReg, "");
    } else {
        return str;
    }
}

function replaceAll(str, org, dest) {
    return str.split(org).join(dest);
}

function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function makeLink(line) {
    let link = "#";
    let lineWithoutSpecialChar = removeSpecialChar(line);

    link += trim(lineWithoutSpecialChar);
    link = link.toLowerCase();
    link = replaceAll(link, " ", "-");

    return link;
}

function convertTOCLine(line, level, tabSize) {
    const tab = makeTab(level - 1, tabSize);
    const title = trim(line.slice(level + 1));
    const link = makeLink(line);

    return tab + "- " + 
            "[" + title + "]" +
            "(" + link + ")";
}

function isHeader(line) {
    return line[0] === '#';
}

function generateTOC(input) {
    const lines = input.split("\n");
    let resultTOC = "";

    for (let i=0; i<lines.length; ++i) {
        if (isHeader(lines[i])) {
            const headerLevel = getHeaderLevel(lines[i]);
            resultTOC += convertTOCLine(lines[i], headerLevel, 4);
            resultTOC += "\n";
        }
    }

    return resultTOC;
}

function convertToTOC() {
    const currentInput = textArea.value;
    const toc = generateTOC(currentInput);
    result.value = toc;
}

function init() {
    button.addEventListener("click", convertToTOC);
}

init();