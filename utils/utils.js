export function getFileType(buffer) {
  const hex = buffer.toString('hex', 0, 4);
  
  if (hex.startsWith('89504e47')) return 'image/png';
  if (hex.startsWith('ffd8ff')) return 'image/jpeg';
  
  const text = buffer.toString('utf8', 0, 100).toLowerCase();
  if (text.includes('<svg') || text.includes('<?xml')) return 'image/svg+xml';
  
  return 'image/png';
}

export const formatProductImage = (product) => {
    if (!product.image || !Buffer.isBuffer(product.image)) {
        return { ...product, displayImage: '/img/default-placeholder.png' };
    }

    const mimeType = getFileType(product.image);
    const base64 = product.image.toString('base64');
    
    return {
        ...product,
        displayImage: `data:${mimeType};base64,${base64}`
    };
};