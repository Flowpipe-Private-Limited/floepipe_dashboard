
export async function encryptPayload(payload, publicKeyPem) {
    console.log("called",payload, publicKeyPem)
  const encoder = new TextEncoder();

  // --- 1. AES key ---
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  console.log(aesKey)

  const iv = crypto.getRandomValues(new Uint8Array(12));

  console.log(iv)

  // --- 2. Encrypt payload with AES ---
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encoder.encode(JSON.stringify(payload))
  );

  console.log(encryptedData)

  // --- 3. Export AES key ---
  const rawAesKey = await crypto.subtle.exportKey("raw", aesKey);

  console.log(rawAesKey)

  // --- 4. Encrypt AES key with RSA ---
  const keyData = publicKeyPem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s+/g, "");

  const binary = atob(keyData);
  console.log(binary);
  const binaryArr = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  console.log(binaryArr)

  const publicKey = await crypto.subtle.importKey(
    "spki",
    binaryArr,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  console.log(publicKey)

  const encryptedKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawAesKey
  );

  console.log(encryptedKey)

  return {
    encryptedKey: btoa(String.fromCharCode(...new Uint8Array(encryptedKey))),
    data: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
    iv: btoa(String.fromCharCode(...iv)),
  };
}

export async function generateFrontendKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return {
    publicKeyPem: arrayBufferToPem(publicKey, "PUBLIC KEY"),
    privateKeyPem: arrayBufferToPem(privateKey, "PRIVATE KEY"),
    publicKeyRaw: publicKey,
    privateKeyRaw: privateKey,
  };
}

function arrayBufferToPem(buffer, label) {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  const base64 = btoa(binary);

  const formatted = base64.replace(/(.{64})/g, "$1\n");

  return `-----BEGIN ${label}-----\n${formatted}\n-----END ${label}-----`;
}

export async function decryptServerResponse({ encryptedKey, data, iv, tag }, clientPrivateKeyPem) {
  // 1️⃣ Import client's RSA private key
  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(clientPrivateKeyPem),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["decrypt"]
  );

  console.log(clientPrivateKeyPem)
  // 2️⃣ Decrypt AES key using RSA-OAEP
  const aesKeyRaw = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    base64ToArrayBuffer(encryptedKey)
  );

  console.log(aesKeyRaw)
  // 3️⃣ Import AES key into WebCrypto
  const aesKey = await window.crypto.subtle.importKey(
    "raw",
    aesKeyRaw,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  console.log(aesKey)
  // 4️⃣ AES-GCM decrypt
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToArrayBuffer(iv),
      tagLength: 128,
    },
    aesKey,
    concatCipherAndTag(data, tag)
  );
  
    console.log(decryptedBuffer)

  return JSON.parse(new TextDecoder().decode(decryptedBuffer));
}

function pemToArrayBuffer(pem) {
  // Remove header, footer, and line breaks
  const base64 = pem
    .replace(/-----BEGIN [A-Z ]+-----/, "")
    .replace(/-----END [A-Z ]+-----/, "")
    .replace(/\s+/g, "");

  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}

function concatCipherAndTag(cipherBase64, tagBase64) {
  const cipher = base64ToArrayBuffer(cipherBase64);
  const tag = base64ToArrayBuffer(tagBase64);

  const tmp = new Uint8Array(cipher.byteLength + tag.byteLength);
  tmp.set(new Uint8Array(cipher), 0);
  tmp.set(new Uint8Array(tag), cipher.byteLength);

  return tmp.buffer;
}
