import { Client } from "../../client/client";
import { rc4Encrypt } from "../../utils/encrypt";
import { substringAfter, substringAfterLast, substringBefore } from "../helpers";

export async function getApiUrl(url, keyList) {
  const host = new URL(url).host;
  const paramsToString = new URL(url).searchParams.toString();
  const vidId = substringBefore(substringAfterLast(url, "/"), "?");
  const encodedID = encodeID(vidId, keyList);
  const apiSlug = await callFromFuToken(host, encodedID, url);
  let apiUrlString = `https://${host}/${apiSlug}`;
  if (paramsToString) {
    apiUrlString += `?${paramsToString}`;
  }
  return apiUrlString;
}


function uint8ArrayToString(uint8Array) {
  return Array.from(uint8Array, (byte) => String.fromCharCode(byte)).join('');
}

function encodeID(vidId, keyList) {
  const rc4Key1 = keyList[0];
  const rc4Key2 = keyList[1];
  const rc4 = rc4Encrypt(rc4Key1, new TextEncoder().encode(vidId));
  const rc41 = rc4Encrypt(rc4Key2, rc4);
  
  const binaryString = uint8ArrayToString(rc41);
  return btoa(binaryString).replace(/\//g, "_").replace(/=+$/, "");
}

async function callFromFuToken(host, data, url) {
    const fuTokenScript = await Client.get(`https://${host}/futoken`, {
      Referer: url,
      HostUrl: ""
    })


    console.log(fuTokenScript);

    let js = "(function";
    js += substringBefore(
        substringAfter(substringAfter(fuTokenScript, "window"), "function").replace(
            "jQuery.ajax(",
            ""
        ),
        "+location.search"
    );
    js += `}("${data}"))`;


    const jsRes = await eval(js);
    if (jsRes === "error") return "";
    return jsRes;
}



