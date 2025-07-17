import fs from 'node:fs';

/**
 * Delete file from the path.
 * @param {string} filePath - Path to file.
 */
export const deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete file:', err);
      }
    });
  }
};