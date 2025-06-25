// Partner logo component

function PartnerLogo({ image, alt }) {
  return (
    <div style={{ padding: 8 }}>
      <img src={image} alt={alt} style={{ width: 80, height: 40, objectFit: 'contain' }} />
    </div>
  );
}

export default PartnerLogo; 