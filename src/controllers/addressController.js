import Address from "../models/addressModel.js";

// Add a new address
// POST /api/addresses
// Private
const addAddress = async (req, res) => {
  try {
    const { street, city, state, zipCode, country, phone } = req.body;

    const address = new Address({
      user: req.user._id, // Linking the address to the logged-in user
      street,
      city,
      state,
      zipCode,
      country,
      phone,
    });

    const createdAddress = await address.save();
    res.status(201).json(createdAddress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all addresses for a user
// GET /api/addresses
// Private
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an address
// PUT /api/addresses/:id
// Private
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    // Making sure the address exists and belongs to the logged-in user
    if (address && address.user.toString() === req.user._id.toString()) {
      address.street = req.body.street || address.street;
      address.city = req.body.city || address.city;
      address.state = req.body.state || address.state;
      address.zipCode = req.body.zipCode || address.zipCode;
      address.country = req.body.country || address.country;
      address.phone = req.body.phone || address.phone;

      const updatedAddress = await address.save();
      res.status(200).json(updatedAddress);
    } else {
      res
        .status(404)
        .json({ message: "Address not found or user not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an address
// DELETE /api/addresses/:id
// Private
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    // Making sure the address exists and belongs to the logged-in user
    if (address && address.user.toString() === req.user._id.toString()) {
      await Address.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Address removed" });
    } else {
      res
        .status(404)
        .json({ message: "Address not found or user not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//export
export { addAddress, getAddresses, updateAddress, deleteAddress };
