// Cloudinary "unsigned upload" ke through direct browser se image upload karta hai.
// Ye dono values SECRET nahi hain (public/safe hain) - Cloudinary dashboard se milengi.
//
// Setup steps (README/instructions mein bhi likha hai):
// 1. https://cloudinary.com par free account banayein
// 2. Dashboard se "Cloud Name" copy karein, neeche CLOUD_NAME mein daal dein
// 3. Settings > Upload > "Add upload preset" > Signing Mode = "Unsigned" > Save
//    us preset ka naam neeche UPLOAD_PRESET mein daal dein

const CLOUD_NAME = "YOUR_CLOUD_NAME"; // <-- yahan apna Cloudinary cloud name daalein
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET"; // <-- yahan apna unsigned upload preset naam daalein

export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload fail ho gaya. Cloudinary settings check karein.");
  }

  const data = await response.json();
  return data.secure_url; // Ye URL database mein product.image ke tor par save hoga
}
