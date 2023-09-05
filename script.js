/**
 * Gets the URLs for all loaded images on the page.
 * @function getAllImagesUrls
 * @param {number} height [height=400] - The optional minimum height of the image (default is 400).
 * @returns {Array<string|null>} An array of URLs or null.
 */
const getAllImagesUrls = (height = 400) => {
    const images = document.querySelectorAll("img");
    const imagesSrc = [];

    for (const image of images) {
        if (image.height > height) {
            imagesSrc.push(image.src);
        }
    }

    return imagesSrc;
};

/**
 * Gets the filename from the image URL.
 * @function getFilenameFromUrl
 * @param {string} url The URL to extract the filename from.
 * @returns {string|null} The filename extracted from the URL or null.
 */
const getFilenameFromUrl = (url) => {
    // Matches the filename between the forward slash (\) and question mark (?) in the URL.
    const fileNameRegex = /\/([^/]+)\?/;
    const match = url.match(fileNameRegex);

    if (match && match[1]) return match[1];
    return null;
};

/**
 * Downloads an image using the URL.
 * @async
 * @function downloadImage
 * @param {string} url
 * @param {string} filename
 */
const downloadImage = async ({ url, filename = "image.jpg" }) => {
    try {
        // Fetch the image data
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // Create a blob URL
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;

        // Simulate a click event on the link
        link.click();

        // Clean up the blob URL after the download
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Error downloading image:", error);
    }
};

/**
 * Downloads all loaded images over 400px on an Instagram page.
 * @function downloadAllImages
 */
const downloadAllImages = () => {
    const images = getAllImagesUrls();
    // Maps each image URL to a promise using the downloadImage function.
    const downloadPromises = images.map((image) => {
        const filename = getFilenameFromUrl(image);
        if (filename !== null) return downloadImage({ url: image, filename });
    });

    // Wait for all of the promises to either be resolved or rejected.
    Promise.allSettled(downloadPromises).then((results) => {
        // Create a list of fulfilled promises
        const successfulDownloads = results.filter(
            (result) => result.status === "fulfilled"
        );
        // Create a list of rejected promises
        const failedDownloads = results.filter(
            (result) => result.status === "rejected"
        );

        console.log(
            `${successfulDownloads.length} images downloaded successfully.`
        );
        
        // List the number of images that failed to download and the reason why each one was rejected
        if (failedDownloads.length > 0) {
            console.error(
                `${failedDownloads.length} images failed to download:`
            );
            failedDownloads.forEach((result) => console.error(result.reason));
        }
    });
};

downloadAllImages();
