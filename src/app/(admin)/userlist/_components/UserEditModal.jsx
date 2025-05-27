import AdminService from '@/services/adminService';
import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UserEditModal = ({ isOpen, onClose, user, setRefresh }) => {
  console.log(user , "usersss")
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    });
  }
}, [user]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChanges = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await AdminService.updateUser(user._id, formData);
      
      if (res.success) {
        toast.success('User updated successfully');
        setRefresh(prev => !prev); // Trigger refresh in parent component
        onClose();
      } else {
        throw new Error(res.message || 'Failed to update user');
      }
    } catch (err) {
      toast.error(err.message || 'Error updating user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl space-y-6">
          {/* Title */}
          <Dialog.Title className="text-xl font-semibold text-gray-900">Edit User</Dialog.Title>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleChanges}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserEditModal;