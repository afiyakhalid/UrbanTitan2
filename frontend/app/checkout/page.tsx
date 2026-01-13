"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, type CartItemType } from "@/store/store";
import { useAuthStore } from "@/store/auth";
import { apiFetch } from "@/lib/api";
import { ChevronLeft, ChevronRight, MapPin, CreditCard, Package, Check, Loader2 } from "lucide-react";
import Image from "next/image";

type PaymentMethod = "COD" | "UPI" | "CARD" | "NETBANKING";

interface AddressForm {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface QuoteLineItem {
  productId: string;
  productName: string;
  brandName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  mrp: number;
  discountAmount: number;
  lineTotal: number;
  quotationId: string | null;
  dealerName: string | null;
}

interface QuoteResponse {
  currency: string;
  lineItems: QuoteLineItem[];
  subtotal: number;
  discountTotal: number;
  deliveryFee: number;
  grandTotal: number;
  estimatedDelivery: string;
}

interface OrderResponse {
  orderId: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
}

const STEPS = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Review", icon: Package },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Confirm", icon: Check },
];

const PAYMENT_METHODS: { value: PaymentMethod; label: string; description: string }[] = [
  { value: "COD", label: "Cash on Delivery", description: "Pay when you receive your order" },
  { value: "UPI", label: "UPI", description: "Pay using Google Pay, PhonePe, etc." },
  { value: "CARD", label: "Credit/Debit Card", description: "Visa, Mastercard, Rupay" },
  { value: "NETBANKING", label: "Net Banking", description: "All major banks supported" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { user, token } = useAuthStore();

  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [address, setAddress] = useState<AddressForm>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [orderResult, setOrderResult] = useState<OrderResponse | null>(null);

  // Wait for Zustand to rehydrate from sessionStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  // Only check cart after hydration is complete
  useEffect(() => {
    if (isHydrated && cart.length === 0 && !orderResult) {
      router.push("/cart");
    }
  }, [isHydrated, cart, orderResult, router]);

  const buildCartItems = () => {
    return cart.map((item: CartItemType) => ({
      productId: item.id,
      quantity: item.quantity,
      quotationId: null,
    }));
  };

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/v1/checkout/quote", {
        method: "POST",
        body: JSON.stringify({
          items: buildCartItems(),
          pincode: address.pincode,
        }),
      });
      const data = (await res.json()) as QuoteResponse;
      setQuote(data);
      setCurrentStep(2);
    } catch (err) {
      setError("Failed to get quote. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/v1/orders", {
        method: "POST",
        body: JSON.stringify({
          items: buildCartItems(),
          shippingAddress: address,
          billingAddressSameAsShipping: true,
          paymentMethod: paymentMethod,
          customerNotes: "",
        }),
      });
      const data = (await res.json()) as OrderResponse;
      setOrderResult(data);
      clearCart();
      setCurrentStep(4);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
      setError("Please fill in all required fields");
      return;
    }
    fetchQuote();
  };

  const handlePaymentSubmit = () => {
    placeOrder();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <React.Fragment key={step.id}>
            <div className={`flex flex-col items-center ${isActive ? "text-black" : isCompleted ? "text-green-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                ${isActive ? "border-black bg-black text-white" : isCompleted ? "border-green-600 bg-green-600 text-white" : "border-gray-300"}`}>
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className="text-xs mt-1 font-medium">{step.label}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-green-600" : "bg-gray-300"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderAddressStep = () => (
    <form onSubmit={handleAddressSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="+91 9876543210"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
        <input
          type="text"
          value={address.addressLine1}
          onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="House no., Building, Street"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
        <input
          type="text"
          value={address.addressLine2}
          onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="Landmark, Area (Optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Mumbai"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Maharashtra"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
          <input
            type="text"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="400001"
            maxLength={6}
            required
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Cart
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Continue to Review
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review Your Order</h2>

      {/* Delivery Address Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">Delivering to:</span>
        </div>
        <p className="text-sm text-gray-700">
          {address.name}, {address.phone}<br />
          {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}<br />
          {address.city}, {address.state} - {address.pincode}
        </p>
      </div>

      {/* Line Items */}
      <div className="space-y-3">
        <h3 className="font-medium">Order Items</h3>
        {quote?.lineItems.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              {item.productImage && (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{item.productName}</p>
              {item.brandName && <p className="text-xs text-gray-500">{item.brandName}</p>}
              {item.dealerName && <p className="text-xs text-blue-600">Sold by: {item.dealerName}</p>}
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{item.lineTotal.toLocaleString()}</p>
              {item.discountAmount > 0 && (
                <p className="text-xs text-green-600">-₹{item.discountAmount.toLocaleString()} off</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{quote?.subtotal.toLocaleString()}</span>
        </div>
        {quote && quote.discountTotal > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-₹{quote.discountTotal.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span>Delivery Fee</span>
          <span>{quote?.deliveryFee === 0 ? "FREE" : `₹${quote?.deliveryFee}`}</span>
        </div>
        <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{quote?.grandTotal.toLocaleString()}</span>
        </div>
        {quote?.estimatedDelivery && (
          <p className="text-xs text-gray-500 text-right">Est. delivery by {quote.estimatedDelivery}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Edit Address
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Continue to Payment
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Payment Method</h2>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.value}
            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition
              ${paymentMethod === method.value ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-4 h-4 text-black"
            />
            <div className="flex-1">
              <p className="font-medium">{method.label}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {paymentMethod !== "COD" && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Online payment integration coming soon. For now, please select Cash on Delivery.
          </p>
        </div>
      )}

      {/* Order Total Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between font-bold text-lg">
          <span>Amount to Pay</span>
          <span>₹{quote?.grandTotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Review
        </button>
        <button
          type="button"
          onClick={handlePaymentSubmit}
          disabled={loading || (paymentMethod !== "COD")}
          className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 font-semibold"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Place Order
          <Check className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">Thank you for your order</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg inline-block">
        <p className="text-sm text-gray-500">Order Number</p>
        <p className="text-xl font-bold">{orderResult?.orderNumber}</p>
        <p className="text-lg font-semibold mt-2">₹{orderResult?.totalAmount.toLocaleString()}</p>
      </div>

      <p className="text-sm text-gray-500 max-w-md mx-auto">
        We've sent a confirmation email to your registered email address. 
        The seller(s) have been notified and will prepare your order for dispatch.
      </p>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          View My Orders
        </button>
      </div>
    </div>
  );

  // Show loading while Zustand rehydrates
  if (!isHydrated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
      
      {renderStepIndicator()}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {currentStep === 1 && renderAddressStep()}
        {currentStep === 2 && renderReviewStep()}
        {currentStep === 3 && renderPaymentStep()}
        {currentStep === 4 && renderConfirmationStep()}
      </div>
    </div>
  );
}
