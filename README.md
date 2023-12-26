# Instagram Image Downloader

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Example](#example)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Description

This JavaScript script provides functions to retrieve and download images from Instagram. It includes functionality to filter images based on their height and download them asynchronously.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Karl-Horning/get-instagram-images.git`
2. Open the project directory: `open get-instagram-images`
3. Locate the `image-downloader.js` file.

## Usage

1. Include the JavaScript file in your HTML document.

   ```html
   <script src='path/to/image-downloader.js'></script>
   ```

2. Call the `downloadAllImages` function to download all images with a height greater than the specified threshold (default is 400 pixels).

   ```javascript
   downloadAllImages();
   ```

## Functions

### 1. `getAllImagesUrls(height)`

- **Description:** Retrieves the URLs of all loaded images on the page.
- **Parameters:**
  - `height` (optional): Minimum height of the image (default is 400 pixels).
- **Returns:** An array of image URLs or an empty array if the document or `querySelectorAll` is not available.

### 2. `getFilenameFromUrl(url)`

- **Description:** Extracts the filename from the given image URL.
- **Parameters:**
  - `url`: The URL from which to extract the filename.
- **Returns:** The extracted filename or `null` if no match is found.

### 3. `downloadImage({ url, filename })`

- **Description:** Downloads an image using the provided URL asynchronously.
- **Parameters:**
  - `url`: The URL of the image to download.
  - `filename` (optional): The filename for the downloaded image (default is 'image.jpg').

### 4. `downloadAllImages()`

- **Description:** Downloads all loaded images over a specified height on the page using the previous functions.

## Example

```javascript
// Download all images with a height greater than 400 pixels
downloadAllImages();
```

## Notes

- Ensure that your webpage allows cross-origin resource sharing (CORS) for image URLs.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the project still works.
4. Create a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

Karl Horning: [GitHub](https://github.com/Karl-Horning/) | [LinkedIn](https://www.linkedin.com/in/karl-horning/) | [CodePen](https://codepen.io/karlhorning)