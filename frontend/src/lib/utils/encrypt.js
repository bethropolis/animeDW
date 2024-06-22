function base64UrlEncode(buffer) {
    return btoa(String.fromCharCode.apply(null, buffer))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}


function utf8Encode(str) {
    return new TextEncoder().encode(str);
}

export function rc4Encrypt(key, message) {
    let _key = utf8Encode(key);
    let _i = 0, _j = 0;
    let _box = Array.from({ length: 256 }, (_, i) => i);

    let x = 0;
    for (let i = 0; i < 256; i++) {
        x = (x + _box[i] + _key[i % _key.length]) % 256;
        [_box[i], _box[x]] = [_box[x], _box[i]];
    }

    let out = new Uint8Array(message.length);
    for (let k = 0; k < message.length; k++) {
        let char = message[k];
        _i = (_i + 1) % 256;
        _j = (_j + _box[_i]) % 256;
        [_box[_i], _box[_j]] = [_box[_j], _box[_i]];
        let c = char ^ _box[(_box[_i] + _box[_j]) % 256];
        out[k] = c;
    }

    return out;
}

function vrfShift(vrf) {
    let shifts = [-2, -4, -5, 6, 2, -3, 3, 6];
    for (let i = 0; i < vrf.length; i++) {
        let shift = shifts[i % 8];
        vrf[i] = (vrf[i] + shift) & 0xFF;
    }
    return vrf;
}

export function vrfEncrypt(input) {
    let rc4 = rc4Encrypt('tGn6kIpVXBEUmqjD', utf8Encode(input));
    let vrf = base64UrlEncode(rc4);
    let vrf1 = btoa(vrf);

    let vrf1Decoded = Uint8Array.from(vrf1, c => c.charCodeAt(0));
    let vrf2 = vrfShift(vrf1Decoded);

    let vrf3 = base64UrlEncode(vrf2.reverse());

    return vrf3;
}

export function vrfDecrypt(input) {
    let decode = base64UrlDecode(input);
    let rc4Result = rc4Encrypt('LUyDrL4qIxtIxOGs', decode);
    return decodeURIComponent(new TextDecoder().decode(rc4Result));
}

