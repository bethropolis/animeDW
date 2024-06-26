import { Client } from "../../client/client";
import { substringBefore, substringAfter, substringAfterLast} from "../helpers";
import { getApiUrl } from "./getApiUrl";



export async function vidsrcExtractor(url, name, type) {

    const keys = await fetch("https://raw.githubusercontent.com/KillerDogeEmpire/vidplay-keys/keys/keys.json")
        .then(res => res.json());
    const videoList = [];
    const host = new URL(url).host;
    const apiUrl = await getApiUrl(url, keys);

    const res = await Client.get(apiUrl, {
            "Host": host,
            "HostUrl": "",
            "Referer": decodeURIComponent(url),
            "X-Requested-With": "XMLHttpRequest"
    });
    const result = JSON.parse(await res);


    if (result.result !== 404) {
        const masterUrl = result.result.sources[0].file;
        const tracks = result.result.tracks.filter(e => e.kind === 'captions');
        const subtitles = tracks.map(sub => ({
            label: sub.label,
            file: sub.file
        }));

        const masterPlaylistRes = await Client.get(masterUrl,{
            "HostUrl": ""
        }); 
        const segments = masterPlaylistRes.split("#EXT-X-STREAM-INF:").slice(1);

        for (const it of segments) {
            const quality = `${substringBefore(substringBefore(substringAfter(substringAfter(it, "RESOLUTION="), "x"), ","), "\n")}p`;
            let videoUrl = substringBefore(substringAfter(it, "\n"), "\n");

            if (!videoUrl.startsWith("http")) {
                videoUrl = `${masterUrl.split("/").slice(0, -1).join("/")}/${videoUrl}`;
            }

            const video = {
                url: videoUrl,
                originalUrl: videoUrl,
                quality: `${name} - ${type} - ${quality}`,
                headers: { "Referer": `https://${host}/` },
                subtitles: subtitles
            };
            videoList.push(video);
        }
    }

    return videoList;
}

