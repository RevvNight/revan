// dummy example, bisa ganti pakai OpenAI Image API / S3 / Cloud Storage
export async function generateImage(prompt) {
  return `https://dummyimage.com/512x512/000/fff&text=${encodeURIComponent(prompt)}`;
}

export async function editImage(url, prompt) {
  return `https://dummyimage.com/512x512/000/fff&text=${encodeURIComponent(prompt)}`;
}

export async function deleteImage(url) {
  console.log("Gambar dihapus:", url);
}
