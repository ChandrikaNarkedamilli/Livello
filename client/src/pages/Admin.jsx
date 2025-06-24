import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Avatar, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    role: 'user',
    profilePicture: null,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetchUsers(1);
  }, [user]);

  const fetchUsers = async (pageNumber = 1) => {
    try {
      const res = await axios.get(`/users?page=${pageNumber}&limit=10`, { withCredentials: true });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await axios.delete(`/users/${id}`, { withCredentials: true });
      fetchUsers(page);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && /image\/(jpeg|png|jpg)/.test(file.type)) {
      setNewUser((prev) => ({ ...prev, profilePicture: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Only .jpg, .jpeg, .png files allowed");
    }
  };

  const handleCreateUser = async () => {
    try {
      const form = new FormData();
      form.append("name", newUser.name);
      form.append("email", newUser.email);
      form.append("phoneNumber", newUser.phoneNumber);
      form.append("address", newUser.address);
      form.append("password", newUser.password);
      form.append("role", newUser.role);
      if (newUser.profilePicture) {
        form.append("profilePicture", newUser.profilePicture);
      }

      await axios.post('/users', form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert('User created successfully');
      setOpen(false);
      setNewUser({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        role: 'user',
        profilePicture: null,
      });
      setImagePreview(null);
      fetchUsers(1);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create user');
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <Box p={3} sx={{ minHeight: "100vh", background: 'linear-gradient(530deg,rgb(16, 21, 21),rgb(20, 61, 57))' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'gold' }}>Team</Typography>
      <Typography variant="subtitle2" sx={{ color: '#fff' }} mb={2}>{users.length} users</Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            color: 'gold', borderColor: '#fff', marginRight: '90px',
            "&:hover": {
              borderColor: "#fff",
              boxShadow: "0 0 12px 2px rgba(255,255,255,0.7)",
            }
          }}
        >
          Add New User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: 1300, margin: '0 auto', background: "linear-gradient(30deg, rgb(48, 65, 69), rgb(18, 209, 190))", color: "#fff" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(184, 182, 182)" }}>
              <TableCell sx={{ color: "rgb(38, 50, 46)", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "rgb(38, 50, 46)", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "rgb(38, 50, 46)", fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ color: "rgb(38, 50, 46)", fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ color: "rgb(38, 50, 46)", fontWeight: "bold" }}>Contact</TableCell>
              <TableCell align="right" sx={{ color: "rgb(38, 50, 46)", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u._id}>
                <TableCell sx={{ color: "#fff" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {u.profilePicture ? (
                      <Avatar src={`http://localhost:3000/uploads/${u.profilePicture}`} />
                    ) : (
                      <Avatar>{getInitials(u.name)}</Avatar>
                    )}
                    {u.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{u.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{u.role}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{u.address}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{u.phoneNumber}</TableCell>
                <TableCell align="right" sx={{ color: "#fff" }}>
                  <IconButton onClick={() => navigate(`/profile/${u._id}`)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(u._id)}><DeleteIcon color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={3}>
        <Button
          variant="outlined"
          onClick={() => fetchUsers(page - 1)}
          disabled={page === 1}
          sx={{ color: '#fff', borderColor: '#fff' }}
        >
          Prev
        </Button>

        <Typography sx={{ color: 'gold' }}>Page {page} of {totalPages}</Typography>

        <Button
          variant="outlined"
          onClick={() => fetchUsers(page + 1)}
          disabled={page === totalPages}
          sx={{ color: '#fff', borderColor: '#fff' }}
        >
          Next
        </Button>
      </Box>

      
      <Dialog open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: 500 } } }}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Button variant="outlined" component="label">
            Upload Profile Picture
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
          {imagePreview && (
            <Avatar src={imagePreview} sx={{ width: 80, height: 80, my: 1 }} />
          )}
          <TextField label="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <TextField label="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <TextField label="Phone Number" value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
          <TextField label="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
          <TextField label="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <Select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} fullWidth>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateUser}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
