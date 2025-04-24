export default function toBase64(file)
{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(
            reader && 
            reader.result &&
            reader.result.toString()
            .replace("data:", "")
            .replace(/^.+,/, ""));
        reader.onerror = error => reject(error);
    });
}