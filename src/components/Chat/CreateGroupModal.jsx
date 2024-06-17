import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField, Button, IconButton, Chip, Skeleton, CircularProgress, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { searchUsers } from "../../services/user.service";
import { createChat } from "../../services/connect.service";

const ModalContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
    background: "rgba(0, 0, 0, 0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(0, 0, 0, 0.3)",
  },
  height: '95vh',
  width: '90%',
  maxWidth: 700,
  backgroundColor: "white",
  borderRadius: 8,
  boxShadow: 24,
  padding: '2rem',
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const ScrollContainer = styled("div")({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "30px",
    background: "rgba(0, 0, 0, 0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(0, 0, 0, 0.3)",
  },
});

const UserChip = styled(Chip)({
  margin: "0.5rem 0",
});

const UserListItem = ({ user, onSelect, onRemove, selected }) => (
  selected ? (
    <UserChip
      label={`${user.name.first} ${user.name.last}`}
      onDelete={onRemove}
      color="primary"
    />
  ) : (
    <UserChip
      label={`${user.name.first} ${user.name.last}`}
      onClick={onSelect}
      clickable
    />
  )
);

const CreateGroupModal = ({ open, onClose, onGroupCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleUserSearch = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await searchUsers(term);
      setSearchResults(response?.users || []);
    } catch (error) {
      console.error("Failed to search users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleSubmit = async () => {
    const memberIds = selectedUsers.map((user) => user._id);
    const groupData = { title, description, members: memberIds };

    setCreating(true);
    setError(""); // Clear any previous errors
    try {
      await createChat(groupData);
      onGroupCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create group", error);
      setError(error?.response.data.error||"Failed to create group. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="overflow-auto">
      <ModalContainer >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Create Group</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Group Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Group Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Search Users"
          value={searchTerm}
          onChange={handleUserSearch}
          fullWidth
          variant="outlined"
        />
        <ScrollContainer style={{ maxHeight: "100px" }}>
          {loading ? (
            [...Array(5)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={50} />
            ))
          ) : (
            searchResults.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                onSelect={() => handleUserSelect(user)}
              />
            ))
          )}
        </ScrollContainer>
        <ScrollContainer style={{ maxHeight: "150px", marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {selectedUsers.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              onRemove={() => handleUserRemove(user._id)}
              selected
              className="bg-active"
            />
          ))}
        </ScrollContainer>
        <button
          className="bg-active p-3 outline-none rounded-lg text-white"
          onClick={handleSubmit}
          fullWidth
          style={{ marginTop: '1rem' }}
          disabled={creating}
        >
          {creating ? <CircularProgress size={24} /> : "Create Group"}
        </button>
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;
