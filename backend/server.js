import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//////////////////////////////////////////////////
// MongoDB Connection (HARDCODED FOR TESTING)
//////////////////////////////////////////////////

// We are temporarily bypassing the .env file to guarantee 
// it connects to the exact right database folder.

mongoose
  .connect("mongodb://127.0.0.1:27017/trip_agency")
  .then(() => {
    console.log("✅ MongoDB Connected");
    // This line proves exactly which database folder it opened
    console.log("📁 Actually saving data to database:", mongoose.connection.name); 
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

const JWT_SECRET = process.env.JWT_SECRET || "tripzen_secret";

//////////////////////////////////////////////////
// Middleware
//////////////////////////////////////////////////

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

const authenticateAdmin = [verifyToken, isAdmin];

//////////////////////////////////////////////////
// USER MODEL
//////////////////////////////////////////////////

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

const User = mongoose.model("User", userSchema);

//////////////////////////////////////////////////
// USER ROUTES
//////////////////////////////////////////////////

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email and password required" });
  }

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "customer", // always customer
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin login
  if (email === "anshikatest@gmail.com" && password === "admin123") {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET);

    return res.json({
      token,
      user: { username: "Admin", role: "admin" },
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET
    );

    res.json({ token, user });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

//////////////////////////////////////////////////
// PACKAGE MODEL
//////////////////////////////////////////////////

const packageSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  days: Number,
  placesCount: Number,
  places: [String],
  cost: Number,
  phone: String,
});

const Package = mongoose.model("Package", packageSchema);

//////////////////////////////////////////////////
// PACKAGE ROUTES
//////////////////////////////////////////////////

// Add Package (Admin)
app.post("/addPackage", authenticateAdmin, async (req, res) => {
  try {
    const { name, image, description, days, placesCount, places, cost, phone } =
      req.body;

    if (!name || !description || !days || !cost) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPackage = new Package({
      name,
      image,
      description,
      days,
      placesCount,
      places,
      cost,
      phone,
    });

    await newPackage.save();

    res.status(201).json({ message: "Package added", package: newPackage });

  } catch (err) {
    console.error("Add package error:", err);
    res.status(500).json({ message: "Error adding package" });
  }
});

// Get All Packages
app.get("/getPackages", async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

// Get Single Package
app.get("/getPackage/:id", async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(pkg);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Delete Package
app.delete("/deletePackage/:id", authenticateAdmin, async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: "Package deleted" });
});

//////////////////////////////////////////////////
// LISTING MODEL
//////////////////////////////////////////////////

const listingSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  state: String,
  district: String,
  price: Number,
  contact: String,

  // ⭐ NEW FIELDS FOR HOTELS ⭐
  roomsAvailable: Number,
  foodAvailable: Boolean,
  rating: Number,
});

const Listing = mongoose.model("Listing", listingSchema);

//////////////////////////////////////////////////
// LISTING ROUTES
//////////////////////////////////////////////////

// Add Listing
app.post("/addListing", authenticateAdmin, async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();

    res.status(201).json({ message: "Listing added" });

  } catch (err) {
    res.status(500).json({ message: "Error adding listing" });
  }
});

// Get Listings
app.get("/getListings", async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

// Get Single Listing
app.get("/getListing/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Delete Listing
app.delete("/deleteListing/:id", authenticateAdmin, async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.json({ message: "Listing deleted" });
});

//////////////////////////////////////////////////
// HOTEL MODEL
//////////////////////////////////////////////////

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  roomsAvailable: Number,
  foodAvailable: Boolean,
  image: String,
  contact: String
});

const Hotel = mongoose.model("Hotel", hotelSchema);

//////////////////////////////////////////////////
// HOTEL ROUTES
//////////////////////////////////////////////////

// Add Hotel (Admin only)
app.post("/addHotel", authenticateAdmin, async (req, res) => {
  try {
    const { name, location, price, roomsAvailable, foodAvailable, image, contact } = req.body;

    if (!name || !location || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hotel = new Hotel({
      name,
      location,
      price,
      roomsAvailable,
      foodAvailable,
      image,
      contact
    });

    await hotel.save();

    res.status(201).json({ message: "Hotel added successfully", hotel });

  } catch (err) {
    console.error("Add hotel error:", err);
    res.status(500).json({ message: "Error adding hotel" });
  }
});

// Get All Hotels
app.get("/getHotels", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

// Get Single Hotel
app.get("/getHotel/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);

  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Delete Hotel
app.delete("/deleteHotel/:id", authenticateAdmin, async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.json({ message: "Hotel deleted" });
});

//////////////////////////////////////////////////
// MESSAGE MODEL & ROUTES
//////////////////////////////////////////////////

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Unread" }, 
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// The Route to receive messages from the frontend
app.post("/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create and save the new message to MongoDB
    const newMessage = new Message({ name, email, message });
    const savedMessage = await newMessage.save();

    // THIS PROVES THE MESSAGE WAS RECEIVED AND SAVED
    console.log("\n✉️  --- NEW MESSAGE SAVED! --- ✉️");
    console.log(savedMessage);
    console.log("--------------------------------\n");

    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Failed to save message." });
  }
});

// The Route to fetch all messages (for when you build your Admin dashboard)
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); 
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

//////////////////////////////////////////////////
// ⭐ FOOD MODEL ⭐
//////////////////////////////////////////////////

const foodSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  priceRange: String,
  location: String,
  image: String
});

const Food = mongoose.model("Food", foodSchema);

//////////////////////////////////////////////////
// ⭐ FOOD ROUTES ⭐
//////////////////////////////////////////////////

// Add Food (Admin only)
app.post("/addFood", authenticateAdmin, async (req, res) => {
  try {
    const { name, cuisine, rating, priceRange, location, image } = req.body;

    if (!name || !cuisine) {
      return res.status(400).json({ message: "Name and cuisine are required fields" });
    }

    const food = new Food({
      name,
      cuisine,
      rating,
      priceRange,
      location,
      image
    });

    await food.save();

    res.status(201).json({ message: "Food source added successfully", food });

  } catch (err) {
    console.error("Add food error:", err);
    res.status(500).json({ message: "Error adding food source" });
  }
});

// Get All Food
app.get("/getFood", async (req, res) => {
  const foodSources = await Food.find();
  res.json(foodSources);
});

// Get Single Food
app.get("/getFood/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food source not found" });
    }

    res.json(food);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Delete Food
app.delete("/deleteFood/:id", authenticateAdmin, async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Food source deleted" });
});

//////////////////////////////////////////////////
// ORDER MODEL
//////////////////////////////////////////////////

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["listing", "package","food"],
    },
    listingId: mongoose.Schema.Types.ObjectId,
    packageId: mongoose.Schema.Types.ObjectId,
    packageName: String,
    listingName: String,
    amount: Number,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

//////////////////////////////////////////////////
// ORDER ROUTES
//////////////////////////////////////////////////

// Create Order
app.post("/orders", verifyToken, async (req, res) => {
  try {
    const { type, listingId, packageId, amount, packageName, listingName } =
      req.body;

    const order = new Order({
      userId: req.user.id,
      type,
      listingId,
      packageId,
      amount,
      packageName,
      listingName,
    });

    await order.save();

    res.status(201).json({ message: "Order placed", order });

  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

// Get User Orders
app.get("/orders", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(orders);
});

app.put("/orders/:id/complete", async (req, res) => {
  try {
    // Find the order by its ID and change the status to "Completed"
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true } // This tells Mongo to return the updated version
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order marked as Completed!", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

//////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);