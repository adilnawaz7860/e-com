'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Pencil, Trash2, Plus, Search, ChevronDown, ChevronUp, Filter, Edit } from 'lucide-react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { toast } from 'sonner';
import debounce from 'lodash.debounce';
import AdminService from '@/services/adminService';
import ProductEditModal from './ProductEditModal';

export default function ProductListScreen() {
  // State management
  const [searchInput, setSearchInput] = useState('');
  const [filterText, setFilterText] = useState('');
  const [products, setProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct  ,setSelectedProduct] = useState({});
  const [isEditOpen,setIsEditOpen, ] = useState(false);
  const [refresh ,setRefresh] = useState(false);


  const openEditModal = (product) => {
  setSelectedProduct(product);
  setIsEditOpen(true);
};

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setFilterText(searchValue);
    }, 300),
    []
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(filterText.toLowerCase()) || 
                          product.brand?.toLowerCase().includes(filterText.toLowerCase()) ||
                          product.category?.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesCategoryFilter = categoryFilter === 'all' || 
                                 (product.category === categoryFilter);
      
      return matchesSearch && matchesCategoryFilter;
    });
  }, [products, filterText, categoryFilter]);

  // Product actions
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setIsDeleting(true);
        await AdminService.deleteProduct(id);
        toast.success('Product deleted successfully');
        getProducts();
      } catch (err) {
        toast.error(err?.message || 'Failed to delete product');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new product?')) {
      try {
        setIsCreating(true);
        await AdminService.createProduct();
        toast.success('Product created successfully');
        getProducts();
      } catch (err) {
        toast.error(err?.message || 'Failed to create product');
      } finally {
        setIsCreating(false);
      }
    }
  };

  // Table columns configuration
  const columns = useMemo(() => [
   
    {
      name: 'NAME',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'BRAND',
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: 'PRICE',
      selector: (row) => `${row.price}`,
      sortable: true,
    },
     {
      name: 'ORIGINAL PRICE',
      selector: (row) => `${row.originalPrice}`,
      sortable: true,
    },
     {
      name: 'NEW',
      selector: (row) => `${row.isNew ? "YES" : "NO"}`,
      sortable: true,
    },
      {
      name: 'QUANTITY',
      selector: (row) => `${row.stock}`,
      sortable: true,
    },
    {
      name: 'CATEGORY',
      cell: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800`}>
          {row.category}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
        onClick={() => openEditModal(row)}
        className="p-2 text-cyan-600 cursor-pointer rounded-lg hover:bg-cyan-50 transition-colors"
        aria-label="Edit user"
      >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteHandler(row._id)}
            className="p-2 text-red-600 cursor-pointer rounded-lg hover:bg-red-50 transition-colors"
            disabled={isDeleting}
            aria-label="Delete product"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ], []);

  // Fetch products
  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getAllProducts();
      setProducts(res || []);
    } catch (error) {
      toast.error('Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    return () => {
      debouncedSearch.cancel();
    };
  }, [refresh]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    products.forEach(product => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [products]);

  // Filter component
  const subHeaderComponentMemo = useMemo(() => (
    <div className="p-0.5 bg-gray-50 rounded-lg mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              aria-label="Search products"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Additional filters can be added here */}
        </div>
      )}
    </div>
  ), [searchInput, categoryFilter, showFilters, handleSearchChange, categories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-sm text-gray-500">
            Manage all products in your inventory
          </p>
        </div>

        <button
          onClick={createProductHandler}
          disabled={isCreating}
          className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Product</span>
        </button>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50]}
          highlightOnHover
          responsive
          striped
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          customStyles={{
            head: {
              style: {
                backgroundColor: '#f8fafc',
              },
            },
            headCells: {
              style: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
                fontWeight: '600',
                color: '#334155',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.025em',
              },
            },
            cells: {
              style: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
              },
            },
            subHeader: {
              style: {
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
              },
            },
          }}
        />
      </div>
      <ProductEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={selectedProduct}
        setRefresh={setRefresh}
      />
    </div>
  );
}