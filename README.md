# Assignment ReadMe


## Backend

### 1. Create a new Node.js application using `npm init` command.
```bash
cd server
npm install
npm start
```

### 2. Install the required dependencies.
```bash
npm install express mongoose body-parser cors
```
## API Endpoints
This document provides a description of the available API endpoints for managing and retrieving product transaction data.

### 1.Create Data
**Endpoint:** `GET /api/create-data`
**Description:** Create data for the application.

**Example Request:**
```bash
curl -X GET https://roxiler-systems-assignment-3hdv.onrender.com/api/create-data
```

**Example Response:**
```json
{
  "message": "Data stored successfully"
}
```
### 2. Get Data
**Endpoint:** `GET /api/transactions`
**Description:** Get all transactions.
**Query Parameters:**
- search (string): Search text to match against the product title, description, or price.
- page (number): Page number for pagination (default is 1).
- perPage (number): Number of items to return per page (default is 10).
- month (number): Month number to filter transactions by month.

**Example Request:**
```bash
curl -X GET https://roxiler-systems-assignment-3hdv.onrender.com/api/transactions?search=laptop&page=1&perPage=10
```

**Example Response:**
```json
{
  "data": [
    {
      "_id": "5f7b3b7b7b7b7b7b7b7b7b7b",
      "title": "Laptop",
      "description": "Laptop description",
      "price": 1000,
      "quantity": 1,
      "createdAt": "2020-10-05T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### 3. Get Statistics
**Endpoint:** `GET /api/statistics`
**Description:** Get statistics for monthly transactions.
**Query Parameters:**
- month (number): Month number to filter transactions by month.

**Example Request:**
```bash
curl -X GET https://roxiler-systems-assignment-3hdv.onrender.com/api/statistics?month=10
```

**Example Response:**
```json
{
  "totalSaleAmount": 1500.75,
  "totalSoldItems": 25,
  "totalNotSoldItems": 75
}
```

### 4. Get BarChart
**Endpoint:** `GET /api/bar-chart`
**Description:** Get statistics for monthly transactions.
**Query Parameters:**
- month (number): Month number to filter transactions by month.

**Example Request:**
```bash
curl -X GET https://roxiler-systems-assignment-3hdv.onrender.com/api/bar-chart?month=10
```

**Example Response:**
```json
[
  { "range": "0-100", "count": 10 },
  { "range": "101-200", "count": 15 },
  { "range": "201-300", "count": 5 },
  { "range": "301-400", "count": 8 },
  { "range": "401-500", "count": 3 },
  { "range": "501-600", "count": 2 },
  { "range": "601-700", "count": 1 },
  { "range": "701-800", "count": 0 },
  { "range": "801-900", "count": 0 },
  { "range": "901-above", "count": 0 }
]
```

### 5. Get PieChart
**Endpoint:** `GET /api/pie-chart`
**Description:** Get statistics for unique categories and number of items.
**Query Parameters:**
- month (number): Month number to filter transactions by month.

**Example Request:**
```bash
curl -X GET https://roxiler-systems-assignment-3hdv.onrender.com/api/pie-chart?month=10
```

**Example Response:**
```json
[
  {
    "category": "men's clothing",
    "count": 3
  },
  {
    "category": "women's clothing",
    "count": 1
  },
  {
    "category": "electronics",
    "count": 2
  }
]
```


### 6. All Transactions
**Endpoint:** `GET /api/all-data`
**Description:** Get all transactions data for the month in one API.

**Query Parameters:**
- month (number): Month number to filter transactions by month.

**Example Request:**
```bash
curl -X GET https://roxiler-systems-assignment-3hdv.onrender.com/api/all-data?month=10
```

**Example Response:**
```json
{
  "statistics": {
    "totalSaleAmount": 1447.98,
    "totalSoldItems": 3,
    "totalNotSoldItems": 3
  },
  "barChart": [
    {
      "range": "0-100",
      "count": 4
    },
    {
      "range": "101-200",
      "count": 0
    },
    {
      "range": "201-300",
      "count": 1
    },
    {
      "range": "301-400",
      "count": 0
    },
    {
      "range": "401-500",
      "count": 0
    },
    {
      "range": "501-600",
      "count": 0
    },
    {
      "range": "601-700",
      "count": 0
    },
    {
      "range": "701-800",
      "count": 0
    },
    {
      "range": "801-900",
      "count": 0
    },
    {
      "range": "901-above",
      "count": 1
    }
  ],
  "pieChart": [
    {
      "category": "men's clothing",
      "count": 3
    },
    {
      "category": "women's clothing",
      "count": 1
    },
    {
      "category": "electronics",
      "count": 2
    }
  ]
}
```

## FrontEnd

### 1. Create a new React application using `create-react-app` command.
```bash
cd client
npm install
npm run dev
```


## Technologies Used
- Node.js
- Express
- MongoDB
- React
- Chart.js