const fs = require('fs');
const content = fs.readFileSync('d:/Working Folders/Flow Pipe/ApiModule Dashboard FE/floepipe_dashboard/src/utils/KYCContext/servicesMetadata.js', 'utf8');

// Rough extraction of configs
const services = [];
const serviceRegex = /id:\s*"(\w+)",[\s\S]*?config:\s*(\{[\s\S]*?\n\s*\})/g;
let match;

while ((match = serviceRegex.exec(content)) !== null) {
    const id = match[1];
    const configStr = match[2];
    services.push({ id, configStr });
}

console.log(JSON.stringify(services, null, 2));
