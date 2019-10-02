const results = require('./truffle-security-output.json');

let fail = false;

function processResults() {

    console.log('--- Processing MythX results ---');
    console.log(`${JSON.stringify(results, null, 4)}`);

    console.log('--- Checking for Medium/High issues ---');

    for (let a = 0; a < results.length; a += 1) {
        for (let b = 0; b < results[a].messages.length; b += 1) {
            const issue = results[a].messages[b];
            const severity = new RegExp(/High|Medium/i);
            if (severity.test(issue.mythXseverity)) {
                console.log(`Issue found:\n ${JSON.stringify(issue, null, 2)}`);
                if (fail !== true) {
                    fail = true;
                }
            }
        }
    }
    process.exit(fail);
}


function main() {
    processResults();
}

main();
