import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./components/AppLayout/AppLayout";
import HomePage from "./Pages/Home/HomePage";
import FoodPage from "./Pages/Food/FoodPage";
import CartPage from "./Pages/Cart/CartPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import PaymentPage from "./Pages/Payment/PaymentPage";
import OrderTrackPage from "./Pages/Track/OrderTrackPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import OrdersPage from "./Pages/Orders/OrdersPage";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import FoodsPage from "./Pages/Foods/FoodsPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute/ProtectedAdminRoute";
import AddFoodForm from "./features/food/AddFoodForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/food/:foodId" element={<FoodPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track/:orderId"
              element={
                <ProtectedRoute>
                  <OrderTrackPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/foods"
              element={
                <ProtectedRoute>
                  <ProtectedAdminRoute>
                    <FoodsPage />
                  </ProtectedAdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/addFood"
              element={
                <ProtectedRoute>
                  <ProtectedAdminRoute>
                    <AddFoodForm />
                  </ProtectedAdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/editFood/:foodId"
              element={
                <ProtectedRoute>
                  <ProtectedAdminRoute>
                    <AddFoodForm />
                  </ProtectedAdminRoute>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
