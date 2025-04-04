import { useState, useEffect } from "react";
import { createUser, listUsers, getUserDetails, updateUser, deleteUser } from "../api";

interface User {
    id: string;
    name: string;
    email: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await listUsers();
        setUsers(Array.isArray(data) ? data : data.users || []);
    };

    const handleCreateUser = async () => {
        await createUser({ name, email });
        loadUsers();
    };

    const handleGetUser = async () => {
        const user = await getUserDetails(userId);
        alert(`User: ${user.name}, Email: ${user.email}`);
    };

    const handleUpdateUser = async () => {
        await updateUser(userId, { name, email });
        loadUsers();
    };

    const handleDeleteUser = async () => {
        await deleteUser(userId);
        loadUsers();
    };

    return (
        <div>
            <h1>User Management</h1>

            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <button onClick={handleGetUser}>Get User</button>

            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={handleUpdateUser}>Update User</button>
            <button onClick={handleDeleteUser}>Delete User</button>

            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
