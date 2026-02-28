// simple wrapper to upload an image file to imgbb
export async function uploadToImgbb(file) {
  if (!file) return null;
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('IMGBB API key missing');
  }

  // read file as base64
  const reader = new FileReader();
  const dataUrl = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const form = new FormData();
  form.append('key', apiKey);
  form.append('image', dataUrl);

  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: form
  });

  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error?.message || 'Image upload failed');
  }

  return result.data.url;
}
