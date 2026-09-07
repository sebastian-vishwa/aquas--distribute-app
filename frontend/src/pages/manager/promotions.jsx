import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import './manager_pages.css';
import Addpromotion from '../../components/manager/Addpromotion';

export default function Promotions() {

  // Backend URL
  const API_URL = `http://${window.location.hostname}:5000`;

  // Creating States
  const [showPromotionForm, setShowPromotionForm] = useState(false);
  const [promotions, setPromotions] = useState([]);


  
  // GET PROMOTIONS FROM DATABASE
  

  useEffect(() => {

    const fetchPromotions = async () => {

      try {
 //Sending GET Request

        const response = await fetch(
          `${API_URL}/api/promotions`
        );

//Checking the Response
        if (!response.ok) {
          throw new Error('Failed to fetch promotions');
        }

       //Converting Response to JSON
        const data = await response.json();

        // Displaying Data in Console
        console.log(
          'Promotions from database:',
          data
        );

        //Storing Promotions
        setPromotions(data);

        //Storing Promotions
      } catch (error) {

        console.error(
          'Error loading promotions:',
          error
        );

      }

    };

    //actually calls the function
    fetchPromotions();

  }, []);


  
  // DELETE PROMOTION
 
  const handleDelete = async (id) => {

//Confirmation Before Delete
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this promotion?'
    );
//If User Clicks Cancel
    if (!confirmDelete) {
      return;
    }

    try {

      //Sending DELETE Request
      const response = await fetch(
        `${API_URL}/api/promotions/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to delete promotion'
        );
      }

      // Remove from frontend table
      setPromotions(prev =>
        prev.filter(
          promotion =>
            promotion._id !== id
        )
      );

      //Success Message
      alert(
        'Promotion deleted successfully!'
      );

    } catch (error) {

      console.error(
        'Error deleting promotion:',
        error
      );

      alert(
        'Failed to delete promotion.'
      );

    }

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString();

  };


  // ==========================================
  // FORMAT DATE + TIME
  // ==========================================

  const formatDateTime = (date) => {

    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleString();

  };


  // ==========================================
  // DISPLAY DISCOUNT
  // ==========================================

  const displayDiscount = (promotion) => {

    if (
      promotion.discountType === 'Percentage'
    ) {

      return `${promotion.discountValue}%`;

    }

    return `Rs. ${Number(
      promotion.discountValue
    ).toLocaleString()}`;

  };


  // ==========================================
  // DISPLAY  EligiblePRODUCTS
  // ==========================================

  const displayProducts = (promotion) => {

    if (
      !promotion.eligibleProducts ||
      promotion.eligibleProducts.length === 0
    ) {

      return 'No products';

    }

    return promotion.eligibleProducts
      .map(product => product.name)
      .join(', ');

  };


  return (

    <div>

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="manager-header">

        <div>

          <h1>
            Promotion Management
          </h1>

          <p>
            Create and manage promotion offers.
          </p>

        </div>

      </div>


      {/* =====================================
          TABLE CARD
      ===================================== */}

      <div className="manager-table-card">


        {/* CREATE PROMOTION BUTTON */}

        <div className="table-top-actions">

          <button
            className="btn-action create-button"
            onClick={() =>
              setShowPromotionForm(true)
            }
          >

            <Plus size={18} />

            Create Promotion

          </button>

        </div>


        {/* ===================================
            TABLE
        =================================== */}

        <div className="table-wrapper">

          <table className="manager-table">


            {/* TABLE HEADER */}

            <thead>

              <tr>

                <th>
                  PROMOTION ID
                </th>

                <th>
                  DISCOUNT TYPE
                </th>

                <th>
                  DISCOUNT
                </th>

                <th>
                  MIN. ORDER VALUE
                </th>

                <th>
                  ELIGIBLE PRODUCTS
                </th>

                <th>
                  VALIDITY PERIOD
                </th>

                <th>
                  SCHEDULED DATE & TIME
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  EDIT
                </th>

                <th>
                  DELETE
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}

            <tbody>

              {promotions.length === 0 ? (

                <tr>

                  <td
                    colSpan="10"
                    style={{
                      textAlign: 'center',
                      padding: '30px'
                    }}
                  >

                    No promotions found.

                  </td>

                </tr>

              ) : (

                promotions.map(
                  (promotion) => (

                    <tr
                      key={promotion._id}
                    >


                      {/* PROMOTION ID */}

                      <td>
{/*displays the promotion ID from MongoDB.*/}
                        <strong>
                          {promotion.promotionId} 
                          
                        </strong>

                      </td>


                      {/* DISCOUNT TYPE */}

                      <td>

                        {promotion.discountType}

                      </td>


                      {/* DISCOUNT */}

                      <td>

                        <strong>
                          {displayDiscount(
                            promotion
                          )}
                        </strong>

                      </td>


                      {/* MINIMUM ORDER */}

                      <td>

                        Rs. 
                        {Number(
                          promotion.minimumOrderValue
                        ).toLocaleString()}

                      </td>


                      {/* PRODUCTS */}

                      <td>

                        {displayProducts(
                          promotion
                        )}

                      </td>


                      {/* VALIDITY */}

                      <td>

                        {formatDate(
                          promotion.startDate
                        )}

                        {' - '}

                        {formatDate(
                          promotion.endDate
                        )}

                      </td>


                      {/* SCHEDULED */}

                      <td>

                        {formatDateTime(
                          promotion.scheduledDate
                        )}

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            promotion.status === 'Active'
                              ? 'status-badge active-status'
                              : promotion.status === 'Expired'
                              ? 'status-badge expired-status'
                              : 'status-badge scheduled-status'
                          }
                        >

                          {promotion.status}

                        </span>

                      </td>


                      {/* EDIT */}

                      <td>

                        <button
                          className="table-icon-button edit-button"
                          title="Edit Promotion"
                        >

                          <Pencil size={19} />

                        </button>

                      </td>


                      {/* DELETE */}

                      <td>

                        <button
                          className="table-icon-button delete-button"
                          title="Delete Promotion"
                          onClick={() =>
                            handleDelete(
                              promotion._id
                            )
                          }
                        >

                          <Trash2 size={19} />

                        </button>

                      </td>


                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================
          CREATE PROMOTION POPUP
      ===================================== */}

      {showPromotionForm && (

        <Addpromotion

          onClose={() =>
            setShowPromotionForm(false)
          }

          onPromotionCreated={
            (newPromotion) => {

              setPromotions(prev => [
                newPromotion,
                ...prev
              ]);

            }
          }

        />

      )}

    </div>

  );

}