// src/pages/profile/OrderHistoryPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const OrderHistoryPage: React.FC = () => {
  // TODO: Fetch user's order history
  return (
    <div>
      <h2 className="text-2xl font-medium mb-4">Order History</h2>
      <p>List of past orders placeholder...</p>
      {/* Example Link to Order Details */}
      <Link
        to="/profile/orders/12345"
        className="text-blue-600 hover:underline"
      >
        View Order #12345
      </Link>
    </div>
  );
};

export default OrderHistoryPage;
