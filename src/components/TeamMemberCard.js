// Team member card component

function TeamMemberCard({ name, role, image }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 180, textAlign: 'center' }}>
      <img src={image} alt={name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }} />
      <div style={{ fontWeight: 'bold' }}>{name}</div>
      <div style={{ color: '#888', fontSize: 13 }}>{role}</div>
    </div>
  );
}

export default TeamMemberCard; 