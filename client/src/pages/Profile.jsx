import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/authSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "../utils/axios";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    profilePicture: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return navigate("/login");
    const targetId = id || user.id;
    if (!targetId) return;
    fetchProfile(targetId);
  }, [user, id]);

  const fetchProfile = async (targetId) => {
    try {
      const res = await axios.get(`/users/${targetId}`, { withCredentials: true });
      setFormData({
        name: res.data.name,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber || "",
        address: res.data.address || "",
        profilePicture: res.data.profilePicture || "",
      });
      if (res.data.profilePicture) {
        setImagePreview(`${baseURL}/uploads/${res.data.profilePicture}`);
      }
    } catch (err) {
      console.error(err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && /image\/(jpeg|png|jpg)/.test(file.type)) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Only .jpg, .jpeg, .png files allowed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("address", formData.address);
      if (formData.profilePicture instanceof File) {
        form.append("profilePicture", formData.profilePicture);
      }

      await axios.put(`/users/${id || user.id}`, form);

      alert("Profile updated successfully");

      const profileRes = await axios.get(`/users/${id || user.id}`, { withCredentials: true });

      if (!id || user.id === id) {
        dispatch(updateUser(profileRes.data)); 
      }

      if (user?.role === "admin") {
        navigate("/"); 
      } else {
        navigate("/"); 
      }

    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={2} sx={{ color: "gold" }}>
        {user?.role === "admin" && id && user?._id !== id ? "Edit User Profile" : "My Profile"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Avatar src={imagePreview} sx={{ width: 100, height: 100, mb: 2 }} />

        <Button
          variant="outlined"
          component="label"
          sx={{
            mb: 2,
            color: "rgb(255, 255, 255)",
            borderColor: "white",
            "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          Upload New Picture
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
          sx={textFieldStyle}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          sx={textFieldStyle}
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
          sx={textFieldStyle}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={2}
          sx={textFieldStyle}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, color: "rgb(19, 90, 98)", backgroundColor: "white" }}
          disabled={updating}
        >
          {updating ? "Updating..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};

const textFieldStyle = {
  "& .MuiInputBase-input": { color: "#fff" },
  "& .MuiInputLabel-root": { color: "gold" },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
};

export default Profile;
