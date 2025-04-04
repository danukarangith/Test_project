import { useState, useEffect } from "react";
import { createUser, listUsers, getUserDetails, updateUser, deleteUser } from "../api";

interface User {
    id: string;
    uid: string;
    name: string;
    given_name: string;
    middle_name: string;
    family_name: string;
    email: string;
    phone_number: string;
    comment: string;
    picture: string;
    directory: string;
    metadata: object;
    tags: string[];
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [givenName, setGivenName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [comment, setComment] = useState("");
    const [picture, setPicture] = useState("");
    const [directory, setDirectory] = useState("");
    const [metadata, setMetadata] = useState({});
    const [tags, setTags] = useState<string[]>([]);
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
        const userData = {
            uid,
            name,
            given_name: givenName,
            middle_name: middleName,
            family_name: familyName,
            email,
            phone_number: phoneNumber,
            comment,
            picture,
            directory,
            metadata,
            tags,
        };

        try {
            await createUser(userData);
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
        const userData = {
            name,
            given_name: givenName,
            middle_name: middleName,
            family_name: familyName,
            email,
            phone_number: phoneNumber,
            comment,
            picture,
            directory,
            metadata,
            tags,
        };

        try {
            await updateUser(userId, userData);
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

            <div>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={handleGetUser}>Get User</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="UID"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Given Name"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Family Name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Picture URL"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Directory"
                    value={directory}
                    onChange={(e) => setDirectory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Metadata"
                    value={JSON.stringify(metadata)}
                    onChange={(e) => setMetadata(JSON.parse(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Tags"
                    value={tags.join(", ")}
                    onChange={(e) => setTags(e.target.value.split(", "))}
                />

                <button onClick={handleCreateUser}>Create User</button>
                <button onClick={handleUpdateUser}>Update User</button>
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>

            <h2>Users List</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>
                            {user.name} (UID: {user.uid})
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserManagement;
