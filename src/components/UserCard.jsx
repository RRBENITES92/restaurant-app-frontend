function UserCard({ name, email }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginBottom: "10px"
    }}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

export default UserCard;