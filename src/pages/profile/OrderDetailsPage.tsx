// src/pages/profile/OrderDetailsPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Import types needed for order details
import { CartItemType } from "../../types/product"; // Or your specific OrderItem type

// Define structure for the Stored Order Details again for clarity
interface StoredOrderDetails {
  id: string;
  date: string;
  items: CartItemType[]; // Array of items that were in the cart
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: { type: string; last4: string };
  status: string;
}

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Get orderId from URL
  const [orderDetails, setOrderDetails] = useState<StoredOrderDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log(
      `OrderDetailsPage: Attempting to load details for order ${orderId}`
    );
    if (!orderId) {
      setError("Order ID not found in URL.");
      setLoading(false);
      return;
    }

    try {
      // --- Load order from localStorage (DEMO ONLY) ---
      const storedOrderJson = localStorage.getItem(`orderDetails_${orderId}`);
      if (storedOrderJson) {
        const storedOrder = JSON.parse(storedOrderJson);
        // TODO: Add more robust validation of the stored object structure
        if (storedOrder && storedOrder.id === orderId) {
          setOrderDetails(storedOrder);
          console.log("Order details loaded:", storedOrder);
        } else {
          setError(`Order details not found for Order #${orderId}.`);
        }
      } else {
        setError(`Order details not found for Order #${orderId}.`);
      }
    } catch (err) {
      setError("Failed to load order details.");
      console.error("Order details error:", err);
    } finally {
      setLoading(false);
    }
    // In a real app, this useEffect would make an API call using the orderId
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="container mx-auto p-8 text-center">
        Could not display order details.
      </div>
    );
  }

  // --- Render Order Details ---
  return (
    // This component renders within the <ProfilePage> Outlet
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Order Details</h2>
        <Link
          to="/profile/orders"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back to Order History
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
        {/* Order Header Info */}
        <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-semibold text-lg">{orderDetails.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Placed</p>
            <p className="font-medium">{formatDate(orderDetails.date)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold text-lg">
              {formatPrice(orderDetails.total)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-green-700">{orderDetails.status}</p>
          </div>
        </div>

        {/* Items Ordered */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Items Ordered</h3>
          {orderDetails.items.map((item) => (
            <div
              key={item.cartItemId}
              className="flex items-start gap-4 border-b pb-3 last:border-b-0"
            >
              <img
                src={item.imageUrl || "..."}
                alt={item.title}
                className="w-16 h-16 object-cover rounded border"
              />
              <div className="flex-grow">
                <p className="font-medium text-black">{item.title}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                {item.selectedSize && (
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize}
                  </p>
                )}
                {item.selectedColor && (
                  <p className="text-sm text-gray-500">
                    Color: {item.selectedColor}
                  </p>
                )}
              </div>
              <p className="text-base font-medium text-black flex-shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Shipping & Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          <div>
            <h4 className="font-semibold text-lg mb-2">Shipping Address</h4>
            <address className="text-base text-gray-700 not-italic leading-relaxed">
              {orderDetails.shippingAddress.name}
              <br />
              {orderDetails.shippingAddress.addressLine1}
              <br />
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.state}{" "}
              {orderDetails.shippingAddress.postalCode}
              <br />
              {orderDetails.shippingAddress.country}
            </address>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Payment Method</h4>
            <p className="text-base text-gray-700">
              {orderDetails.paymentMethod.type}
            </p>
            <p className="text-base text-gray-700">
              Ending in **** {orderDetails.paymentMethod.last4}
            </p>
          </div>
        </div>

        {/* Order Totals */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold text-lg mb-2">Order Totals</h4>
          <div className="space-y-1 text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>{" "}
              <span>{formatPrice(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>{" "}
              <span>{formatPrice(orderDetails.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>{" "}
              <span>{formatPrice(orderDetails.tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
              <span className="text-black">Grand Total:</span>{" "}
              <span>{formatPrice(orderDetails.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
