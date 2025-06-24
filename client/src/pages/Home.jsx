import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import {
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, currentPage, totalPages } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchUsers(currentPage));
    }
  }, [dispatch, currentPage, user]);

  const handlePrev = () => {
    if (currentPage > 1) dispatch(fetchUsers(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(fetchUsers(currentPage + 1));
  };

  const handleEdit = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/users/${id}`, { withCredentials: true });
        dispatch(fetchUsers(currentPage));
      } catch (err) {
        alert(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Please login to view content.
      </Typography>
    );
  }

  return (
    <Box p={3} sx={{background: 'linear-gradient(530deg,rgb(16, 21, 21),rgb(20, 61, 57))'}}>
      <Typography variant="h4" gutterBottom sx={{color:'rgb(209, 169, 7)'}}>
        {user.role === "admin" ? "User List" : "My Profile"}
      </Typography>

      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {/* Admin View */}
      {user.role === "admin" && (
        <Grid container spacing={3}>
          {users.map((u) => (
            <Grid key={u._id} mt={4}>
              <Card sx={{width:280,minHeight:200, p: 4,color:'#fff' ,borderRadius: 8,background: 'linear-gradient(30deg,rgb(48, 65, 69),rgb(18, 209, 190))',border: "1px solid transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#fff",
                  boxShadow: "0 0 12px 2px rgba(255,255,255,0.7)",
                },}}>
                <Box display="flex" alignItems="center" gap={2}>
                  {u.profilePicture ? (
                    <Avatar
                      src={`http://localhost:3000/uploads/${u.profilePicture}?t=${Date.now()}`}
                      sx={{ width: 64, height: 64 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 64, height: 64 }}>
                      {getInitials(u.name)}
                    </Avatar>
                  )}

                  <Box>
                    <Typography variant="h6">{u.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {u.email}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ pt: 2 }}>
                  <Typography>Contact: {u.phoneNumber || "-"}</Typography>
                  <Typography>Role: {u.role}</Typography>
                </CardContent>

                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Button size="small" variant="outlined" onClick={() => handleEdit(u._id)}   
                  sx={{
                      mt: 2,
                      borderRadius: 3,
                      color: "#fff",
                      borderColor: "#fff",
                      "&:hover": {
                        borderColor: "#fff",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(u._id)}
                    sx={{mt: 2, borderRadius: 3, color: 'rgb(251, 251, 251)',backgroundColor : 'rgb(180, 24, 24)'}}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* User View */}
      {user.role !== "admin" && (
        <Card sx={{width:280,minHeight:200, p: 4,color:'#fff' ,borderRadius: 8,background: 'linear-gradient(30deg,rgb(48, 65, 69),rgb(18, 209, 190))',border: "1px solid transparent",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "#fff",
            boxShadow: "0 0 12px 2px rgba(255,255,255,0.7)",
          },}}>
          <Box display="flex" alignItems="center" gap={2}>
            {user.profilePicture ? (
              <Avatar
                src={`http://localhost:3000/uploads/${user.profilePicture}?t=${Date.now()}`}
                sx={{ width: 64, height: 64 }}
              />
            ) : (
              <Avatar sx={{ width: 64, height: 64 }}>{getInitials(user.name)}</Avatar>
            )}

            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ pt: 2 }}>
            <Typography>Phone: {user.phoneNumber}</Typography>
            <Typography>Role: {user.role}</Typography>
          </CardContent>

          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(user.id)}
            sx={{
                  mt: 2,
                  borderRadius: 3,
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
          >
            Edit Profile
          </Button>
        </Card>
      )}

      
      {user.role === "admin" && (
        <Box mt={3} display="flex" justifyContent="center" alignItems="center" gap={2}>
          <Button variant="outlined" onClick={handlePrev} disabled={currentPage === 1} sx={{ color: '#fff', borderColor: '#fff' }}>
            Prev
          </Button>
          <Typography sx={{color:"gold"}}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages} sx={{ color: '#fff', borderColor: '#fff' }}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};


export default Home;
