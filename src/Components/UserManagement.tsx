import { useState, useEffect } from "react";
import { createUser, listUsers, getUserDetails, updateUser, deleteUser } from "../api";

interface User {
    id: string;
    uid: string;
    name: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await listUsers();
            setUsers(Array.isArray(data) ? data : data.users || []);
        } catch (error) {
            console.error("Error loading users:", error);
            alert("Failed to load users.");
        }
    };

    const handleCreateUser = async () => {
        if (!uid || !name) {
            alert("UID and Name are required.");
            return;
        }
        try {
            await createUser({ uid, name });
            loadUsers();
        } catch (error) {
            console.error("Create failed:", error);
            alert("Failed to create user.");
        }
    };

    const handleGetUser = async () => {
        if (!userId) {
            alert("Please enter a User ID.");
            return;
        }
        try {
            const user = await getUserDetails(userId);
            alert(`User: ${user.name}, UID: ${user.uid}`);
        } catch (error) {
            console.error("Get user failed:", error);
            alert("User not found.");
        }
    };

    const handleUpdateUser = async () => {
        if (!userId || !name) {
            alert("User ID and Name are required.");
            return;
        }
        try {
            await updateUser(userId, { name });
            loadUsers();
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update user.");
        }
    };

    const handleDeleteUser = async () => {
        if (!userId) {
            alert("Please enter a User ID.");
            return;
        }
        try {
            await deleteUser(userId);
            loadUsers();
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div>
            <h1>User Management</h1>

            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <button onClick={handleGetUser}>Get User</button>

            <input type="text" placeholder="UID" value={uid} onChange={(e) => setUid(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={handleUpdateUser}>Update User</button>
            <button onClick={handleDeleteUser}>Delete User</button>

            <h2>Users List</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>{user.name} (UID: {user.uid})</li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserManagement;
