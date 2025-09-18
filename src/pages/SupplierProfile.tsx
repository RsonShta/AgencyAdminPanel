import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { fetchSupplierById } from '../api/apiData';
import '../styles/suppliers.css';

const SupplierProfile: React.FC = () => {
  const { supplierId } = useParams<{ supplierId: string }>();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplierData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token || !supplierId) return;

      try {
        const data = await fetchSupplierById(token, supplierId);
        setSupplier({
          id: data.supplier_id,
          name: data.supplier_name,
          type: data.supplier_type,
          api_endpoint: data.api_endpoint,
          api_key: data.api_key,
          is_active: data.is_active,
          address: data.supplier_address,
          contact_name: data.supplier_contact_name,
          contact_number: data.supplier_contact_number,
          email: data.supplier_email
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch supplier details');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, [supplierId]);

  const handleEdit = () => {
    // TODO: Navigate to edit mode or open edit modal
    console.log('Edit supplier:', supplierId);
  };

  const handleDelete = () => {
    // TODO: Show confirmation and delete supplier
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      console.log('Delete supplier:', supplierId);
      navigate('/suppliers');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        {loading ? (
          <div className="loading">Loading supplier details...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : supplier ? (
          <div className="supplier-profile">
            <div className="profile-header">
              <button
                className="back-button"
                onClick={() => navigate('/app/suppliers')}
              >
                ← Back to Suppliers
              </button>
              <div className="profile-actions">
                <button className="btn btn-edit" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn btn-delete" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-section">
                <h2>Supplier Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Supplier ID:</label>
                    <span>{supplier.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Name:</label>
                    <span>{supplier.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Type:</label>
                    <span>{supplier.type}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status ${supplier.is_active ? 'active' : 'inactive'}`}>
                      {supplier.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>API Endpoint:</label>
                    <span>{supplier.api_endpoint}</span>
                  </div>
                  <div className="info-item">
                    <label>API Key:</label>
                    <span>{supplier.api_key}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h2>Contact Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Contact Name:</label>
                    <span>{supplier.contact_name}</span>
                  </div>
                  <div className="info-item">
                    <label>Contact Number:</label>
                    <span>{supplier.contact_number}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{supplier.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Address:</label>
                    <span>{supplier.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="error">Supplier not found</div>
        )}
      </div>
    </div>
  );
};

export default SupplierProfile;
