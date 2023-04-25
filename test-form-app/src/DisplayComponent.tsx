import { useEffect, useState } from "react";

function DisplayComponent() {
    const [users, setUsers] = useState([]);
    const fetchUsers = useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:3000/users')
            const users = await res.json();
            setUsers(users);
        }
        fetchUsers().catch(console.error);
    }, []);

    // return the user names and emails as a list of <p> elements with nice styling
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h3>Users</h3>
            <div style={{
                display: 'flex',
            }}>
                {users.map((user: { name: string, email: string, id: string }) => (
                    <p style={{
                        border: 'solid',
                        borderColor: 'black',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '10px',
                    }} key={user.id}>
                        <span style={{ fontWeight: 'bold' }}>{user.name}</span> - {user.email}
                    </p>
                ))}
            </div>
        </div>
    )
}
export default DisplayComponent;