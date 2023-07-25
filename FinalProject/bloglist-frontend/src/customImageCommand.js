import {image as defaultImage} from '@uiw/react-md-editor/lib/commands/image';
import imageService from './services/images'

const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        imageService.create(formData)
            .then(data => {
                if (data.success) {
                    resolve(data.imageUrl);
                } else {
                    return reject('Image upload failed');
                }
            })
            .catch(error => {
                return reject(error);
            });
    });
}


const customImageCommand = {
    ...defaultImage,
    execute: (state, api) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Only accept image files
        input.onchange = () => {
            // When the user has selected a file
            const file = input.files[0];
            if (file) {
                // Upload the file to your server and get the URL of the image
                // This is a placeholder and should be replaced with your actual image upload code
                uploadImage(file).then(imageUrl => {
                    // Insert the image URL into the editor
                    const modifyText = `![alt text](${imageUrl})\n`;
                    api.replaceSelection(modifyText);
                });
            }
        };
        // Trigger the file input dialog
        input.click();
    },
};

export default customImageCommand