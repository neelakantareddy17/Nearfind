# NearFind

NearFind is a real-time hyperlocal marketplace application that connects customers, retailers, delivery partners, and administrators on a single platform. The application enables customers to discover nearby products, place orders, track deliveries in real time, and receive products efficiently through a streamlined order fulfillment workflow.

## Features

### Customer

* User authentication using Firebase Authentication
* Search products from nearby retailers
* Real-time inventory visibility
* Add products to cart
* Single-retailer cart restriction
* Place orders directly from cart
* Live order tracking
* Real-time order status updates
* Order history

### Retailer

* Manage inventory
* View incoming orders
* Accept or reject orders
* Update order status

  * Accepted
  * Packed
  * Ready for Pickup
* Real-time order synchronization

### Delivery Partner

* View available deliveries
* Pick up orders
* Mark deliveries as completed
* Real-time delivery updates

### Admin

* Monitor platform activity
* Manage marketplace operations
* View orders across the platform

## Order Lifecycle

```text
PLACED
↓
ACCEPTED
↓
PACKED
↓
READY_FOR_PICKUP
↓
PICKED_UP
↓
DELIVERED
```

## Tech Stack

### Frontend

* React Native
* Expo Router
* TypeScript

### Backend

* Firebase Authentication
* Cloud Firestore

### State Management

* React Context API

### UI

* React Native Components
* Expo Vector Icons

## Project Structure

```text
app/
├── customer/
├── retailer/
├── delivery/
├── admin/

components/
context/
services/
lib/
assets/
```

## Firebase Collections

### users

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer"
}
```

### inventory

```json
{
  "productName": "Milk",
  "price": 50,
  "stock": 20,
  "retailerId": "retailer_1",
  "retailerName": "Fresh Mart"
}
```

### orders

```json
{
  "productId": "product_1",
  "productName": "Milk",
  "retailerId": "retailer_1",
  "retailerName": "Fresh Mart",
  "customerId": "customer_1",
  "customerName": "customer@example.com",
  "quantity": 1,
  "status": "PLACED",
  "createdAt": "timestamp"
}
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd nearfind
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npx expo start
```

### Run Android

```bash
npm run android
```

## Build APK

```bash
eas build --platform android --profile preview
```

## Key Functionalities

* Real-time Firestore synchronization
* Inventory stock deduction during ordering
* Multi-user authentication
* Role-based access control
* Cart management
* Order tracking system
* Delivery workflow management
* Mobile-first user experience

## Future Improvements

* Online payments integration
* Push notifications
* Location-based retailer discovery
* Delivery route optimization
* Order auto-cancellation
* Ratings and reviews
* Analytics dashboard

## Author

**Chinnakotla Neelakanta Reddy**

B.Tech Computer Science and Engineering
Indian Institute of Information Technology Kottayam (IIIT Kottayam)

## License

This project is developed for educational and demonstration purposes.
