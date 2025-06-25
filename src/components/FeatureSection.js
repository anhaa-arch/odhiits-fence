// Feature section component

function FeatureSection({ title, children }) {
  return (
    <section style={{ margin: '32px 0', padding: 16, background: '#f6f6f6', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default FeatureSection; 