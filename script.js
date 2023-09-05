/**
 * Gets the URLs for all loaded images on the page.
 * @function getAllImages
 * @param {number} height [height=400] - The optional minimum height of the image (default is 400).
 * @returns {Array<string|null>} An array of URLs or null.
 */
const getAllImages = (height = 400) => {
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
 * Downloads all images on a page by:
 * 1. Looping through all of the images
 * 2. Getting the filename from the URL
 * 3. Downloading the image
 * @function downloadAllImages
 */
const downloadAllImages = () => {
    const images = getAllImages();
    const downloadPromises = images.map((image) => {
        const filename = getFilenameFromUrl(image);
        if (filename !== null) return downloadImage({ url: image, filename });
    });

    Promise.all(downloadPromises).then(() =>
        console.log("All images downloaded successfully!")
    );
};

downloadAllImages();
