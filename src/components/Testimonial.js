// Testimonial component

function Testimonial({ author, text, image }) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, maxWidth: 350 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <img src={image} alt={author} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }} />
        <div style={{ fontWeight: 'bold' }}>{author}</div>
      </div>
      <div style={{ fontStyle: 'italic', color: '#444' }}>{text}</div>
    </div>
  );
}

export default Testimonial; 