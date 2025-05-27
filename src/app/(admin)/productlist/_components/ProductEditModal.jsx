import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AdminService from '@/services/adminService';

const ProductEditModal = ({ isOpen, onClose, product, setRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    discount : 0,
    price: 0,
    originalPrice: 0,
    brand: '',
    description: '',
    category: '',
    stock: '',
    isNew: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        brand: product.brand || '',
        description: product.description || '',
        category: product.category || '',
        stock: product.stock || 0,
        isNew: product.isNew || false,
          discount: product.discount || 0,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      
      // Append the image file if it exists
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (product.image) {
        // If no new image but existing image, send the existing image URL
        formDataToSend.append('image', product.image);
      }
      
      // Send the request
      const res = await AdminService.updateProduct(product._id, formDataToSend);

      if (res.success) {
        toast.success('Product updated successfully');
        setRefresh(prev => !prev);
        onClose();
      } else {
        throw new Error(res.message || 'Failed to update product');
      }
    } catch (err) {
      toast.error(err.message || 'Error updating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl space-y-6">
          <Dialog.Title className="text-xl font-semibold text-gray-900">Edit Product</Dialog.Title>

          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Name', name: 'name', type: 'text' },
               { label: 'Discount', name: 'discount', type: 'number' },
              { label: 'Price', name: 'price', type: 'number' },
              { label: 'Original Price', name: 'originalPrice', type: 'number' },
              { label: 'Brand', name: 'brand', type: 'text' },
              { label: 'Category', name: 'category', type: 'text' },
              { label: 'Stock Count', name: 'stock', type: 'number' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

           <div>
  <label className="block text-sm font-medium text-gray-700">Product Image</label>
  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleFileChange}
    className="w-full text-sm text-gray-700"
  />

  {imageFile ? (
    <img
      src={URL.createObjectURL(imageFile)}
      alt="New Preview"
      className="mt-2 w-24 h-24 object-cover border rounded"
    />
  ) : product.image && typeof product.image === 'string' ? (
    <img
      src={product.image}
      alt="Current Product"
      className="mt-2 w-24 h-24 object-cover border rounded"
    />
  ) : null}
</div>


            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleInputChange}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label htmlFor="isNew" className="text-sm text-gray-700">
                Mark as New
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProductEditModal;