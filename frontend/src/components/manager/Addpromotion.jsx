import React, {useState,useEffect} from 'react';
import './Addpromotion.css';

export default function Addpromotion({ onClose, onPromotionCreated }) {
  
  const [formData, setFormData] = useState({
    promotionName: '',
    discountType: 'Percentage',
    discountValue: '',
    minimumOrderValue: '',
    eligibleProducts: [],
    startDate: '',
    endDate: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const API_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {

  const fetchProducts = async () => {

    try {

      const response =
        await fetch(
          `${API_URL}/api/products`
        );

      if (!response.ok) {

        throw new Error(
          'Failed to load products'
        );

      }

      const data =
        await response.json();

      console.log(
        'Products from database:',
        data
      );

      setProducts(data);

    } catch (error) {

      console.error(
        'Error loading products:',
        error
      );

      alert(
        'Could not load products'
      );

    } finally {

      setLoadingProducts(false);

    }

  };


  fetchProducts();

}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProductChange = (e) => {
    const options = Array.from(e.target.selectedOptions);

    const selectedProducts = options.map(
      (option) => option.value
    );

    setFormData({
      ...formData,
      eligibleProducts: selectedProducts
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // Combine scheduled date and scheduled time
    const scheduledDate = new Date(
      `${formData.scheduledDate}T${formData.scheduledTime}`
    );

    const promotionData = {
      promotionName: formData.promotionName,

      discountType: formData.discountType,

      discountValue: Number(
        formData.discountValue
      ),

      minimumOrderValue: Number(
        formData.minimumOrderValue
      ),

      eligibleProducts:
        formData.eligibleProducts,

      startDate:
        formData.startDate,

      endDate:
        formData.endDate,

      scheduledDate:
        scheduledDate.toISOString()
    };


    console.log(
      'Sending promotion:',
      promotionData
    );


    const response = await fetch(
      `${API_URL}/api/promotions`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(
          promotionData
        )
      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      alert(
        data.message ||
        'Failed to create promotion'
      );

      return;
    }


    alert(
      'Promotion created successfully!'
    );


    onPromotionCreated(data);

    onClose();


  } catch (error) {

    console.error(
      'Error creating promotion:',
      error
    );

    alert(
      'Unable to create promotion.'
    );

  }
};

  return (
    <div className="promotion-modal-overlay">

      <div className="promotion-modal">

        <div className="promotion-modal-header">

          <h2>Create Promotion</h2>

          <button
            type="button"
            onClick={onClose}
            className="close-button"
          >
            ×
          </button>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Promotion Name */}
          <div className="form-group">

            <label>
              Promotion Name
            </label>

            <input
              type="text"
              name="promotionName"
              value={formData.promotionName}
              onChange={handleChange}
              placeholder="Enter promotion name"
              required
            />

          </div>


          {/* Discount Type */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Discount Type
              </label>

              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
              >

                <option value="Percentage">
                  Percentage
                </option>

                <option value="Fixed Amount">
                  Fixed Amount
                </option>

              </select>

            </div>


            {/* Discount Value */}
            <div className="form-group">

              <label>
                Discount Value
              </label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                placeholder="e.g. 10"
                min="0"
                required
              />

            </div>

          </div>


          {/* Minimum Order */}
          <div className="form-group">

            <label>
              Minimum Order Value
            </label>

            <input
              type="number"
              name="minimumOrderValue"
              value={formData.minimumOrderValue}
              onChange={handleChange}
              placeholder="e.g. 5000"
              min="0"
              required
            />

          </div>


          {/* Eligible Products */}
          <div className="form-group">

            <label>
              Eligible Products
            </label>

            {loadingProducts ? (

              <p>Loading products...</p>

            ) : (

              <select
                multiple
                value={formData.eligibleProducts}
                onChange={handleProductChange}
                className="eligible-products-select"
                required
              >

                {products.map((product) => (

                  <option
                    key={product._id}
                    value={product._id}
                  >
                    {product.productName}
                  </option>

                ))}

              </select>

            )}

            <small>
              Hold Ctrl to select multiple products.
            </small>

          </div>


          {/* Validity Period */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Scheduled Date & Time */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Scheduled Date
              </label>

              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Scheduled Time
              </label>

              <input
                type="time"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-action"
            >
              Create Promotion
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}