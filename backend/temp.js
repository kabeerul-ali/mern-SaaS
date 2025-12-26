import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const users = [
      {
        name: "Aarav Sharma",
        designation: "Full Stack Developer",
        bio: "MERN stack developer with strong backend and SaaS experience.",
        profilePicture:
          "https://randomuser.me/api/portraits/men/32.jpg",
        customerStatus: "Work Agreement Signed",
        projectStatus: "Project Assigned",
        contactDetails: {
          email: "aarav.sharma@gmail.com",
          phone: "9876543210",
        },
        profiles: {
          github: "https://github.com/aaravsharma",
          linkedIn: "https://linkedin.com/in/aaravsharma",
        },
      },
      {
        name: "Riya Verma",
        designation: "Frontend Engineer",
        bio: "React & UI specialist focused on clean UX and performance.",
        profilePicture:
          "https://randomuser.me/api/portraits/women/44.jpg",
        customerStatus: "Deliverables Assigned",
        projectStatus: "In review client side",
        contactDetails: {
          email: "riya.verma@gmail.com",
          phone: "9123456780",
        },
        profiles: {
          github: "https://github.com/riyaverma",
          linkedIn: "https://linkedin.com/in/riyaverma",
        },
      },
      {
        name: "Kunal Mehta",
        designation: "Backend Engineer",
        bio: "Node.js and MongoDB expert building scalable APIs.",
        profilePicture:
          "https://randomuser.me/api/portraits/men/76.jpg",
        customerStatus: "Deliverables Completed",
        projectStatus: "Delivered",
        contactDetails: {
          email: "kunal.mehta@gmail.com",
          phone: "9988776655",
        },
        profiles: {
          github: "https://github.com/kunalmehta",
          linkedIn: "https://linkedin.com/in/kunalmehta",
        },
      },
      {
        name: "Sneha Kapoor",
        designation: "UI/UX Designer",
        bio: "Designing intuitive user experiences for web applications.",
        profilePicture:
          "https://randomuser.me/api/portraits/women/68.jpg",
        customerStatus: "Payment Pending",
        projectStatus: "Delivered",
        contactDetails: {
          email: "sneha.kapoor@gmail.com",
          phone: "9012345678",
        },
        profiles: {
          github: "https://github.com/snehakapoor",
          linkedIn: "https://linkedin.com/in/snehakapoor",
        },
      },
      {
        name: "Aditya Singh",
        designation: "Product Manager",
        bio: "Managing SaaS products with focus on user growth.",
        profilePicture:
          "https://randomuser.me/api/portraits/men/12.jpg",
        customerStatus: "Payment Received",
        projectStatus: "Delivered",
        contactDetails: {
          email: "aditya.singh@gmail.com",
          phone: "9090909090",
        },
        profiles: {
          github: "https://github.com/adityasingh",
          linkedIn: "https://linkedin.com/in/adityasingh",
        },
      },
    ];

    await User.insertMany(users);
    console.log("✅ 5 REAL users inserted successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedUsers();
