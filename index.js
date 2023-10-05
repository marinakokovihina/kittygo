import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodeFields(encoded, translations) {
    let missingId = new Set();
    let uniqueId = []
    encoded.forEach((obj) => {
        for (const key in obj) {
            if (key.includes("Id") && !key.includes("groupId") && (!(obj[key] === null))){
                if (uniqueId.hasOwnProperty(obj[key])) {
                    uniqueId[obj[key]]++;
                } else {
                    uniqueId[obj[key]] = 1;
                }
                // if (!(obj[key] === null)) {
                    obj[key] = Number(obj[key])
                    if (obj[key] in translations) {
                        obj[key] = translations[obj[key]];
                    } else {
                        missingId.add(obj[key])
                    }
                //}
            }
        }
    })
    uniqueId = Object.keys(uniqueId).filter((key) => uniqueId[key] === 1);
    missingId = Array.from(missingId)
    console.log("Список id, которые присутствуют в encoded, но отсутсвуют в translations:", missingId);
    console.log("Список уникальных айди (которые используются в encoded только 1 раз): ", uniqueId);
    return encoded
}

const decoded = decodeFields(encoded, translations);
console.log(decoded)
