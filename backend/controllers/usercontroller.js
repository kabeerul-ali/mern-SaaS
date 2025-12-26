import User from "../models/user.js";

/* GET ALL USERS */
export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json({ customers: users });
};

/* CREATE USER */
export const createUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let contactDetails = {};
    let profiles = {};

    try {
      contactDetails = req.body.contactDetails
        ? JSON.parse(req.body.contactDetails)
        : {};

      profiles = req.body.profiles
        ? JSON.parse(req.body.profiles)
        : {};
    } catch (error) {
      return res.status(400).json({
        message: "Invalid contactDetails or profiles JSON",
      });
    }

    const imageUrl = req.file ? req.file.path : "";

    const user = await User.create({
      name: req.body.name,
      designation: req.body.designation,
      bio: req.body.bio,
      contactDetails,
      profiles,
      profilePicture: imageUrl,
      customerStatus:
        req.body.customerStatus || "Work Agreement Signed",
      projectStatus:
        req.body.projectStatus || "Project Assigned",
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({
      message: "User creation failed",
    });
  }
};



/* UPDATE USER */
export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updated);
};

/* DELETE USER */
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted" });
};

/* CLIENT STATUS LIST */
export const getClientStatus = (req, res) => {
  res.json([
    "Work Agreement Signed",
    "Deliverables Assigned",
    "Deliverables Completed",
    "Payment Pending",
    "Payment Received",
  ]);
};

/* PROJECT STATUS LIST */
export const getProjectStatus = (req, res) => {
  res.json([
    "Project Assigned",
    "In review client side",
    "In review vendor side",
    "Delivered",
  ]);
};
